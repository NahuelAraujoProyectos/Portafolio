$(document).ready(function(){
    //Cargamos id de usuario en $_SESSION
    function cargar_id_usuario(usuario_elegido, id_usuario_elegido){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_cargar_id.php',
            data: {
                usuario: usuario_elegido,
                id_usuario: id_usuario_elegido
            },
            success: function(){},
            error: function(){
                alert('No se cargo el id del usuario');
            }
        })
    }

    //Función para recuperar usuarios en un select
    function recuperar_usuarios(){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_recuperar_usuarios.php',
            dataType: 'json',
            success: function(response){
                let usuarios = response['usuarios'];
                let n_usuarios = usuarios.length; 
                
                //Creamos select con la lista de usuarios recogida
                let lista_usuario = '<div class="text-light bg-success d-inline-block p-2 mb-2 rounded">';
                lista_usuario += '<label for="select_usuario" class="me-3">Seleccionar Usuario:</label>';
                lista_usuario += '<select name="select_usuario" id="select_usuario" disabled>';
                lista_usuario += '<option></option>';
                lista_usuario += '</select><br>';
                lista_usuario += '<input type="hidden" id="id_usuario" name="id_usuario" value="">';
                lista_usuario += '</div>'
                //Limpiamos el div y agregamos el select inicial
                $('#seleccionar_usuario').html('');
                $('#seleccionar_usuario').append(lista_usuario);

                //Agregamos la lista de usuarios en el select
                for(i=0;i<n_usuarios;i++){
                    let usuario = usuarios[i];
                    let ingreso = '<option>'+usuario['usuario']+'</option>';
                    $('#select_usuario').append(ingreso);
                }

                //Habilitamos el select
                $('#select_usuario').prop('disabled',false);

                //Definimos función a aplicar cuando seleccionamos usuario
                $(document).on('change', '#select_usuario', function () {
                    for(i=0;i<n_usuarios;i++){
                        let usuario = usuarios[i];

                        //Habilitamos los botones de acción
                        if($('#select_usuario').val()!==''){
                            $('#btn_ver_citas').prop('disabled',false);
                            $('#btn_crear_cita').prop('disabled',false);
                        }else{
                            $('#btn_ver_citas').prop('disabled',true);
                            $('#btn_crear_cita').prop('disabled',true);
                        }

                        if($('#select_usuario').val()==usuario['usuario']){
                            //Cargamos id del usuario seleccionado
                            cargar_id_usuario(usuario['usuario'], usuario['id'])
                            $('#id_usuario').val(usuario['id'])
                            //Limpiamos la pantalla para trabajar
                            $('#respuesta').html('');
                            $('#ver_citas').html('');
                            $('#solicitar_citas').html('');
                            //Aplicamos la función
                            ver_citas();
                        }else{
                            //Limpiamos pantalla
                            $('#respuesta').html('');
                            $('#ver_citas').html('');
                            $('#solicitar_citas').html('');
                        }
                    }
                })

            },
            error: function(){
                alert('Error al recuperar usuarios.')
            }
        })
    }

    //Función para mostrar plantilla para los datos
    function esquema_info_citas(){
        //Creamos el formulario necesario para presentar los datos
        let esquema_info_citas = '<div class="card ms-3">';
        esquema_info_citas += '<div class="card-body">';
        esquema_info_citas += '<div id="formulario_DU" class="contenedor_tabla">';
        esquema_info_citas += '<h3 class="mt-3 mb-3">Citas Pendientes</h3>';
        esquema_info_citas += '<table class="table" id="tabla_citas">';
        esquema_info_citas += '<thead>';
        esquema_info_citas += '<tr>';
        esquema_info_citas += '<th scope="col" class="col-1"></th>';
        esquema_info_citas += '<th scope="col">ID</th>';
        esquema_info_citas += '<th scope="col">Fecha</th>';
        esquema_info_citas += '<th scope="col">Motivo</th>';
        esquema_info_citas += '</tr>';
        esquema_info_citas += '</thead>';
        esquema_info_citas += '<tbody>';
        esquema_info_citas += '</tbody>';
        esquema_info_citas += '</table>';
        esquema_info_citas += '</div>';
        esquema_info_citas += '<div id="acciones" class="container mt-3">';
        esquema_info_citas += '<button id="btn_editar" class="btn btn-primary me-2" disabled>Editar</button>';
        esquema_info_citas += '<button id="btn_borrar" class="btn btn-danger" disabled>Borrar</button>';
        esquema_info_citas += '</div>';
        esquema_info_citas += '</div>';
        esquema_info_citas += '</div>';

        $('#ver_citas').append(esquema_info_citas);
    }

    //Función para mostrar información de citas
    function ver_citas(){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_recuperar.php',
            dataType: 'json',
            success: function(response){
                var citas = response.citas;

                // Creamos div para contener las citas
                esquema_info_citas()                   

                // Imprimimos las citas en pantalla
                let n_citas = citas.length;
                for(i=0;i<n_citas;i++){

                    let info_citas = '<tr>';
                    info_citas += '<td><input type="radio" name="cita_seleccionada" class="form-check-input"></td>'
                    info_citas += '<td name="id_cita">'+citas[i]['idCita']+'</td>';
                    info_citas += '<td name="fecha_cita">'+citas[i]['fecha_cita']+'</td>';
                    info_citas += '<td name="motivo_cita">'+citas[i]['motivo_cita']+'</td>';
                    info_citas += '</tr>';

                    $('#tabla_citas').append(info_citas)           
                }

                // Habilitamos botones cuando se selecciona una noticia
                $('#tabla_citas input[name="cita_seleccionada"]').on('change', function() {
                    if ($(this).is(':checked')) {
                        $('#btn_editar, #btn_borrar').prop('disabled', false);
                    } else {
                        $('#btn_editar, #btn_borrar').prop('disabled', true);
                    }
                });
            },
            error: function(){
                let m_error = '<div class="alert alert-danger" role="alert"><p class="text-center my-1">No hay citas registradas para el usuario.</p></div>'
                $('#respuesta').append(m_error);
            }
           
        })
    }

    //Función para eliminar citas
    function eliminar_citas(id_cita_elegida){
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_eliminar.php',
            data: {
                id_cita: id_cita_elegida
            },
            success: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                $('#btn_ver_citas').click();
                let m_eliminar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                $('#respuesta').append(m_eliminar);
            },
            error: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                let m_error = '<div class="alert alert-danger" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                $('#respuesta').append(m_error);
            }
        })
    }

    // Esquema de formulario para editar cita
    function esquema_editar_cita(id_cita_elegida) {
        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_recuperar.php',
            data: {
                id_cita: id_cita_elegida
            },
            dataType: 'json',
            success: function (response) {
                let cita = response['cita_individual'];
                
                let div_solicitar = '<div class="col-md-6 mt-3">';
                div_solicitar += '<div class="card">';
                div_solicitar += '<div class="card-body">';
                div_solicitar += '<form id="formulario_EC">';
                div_solicitar += '<h3>Editar Citas</h3>';
                div_solicitar += '<input type="hidden" class="form-control" name="id_cita" id="id_cita" value="'+cita.idCita+'">';
                div_solicitar += '<div class="mb-3" id="div_fecha_cita">';
                div_solicitar += '<label for="fecha_cita" class="form-label">Fecha: </label>';
                div_solicitar += '<input type="date" class="form-control" name="fecha_cita" id="fecha_cita" value="'+cita.fecha_cita+'">';
                div_solicitar += '</div>';
                div_solicitar += '<div class="mb-3" id="div_motivo_cita">';
                div_solicitar += '<label for="motivo_cita" class="form-label">Motivo: </label>';
                div_solicitar += '<textarea name="motivo_cita" id="motivo_cita" class="form-control" cols="50" rows="5">'+cita.motivo_cita+'</textarea>';
                div_solicitar += '</div>';
                div_solicitar += '<button id="btn_guardar" class="btn btn-primary mx-2">Guardar</button>';
                div_solicitar += '<button id="btn_volver" class="btn btn-secondary" type="reset">Volver</button>';
                div_solicitar += '</form>';
                div_solicitar += '</div>';
                div_solicitar += '</div>';
                div_solicitar += '</div>';
                
                $('#ver_citas').append(div_solicitar);

            },
            error: function () {
                alert('No se pudo cargar esquema.');
            }
        })
    }

    //Función para editar citas
    function editar_citas(){
        //Guardamos la información del formulario en la variable
        var parametros = new FormData($('#formulario_EC')[0]);

        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_editar.php',
            data: parametros,
            contentType: false,
            processData: false,
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
                        $('#'+campo).on('click', function(){
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
                    let m_editar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>';
                    $('#respuesta').append(m_editar);
                }
            },
            error: function(){
                alert('Error: No se pudo editar la cita.');
            }
        })
    }

    //Esquema de formulario para crear cita
    function esquema_solicitar_citas(){
        let div_solicitar = '<div class="col-md-6 mt-3">';
        div_solicitar += '<div class="card">';
        div_solicitar += '<div class="card-body">';
        div_solicitar += '<form id="formulario_SC">';
        div_solicitar += '<h3>Crear Citas</h3>';
        div_solicitar += '<div class="mb-3" id="div_fecha_cita">';
        div_solicitar += '<label for="fecha_cita" class="form-label">Fecha:</label>';
        div_solicitar += '<input type="date" class="form-control" name="fecha_cita" id="fecha_cita">';
        div_solicitar += '</div>';
        div_solicitar += '<div class="mb-3" id="div_motivo_cita">';
        div_solicitar += '<label for="motivo_cita" class="form-label">Motivo:</label>';
        div_solicitar += '<textarea class="form-control" name="motivo_cita" id="motivo_cita" rows="5"></textarea>';
        div_solicitar += '</div>';
        div_solicitar += '<button id="btn_solicitar" class="btn btn-primary mx-2">Solicitar</button>';
        div_solicitar += '<button id="btn_limpiar" class="btn btn-secondary" type="reset">Limpiar</button>';
        div_solicitar += '</form>';
        div_solicitar += '</div>';
        div_solicitar += '</div>';
        div_solicitar += '</div>';

        $('#solicitar_citas').append(div_solicitar);
    }

    //Función para solicitar cita al usuario elegido
    function solicitar_cita_individual(){
        //Guardamos informacion del formulario
        let parametros = new FormData($('#formulario_SC')[0]);

        $.ajax({
            type: 'POST',
            url: '../../controllers/cita/cita_solicitar.php',
            data: parametros,
            contentType: false,
            processData: false,
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



    //Mostramos lista de usuarios a elegir
    recuperar_usuarios();

    //Botón Ver Citas
    $('#btn_ver_citas').on('click',function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        $('#solicitar_citas').html('');
        //Vemos las citas
        ver_citas()    
    })   

    //Botón Borrar Citas
    $(document).on('click','#btn_borrar',function(event){
        event.preventDefault();
        //Limpiamos respuesta
        $('#respuesta').html('');
        //Encontramos el div que contiene el registro seleccionado
        let cita = $('#tabla_citas input[name="cita_seleccionada"]:checked').closest('tr');
        //Recuperamos los valores para la sentencia de eliminación
        let id_cita_elegida = cita.find('td[name="id_cita"]').html();
        eliminar_citas(id_cita_elegida);
    })

    //Botón Editar Citas 
    $(document).on('click','#btn_editar',function(event){
        event.preventDefault();
        //Encontramos el registro seleccionado
        let cita = $('#tabla_citas input[name="cita_seleccionada"]:checked').closest('tr');
        //Recuperamos los valores para la sentencia de edición
        let id_cita_elegida = cita.find('td[name="id_cita"]').html();
        //Limpiamos la pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        //Imprimimos nuevo esquema para editar
        esquema_editar_cita(id_cita_elegida);
    })

    //Botón Guardar Cambios
    $(document).on('click','#btn_guardar',function(event){
        event.preventDefault();
        editar_citas();
    })

    //Botón Volver
    $(document).on('click', '#btn_volver', function(event) {
        event.preventDefault();
        $('#btn_ver_citas').click();
    });

    //Botón Crear Citas
    $('#btn_crear_cita').on('click',function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        $('#solicitar_citas').html('');
        //Seleccionamos usuario
        let usuario_elegido = $('#select_usuario').val();
        //Condiciones si se eligió usuario o no
        if(usuario_elegido!==''){
            esquema_solicitar_citas();
            $('#btn_solicitar').on('click',function(event){
                event.preventDefault();
                solicitar_cita_individual();
            })
        }else{
            $('#solicitar_citas').html('');
        } 
    })
})