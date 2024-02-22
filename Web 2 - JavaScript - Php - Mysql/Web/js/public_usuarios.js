$(document).ready(function(){
    //Esquema de formulario para crear usuario
    function esquema_crear_usuario(){
        //Creamos el formulario necesario para recoger los datos
        let nuevo_usuario = '<div class="card w-75 mx-auto">';
        nuevo_usuario += '<div class="card-body">';
        nuevo_usuario += '<form id="formulario_DP">';
        nuevo_usuario += '<div class="row">';
        nuevo_usuario += '<h3 class="mt-4">Datos de Usuario</h3>';
        //Campos para datos de usuario
        nuevo_usuario += '<div class="col-md-6" id="div_usuario">';
        nuevo_usuario += '<label for="usuario" class="form-label">Usuario:</label>';
        nuevo_usuario += '<input type="text" name="usuario" id="usuario" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div class="col-md-6" id="div_password">';
        nuevo_usuario += '<label for="password" class="form-label">Password:</label>';
        nuevo_usuario += '<input type="password" name="password" id="password" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<hr>';
        //Campos para datos personales
        nuevo_usuario += '<div class="row">';
        nuevo_usuario += '<h3 class="mt-4">Datos Personales</h3>';
        nuevo_usuario += '<div class="col-md-6">';
        nuevo_usuario += '<div id="div_nombre" class="mb-4">';
        nuevo_usuario += '<label for="nombre" class="form-label">Nombre:</label>';
        nuevo_usuario += '<input type="text" name="nombre" id="nombre" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div id="div_apellidos" class="mb-4">';
        nuevo_usuario += '<label for="apellidos" class="form-label">Apellidos:</label>';
        nuevo_usuario += '<input type="text" name="apellidos" id="apellidos" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div id="div_email" class="mb-4">';
        nuevo_usuario += '<label for="email" class="form-label">Email:</label>';
        nuevo_usuario += '<input type="text" name="email" id="email" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div id="div_teléfono" class="mb-4">';
        nuevo_usuario += '<label for="teléfono" class="form-label">Teléfono:</label>';
        nuevo_usuario += '<input type="text" name="teléfono" id="teléfono" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div class="col-md-6">';
        nuevo_usuario += '<div id="div_fecha_de_nacimiento" class="mb-4">';
        nuevo_usuario += '<label for="fecha_de_nacimiento" class="form-label">F. nacimiento:</label>';
        nuevo_usuario += '<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div id="div_dirección" class="mb-4">';
        nuevo_usuario += '<label for="dirección" class="form-label">Dirección:</label>';
        nuevo_usuario += '<input type="text" name="dirección" id="dirección" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div id="div_sexo">';
        nuevo_usuario += '<label for="sexo" class="form-label">Sexo:</label>';
        nuevo_usuario += '<select name="sexo" id="sexo" class="form-select">';
        nuevo_usuario += '<option value=""></option>';
        nuevo_usuario += '<option value="hombre">Hombre</option>';
        nuevo_usuario += '<option value="mujer">Mujer</option>';
        nuevo_usuario += '</select>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<hr>';
        nuevo_usuario += '<div class="row">';
        nuevo_usuario += '<button id="btn_dar_alta" class="btn btn-primary w-50 mx-auto mt-3">Dar de Alta</button>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</form>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        $('#registro_usuario').append(nuevo_usuario);
    }

    //Función para dar de alta usuario
    function dar_alta(ingreso){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_dar_alta_array.php',
            data: {
                datos: ingreso
            },
            dataType: 'json',
            success: function(response){
                if(response.hasOwnProperty('campos_vacíos')){
                    response['campos_vacíos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El campo es obligatorio</p>';
                        $('#div_'+campo).append(error);
                        //Hacemos scroll hasta el error
                        $('html, body').animate({
                            scrollTop: $('#'+campo).offset().top-100
                        }, 'slow');

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    })
                }else if(response.hasOwnProperty('campos_repetidos')){
                    response['campos_repetidos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' es repetido</p>';
                        $('#div_'+campo).append(error);
                        //Hacemos scroll hasta el error
                        $('html, body').animate({
                            scrollTop: $('#'+campo).offset().top-100
                        }, 'slow');

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    })
                }else if(response.hasOwnProperty('edad_minima')){
                    //Limpiamos antes de iniciar
                    $('#fecha_de_nacimiento').removeClass('is-invalid');
                    $('#error_fecha').remove();

                    //Marcamos campo que presenta error
                    $('#fecha_de_nacimiento').addClass('is-invalid');
                    let error = '<p id="error_fecha" class="text-danger text-start my-1">'+response['edad_minima']+'</p>';
                    $('#div_fecha_de_nacimiento').append(error);
                    //Hacemos scroll hasta el error
                    $('html, body').animate({
                        scrollTop: $('#'+campo).offset().top-100
                    }, 'slow');

                    //Limpiamos al ingresar al campo
                    $('#fecha_de_nacimiento').on('focus', function(){
                        $(this).removeClass('is-invalid');
                        $('#error_fecha').remove();
                    });
                }else if(response.hasOwnProperty('campos_invalidos')){
                    response['campos_invalidos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' no es valido.</p>';
                        $('#div_'+campo).append(error);
                        //Hacemos scroll hasta el error
                        $('html, body').animate({
                            scrollTop: $('#'+campo).offset().top-100
                        }, 'slow');

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    })
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    let m_registrar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>';
                    $('#respuesta').append(m_registrar);
                    $('#registro_usuario').html('');
                    esquema_crear_usuario();
                    //Redirigimos a login.php
                    setTimeout(function() {
                        location.href = 'login.php';
                    }, 2000);
                }
            },
            error: function(){
                alert('No se pudo registrar el usuario.')
            }
        })
    }

    //Creamos formulario para registrar usuario
    esquema_crear_usuario();

    //Limpiamos respuesta al hacer foco en algún campo
    $(document).on('click','input, select', function(){
        $('#respuesta').html('')
    })

    //Botón Dar de Alta
    $(document).on('click','#btn_dar_alta',function(event){
        event.preventDefault();
        let n_usuario = $('#usuario').val();
        let n_password = $('#password').val();
        let n_nombre = $('#nombre').val();
        let n_apellidos = $('#apellidos').val();
        let n_email = $('#email').val();
        let n_teléfono = $('#teléfono').val();
        let n_fecha_de_nacimiento = $('#fecha_de_nacimiento').val();
        let n_dirección = $('#dirección').val();
        let n_sexo = $('#sexo').val();

        var datos = {
            usuario: n_usuario,
            password: n_password,
            nombre: n_nombre,
            apellidos: n_apellidos,
            email: n_email,
            teléfono: n_teléfono,
            fecha_de_nacimiento: n_fecha_de_nacimiento,
            dirección: n_dirección,
            sexo: n_sexo
        };
        dar_alta(datos);
    })
    
})