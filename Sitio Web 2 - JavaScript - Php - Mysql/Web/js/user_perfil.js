$(document).ready(function(){
    //Esquema para recuperar datos de usuario
    function esquema_datos_perfil(){
        //Creamos el formulario necesario para presentar los datos

        //Creamos tarjeta con botones de acción
        let esquema_perfil = '<div class="col-md-4">';
        esquema_perfil += '<div class="card mb-3">';
        esquema_perfil += '<div class="card-body text-center" id="div_opciones">';
        esquema_perfil += '<h3 class="text-start">Opciones</h3>';
        esquema_perfil += '<div class="mb-4">';
        esquema_perfil += '<label for="usuario" class="form-label">Usuario: </label>';
        esquema_perfil += '<input type="text" name="usuario" id="usuario" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '<button class="btn btn-primary w-75 mx-auto" id="btn_modificar_password">Cambiar Password</button>';
        esquema_perfil += '<button class="btn btn-primary w-75 mx-auto" id="btn_modificar_datos">Cambiar Datos</button>';
        esquema_perfil += '</div>';
        esquema_perfil += '</div>';
        esquema_perfil += '</div>';

        //Creamos el formulario necesario para presentar los datos
        esquema_perfil += '<div class="col-md-8">';
        esquema_perfil += '<div class="card" id="formulario">';
        esquema_perfil += '<div class="card-body">';
        esquema_perfil += '<h3>Datos de Usuario</h3>';
        esquema_perfil += '<form id="formulario_DP">';
        esquema_perfil += '<div class="row">';
        //Primer columna
        esquema_perfil += '<div class="col-md-6">';
        esquema_perfil += '<div class="mb-4" id="div_nombre">';
        esquema_perfil += '<label for="nombre" class="form-label">Nombre: </label>';
        esquema_perfil += '<input type="text" name="nombre" id="nombre" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '<div class="mb-4" id="div_apellidos">';
        esquema_perfil += '<label for="apellidos" class="form-label">Apellidos: </label>';
        esquema_perfil += '<input type="text" name="apellidos" id="apellidos" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '<div class="mb-4" id="div_email">';
        esquema_perfil += '<label for="email" class="form-label">Email: </label>';
        esquema_perfil += '<input type="email" name="email" id="email" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '<div class="mb-4" id="div_teléfono">';
        esquema_perfil += '<label for="telefono" class="form-label">Teléfono: </label>';
        esquema_perfil += '<input type="tel" name="teléfono" id="teléfono" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '</div>';
        //Segunda columna
        esquema_perfil += '<div class="col-md-6">';
        esquema_perfil += '<div class="mb-4" id="div_fecha_de_nacimiento">';
        esquema_perfil += '<label for="nacimiento" class="form-label">Fecha de nacimiento: </label>';
        esquema_perfil += '<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '<div class="mb-4" id="div_dirección">';
        esquema_perfil += '<label for="direccion" class="form-label">Dirección: </label>';
        esquema_perfil += '<input type="text" name="dirección" id="dirección" class="form-control" disabled>';
        esquema_perfil += '</div>';
        esquema_perfil += '<div class="mb-4" id="div_sexo">';
        esquema_perfil += '<label for="sexo" class="form-label">Sexo: </label>';
        esquema_perfil += '<select name="sexo" id="sexo" class="form-select" disabled>';
        esquema_perfil += '<option value="hombre">Hombre</option>';
        esquema_perfil += '<option value="mujer">Mujer</option>';
        esquema_perfil += '</select>';
        esquema_perfil += '</div>';

        //Botones de accion
        esquema_perfil += '<div id="botones"></div>';
        esquema_perfil += '</div>';
        esquema_perfil += '</div>';
        esquema_perfil += '</form>';
        esquema_perfil += '</div>';
        esquema_perfil += '</div>';
        esquema_perfil += '</div>';

        $('#ver_perfil').append(esquema_perfil);
        recuperar_datos();
    }
                 
    //Función para recuperar datos de usuario
    function recuperar_datos(){
        $.ajax({
            url: '../../controllers/usuario/perfil_recuperar.php',
            method: 'POST',
            dataType: 'json',
            success: function(response) {
                //Establecemos lista de campos a recuperar
                var ingresos = ['usuario','nombre', 'apellidos', 'email', 'teléfono', 'fecha_de_nacimiento', 'dirección', 'sexo'];
                //Por cada campo, ingresamos el valor recuperado
                ingresos.forEach(campo => {
                    $('#'+campo).val(response['perfil'][campo]);
                });
            },
            error: function(){
                alert('Hubo un error al recuperar datos.');
            }
        });
    }

    //Esquema para cambiar contraseña
    function esquema_cambiar_contraseña(){
        let esquema_cambiar = '<div id="id_password">';
        esquema_cambiar += '<form id="form_cambiar_password">';
        esquema_cambiar += '<div class="mb-3">';
        esquema_cambiar += '<label for="password" class="form-label">Nuevo Password: </label>';
        esquema_cambiar += '<input type="password" class="form-control" name="password" id="password">';
        esquema_cambiar += '<div id="div_password"></div>'
        esquema_cambiar += '</div>';
        esquema_cambiar += '<button id="btn_guardar_password" class="btn btn-primary w-75 mx-auto">Guardar Password</button>';
        esquema_cambiar += '</form>';
        esquema_cambiar += '<button id="btn_volver" class="btn btn-secondary w-75 mx-auto">Volver</button>';
        esquema_cambiar += '</div>';
        $('#div_opciones').append(esquema_cambiar);         
    }

    //Función para guardar contraseña
    function guardar_contraseña(nuevo_password) {
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/perfil_datos.php',
            data: {
                password: nuevo_password
            },
            dataType: 'json',
            success: function(response) {
                //Respuesta ante campos vacíos
                if (response.hasOwnProperty('campos_vacíos')) {
                    response['campos_vacíos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' es obligatorio</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    })
                }else{
                    $('html, body').scrollTop($('#titulo_seccion').offset().top);
                    let m_respuesta = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>'
                    $('#respuesta').append(m_respuesta);
                    $('#btn_volver').click();
                }
            },
            error: function() {
                alert('Error al modificar password.');
            }
        });
    }

    //Función para guardar datos
    function guardar_datos() {
        let formData = new FormData($('#formulario_DP')[0]);
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/perfil_datos.php',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(response) {
                //Respuesta ante campos vacíos
                if (response.hasOwnProperty('campos_vacíos')) {
                    response['campos_vacíos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' es obligatorio</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });

                        //Limpiamos al presionar Volver
                        $('#btn_volver').on('click',function(){
                            location.reload();
                        })
                    })
                }else if(response.hasOwnProperty('edad_minima')) {
                    //Limpiamos antes de iniciar
                    $('#fecha_de_nacimiento').removeClass('is-invalid');
                    $('#error_fecha').remove();

                    //Marcamos campo que presenta error
                    $('#fecha_de_nacimiento').addClass('is-invalid');
                    let error = '<p id="error_fecha" class="text-danger text-start my-1">'+response['edad_minima']+'</p>';
                    $('#div_fecha_de_nacimiento').append(error);

                    //Limpiamos al ingresar al campo
                    $('#fecha_de_nacimiento').on('focus', function(){
                        $(this).removeClass('is-invalid');
                        $('#error_fecha').remove();
                    });
                }else if(response.hasOwnProperty('campos_repetidos')){
                    response['campos_repetidos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' ya está en uso.</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });

                        //Limpiamos al presionar Volver
                        $('#btn_volver').on('click',function(){
                            location.reload();
                        })
                    })
                }else if(response.hasOwnProperty('campos_invalidos')){
                    response['campos_invalidos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' no es valido.</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });

                        //Limpiamos al presionar Volver
                        $('#btn_volver').on('click',function(){
                            location.reload();
                        })
                    })
                }else{
                    $('html, body').scrollTop($('#titulo_seccion').offset().top);
                    let m_respuesta = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>'
                    $('#respuesta').append(m_respuesta);
                    $('#btn_volver').click();
                } 
            },
            error: function() {
                alert('Error al modificar datos.');
            }
        });
    }
 


    //Presentamos los datos de perfil
    esquema_datos_perfil();

    //Botón Cambiar Contraseña
    $(document).on('click','#btn_modificar_password', function(event){
        // Evita la recarga de la página
        event.preventDefault();
        // Limpiamos respuesta
        $('#respuesta').html('');
        // Mostramos div de nuevo password
        esquema_cambiar_contraseña();
        $('#btn_modificar_password').toggle();
        $('#btn_modificar_datos').toggle();
    });

    //Botón Guardar Contraseña
    $(document).on('click','#btn_guardar_password',function(event){
        event.preventDefault();
        var nuevo_password = $('#password').val();
        guardar_contraseña(nuevo_password);
    });

    //Botón Volver
    $(document).on('click','#btn_volver',function(event){
        event.preventDefault();
        //Respecto del formulario de datos personales
        $('#formulario_DP input, select').prop('disabled', true);
        //Respecto del cambio de password
        $('#id_password').remove();
        //Mostramos botones
        $('#btn_modificar_password').toggle();
        $('#btn_modificar_datos').toggle();
        //Ocultamos botones
        $('#btn_volver').remove();
        $('#btn_guardar_datos').remove();
    });

    //Botón Modificar datos
    $(document).on('click','#btn_modificar_datos', function(event){
        // Evita la recarga de la página
        event.preventDefault();
        // Limpiamos las respuestas
        $('#respuesta').html('');
        // Habilitamos datos del formulario para modificar
        $('#formulario_DP input, select').prop('disabled', false);
        // Creamos botón Guardar Cambios
        let botones = '<button id="btn_guardar_datos" class="btn btn-primary w-75 mx-auto">Guardar Cambios</button>';
        botones += '<button id="btn_volver" class="btn btn-secondary w-75 mx-auto">Volver</button>'
        $('#div_opciones').append(botones);
        //Ocultamos botones
        $('#btn_modificar_datos').toggle();
        $('#btn_modificar_password').toggle();
    });

    //Botón Guardar Datos
    $(document).on('click','#btn_guardar_datos',function(event){
        event.preventDefault();
        guardar_datos();
    });

});
