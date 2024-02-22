$(document).ready(function(){
    //Función para login
    function login_usuario(credenciales){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/login_usuario.php',
            data: {
                datos: credenciales
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
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' es obligatorio</p>';
                        $('#div_'+campo).append(error);

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    });                    
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    let m_login = '<div class="alert alert-success" role="alert"><p class="text-center my-1">Acceso Correcto.<br>¡Bienvenid@!</p></div>';
                    $('#respuesta').append(m_login);
                    $('#login_usuario').html('');
                    esquema_login();
                    //Redirigimos a index.php
                    setTimeout(function() {
                        location.href = '../../index.php';
                    }, 2000);
                }
            },
            error: function(){
                //Limpiamos
                $('#div_respuesta').html('');

                //Mostramos error
                let error = '<p id="respuesta" class="text-danger text-start my-1">El usuario no existe o la contraseña no es correcta.</p>'
                $('#div_respuesta').append(error);

                //Limpiamos al ingresar a los campos
                $('#usuario').on('click',function(){
                    $('#div_respuesta').html('');
                })
                $('#password').on('click',function(){
                    $('#div_respuesta').html('');
                })
                $('#btn_limpiar').on('click',function(){
                    $('#div_respuesta').html('');
                })
            }
        })
    }

    //Función para mostrar formulario Login
    function esquema_login(){
        //Creamos el formulario necesario loguearse
        let login_usuario = '<form id="formulario_LOGIN">';
        login_usuario += '<h3>Datos de Usuario</h3>';
        login_usuario += '<div class="mb-3" id="div_usuario">';
        login_usuario += '<input type="text" class="form-control" name="usuario" id="usuario" placeholder="Usuario">';
        login_usuario += '</div>';
        login_usuario += '<div class="mb-3" id="div_password">';
        login_usuario += '<input type="password" class="form-control" name="password" id="password" placeholder="Password">';
        login_usuario += '</div>';
        login_usuario += '<div class="mb-3" id="div_respuesta">';
        login_usuario += '</div>';
        login_usuario += '<button class="btn btn-primary mx-2" id="btn_ingresar">Ingresar</button>';
        login_usuario += '<button class="btn btn-primary mx-2" id="btn_limpiar">Limpiar</button>';
        login_usuario += '</form>';
        //Lo añadimos al div #login_usuario
        $('#login_usuario').append(login_usuario);
    }

    //Presentamos el formulario de login.
    esquema_login();
    
    //Botón Ingresar
    $(document).on('click','#btn_ingresar',function(event){
        event.preventDefault();
        let n_usuario = $('#usuario').val();
        let n_password = $('#password').val();

        var datos = {
            usuario: n_usuario,
            password: n_password,
        };
        login_usuario(datos);
    })
    
})