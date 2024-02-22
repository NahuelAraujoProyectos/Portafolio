$(document).ready(function(){

    //Función para ver citas registradas
    function ver_citas(){
        $.ajax({
            url: '../../controllers/cita/cita_recuperar.php',
            method: 'POST',
            dataType: 'json',
            success: function(data){
                //Guardamos los datos en la variable
                let citas = data['citas'];
                
                //Imprimimos las citas registradas pendientes a la fecha
                let n_citas = citas.length;
                for(i=0;i<n_citas;i++){
                    let idCita = data['citas'][i]['idCita'];
                    let motivoCita = data['citas'][i]['motivo_cita'];

                    //Cambiamos formato de fecha
                    let fechaOriginal = data['citas'][i]['fecha_cita'];
                    var partesFecha = fechaOriginal.split("/");
                    var dia = partesFecha[0];
                    var mes = partesFecha[1];
                    var anio = partesFecha[2];
                    // Creamos una nueva fecha en formato ISO
                    var fechaCita = anio + "-" + mes + "-" + dia;                    
                    
                    //Creamos esquema con los datos de las diferentes citas 
                    let div_solicitar = '<div class="col-md-4 mt-3">';
                    div_solicitar += '<div class="card">';
                    div_solicitar += '<div class="card-body">';
                    div_solicitar += '<form>';
                    div_solicitar += '<div class="mb-3" id="div_fecha_cita">';
                    div_solicitar += '<label for="fecha_cita" class="form-label">Fecha: </label>';
                    div_solicitar += '<input type="date" class="form-control" name="fecha_cita" id="fecha_cita" value="'+fechaCita+'" disabled>';
                    div_solicitar += '</div>';
                    div_solicitar += '<div class="mb-3" id="div_motivo_cita">';
                    div_solicitar += '<label for="motivo_cita" class="form-label">Motivo: </label>';
                    div_solicitar += '<textarea name="motivo_cita" id="motivo_cita" class="form-control" cols="50" rows="3" disabled>'+motivoCita+'</textarea>';
                    div_solicitar += '</div>';
                    div_solicitar += '<div class="mb-3">';
                    div_solicitar += '<input type="hidden" class="form-control" name="codigo" value="'+idCita+'">';
                    div_solicitar += '</div>';
                    div_solicitar += '<div class="row px-3">';
                    div_solicitar += '<hr>';
                    div_solicitar += '<button class="btn btn-primary btn_editar mb-1">Editar</button>';
                    div_solicitar += '<button class="btn btn-secondary btn_borrar" type="reset">Borrar</button>';
                    div_solicitar += '</div>';
                    div_solicitar += '</form>';
                    div_solicitar += '</div>';
                    div_solicitar += '</div>';
                    div_solicitar += '</div>';
                    $('#ver_citas').append(div_solicitar)                    

                }
            },
            error: function(){
                let error_citas = '<div class="alert alert-danger" role="alert"><p class="text-center my-1">No existen citas para el usuario.</p></div>'
                $('#respuesta').append(error_citas);
            }
        })
    }

    //Función para solicitar las citas
    function esquema_solicitar_citas(){
        
        let div_solicitar = '<div class="col-md-6 mt-3">';
        div_solicitar += '<div class="card">';
        div_solicitar += '<div class="card-body">';
        div_solicitar += '<form id="formulario_SC">';
        div_solicitar += '<h3>Solicitar Citas</h3>';
        div_solicitar += '<div class="mb-3" id="div_fecha_cita">';
        div_solicitar += '<label for="fecha_cita" class="form-label">Fecha:</label>';
        div_solicitar += '<input type="date" class="form-control" name="fecha_cita" id="fecha_cita">';
        div_solicitar += '</div>';
        div_solicitar += '<div class="mb-3" id="div_motivo_cita">';
        div_solicitar += '<label for="motivo_cita" class="form-label">Motivo:</label>';
        div_solicitar += '<textarea class="form-control" name="motivo_cita" id="motivo_cita" rows="5"></textarea>';
        div_solicitar += '</div>';
        div_solicitar += '<button id="btn_solicitar" class="btn btn-primary">Solicitar</button>';
        div_solicitar += '<button id="btn_limpiar" class="btn btn-secondary" type="reset">Limpiar</button>';
        div_solicitar += '</form>';
        div_solicitar += '</div>';
        div_solicitar += '</div>';
        div_solicitar += '</div>';
        
        $('#solicitar_citas').append(div_solicitar);
    }

    //Función para eliminar citas
    function eliminar_citas(codigo){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_eliminar.php',
            data: {
                id_cita: codigo
            },
            success: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                let m_eliminar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>';
                $('#respuesta').append(m_eliminar);
            },
            error: function(response){
                alert(response);
            }
        })
    }

    //Función para editar las citas
    function editar_citas(fecha, motivo, codigo){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_editar.php',
            data: {
                fecha_cita: fecha,
                motivo_cita: motivo,
                id_cita: codigo,
            },
            dataType: 'json',
            success: function(response){
                //Respuesta ante campos vacíos
                if(response.hasOwnProperty('campos_vacíos')){
                    response['campos_vacíos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El campo es obligatorio</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    })
                //Respuesta ante otros errores
                }else if(response.hasOwnProperty('otros_errores')){
                    alert(response['otros_errores']);
                //Respuesta correcta
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    $('#ver_citas').html('');
                    $('#btn_ver_citas').click();
                    let m_editar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>';
                    $('#respuesta').append(m_editar);
                }
            },
            error: function(response){
                alert(response)
            }
        })
    }

    //Función para solicitar cita ()
    function solicitar_cita(fechaCita, motivoCita){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_solicitar.php',
            data: {
                fecha_cita: fechaCita,
                motivo_cita: motivoCita
            },
            dataType: 'json',
            success: function(response){
                //Respuesta a campos vacíos
                if(response.hasOwnProperty('campos_vacíos')){
                    response['campos_vacíos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El campo es obligatorio</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    });
                //Respuesta a otros errores
                }else if(response.hasOwnProperty('otros_errores')){
                    //Limpiamos antes de iniciar
                    $('#fecha_cita').removeClass('is-invalid');
                    $('#error_fecha').remove();

                    //Marcamos campos que presentan error
                    $('#fecha_cita').addClass('is-invalid');
                    let error = '<p id="error_fecha" class="text-danger text-start my-1">'+response['otros_errores']+'</p>';
                    $('#div_fecha_cita').append(error);

                    //Limpiamos al ingresar a los campos
                    $('#fecha_cita').on('focus', function(){
                        $(this).removeClass('is-invalid');
                        $('#error_fecha').remove();
                    });
                //Respuesta correcta
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    $('#ver_citas').html('');
                    $('#btn_ver_citas').click();
                    let m_solicitar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>';
                    $('#respuesta').append(m_solicitar);
                } 
            },
            error: function(response){
                alert(response);
            }
        })
    }


    //Mostramos citas registradas al comenzar
    ver_citas();

    //Botón Ver Citas
    $('#btn_ver_citas').on('click',function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        $('#respuesta').html('');
        $('#solicitar_citas').html('');
        //Mostramos citas
        ver_citas();
    })   

    //Botón Borrar Citas
    $(document).on('click','.btn_borrar',function(event){
        event.preventDefault();
        //Limpiamos respuesta
        $('#respuesta').html('');
        //Encontramos el formulario que contiene el botón presionado
        let formulario = $(this).closest('form');
        //Recuperamos los valores para la sentencia de eliminación
        let codigoCita = formulario.find('input[name="codigo"]').val();
        //Enviamos los datos con ajax
        eliminar_citas(codigoCita);
        $('#ver_citas').html('');
        $('#btn_ver_citas').click();
    })

    //Botón Editar Citas
    $(document).on('click','.btn_editar',function(event){
        event.preventDefault();
        //Limpiamos respuesta
        $('#respuesta').html('');
        //Encontramos el formulario que contiene el botón presionado
        let formulario = $(this).closest('form');
        // Cambia el fondo de la card cuando se está editando
        formulario.closest('.card-body').addClass('editando');
        //Habilitamos los elementos para su edición
        let fechaCita = formulario.find('input[name="fecha_cita"]');
        let motivoCita = formulario.find('textarea[name="motivo_cita"]');
        //Habilitamos los campos para editarlos
        fechaCita.prop('disabled',false);
        motivoCita.prop('disabled',false);
        //Botón Guardar Cambios
        let div_botones = $(this).closest('div');
        let btn_guardar = '<button class="btn_guardar btn btn-primary btn_editar mb-1">Guardar Cambios</button>';
        //Ocultamos y mostramos el botón de Guardar Cambios
        $('.btn_borrar').hide();
        $('.btn_editar').hide();
        div_botones.append(btn_guardar);
    })

    //Botón Guardar Cambios
    $(document).on('click','.btn_guardar',function(event){
        event.preventDefault();
        //Guardamos los valores nuevos para editar la cita
        let formulario = $(this).closest('form');
        let fechaDeCita = formulario.find('input[name="fecha_cita"]').val();
        let motivoCita = formulario.find('textarea[name="motivo_cita"]').val();
        let codigoCita = formulario.find('input[name="codigo"]').val();
        //Editamos la cita
        editar_citas(fechaDeCita,motivoCita,codigoCita);
    })

    //Botón Crear Citas
    $('#btn_solicitar_citas').on('click',function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        $('#respuesta').html('');
        $('#solicitar_citas').html('');
        //Generamos esquema
        esquema_solicitar_citas();
    })

    //Botón Solicitar Citas
    $(document).on('click','#btn_solicitar',function(event){
        event.preventDefault();
        let fechaDeCita = $('#fecha_cita').val();
        let motivoCita = $('#motivo_cita').val();
        solicitar_cita(fechaDeCita, motivoCita);
    })
})