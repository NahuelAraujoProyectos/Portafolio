$(document).ready(function(){
    //Función para determinar el rol del usuario a consultar
    function elegir_usuario(){
        //Columna para seleccionar usuario y opciones 
        let buscar_usuario = '<div class="col-md-4">';
        buscar_usuario += '<div class="card mb-3">';
        buscar_usuario += '<div class="card-body">';
        buscar_usuario += '<form id="formulario_BU">'
        buscar_usuario += '<h3>Elegir Usuario</h3>';
        buscar_usuario += '<div class="row mt-3">';
        buscar_usuario += '<div class="col mb-3">';
        buscar_usuario += '<label class="form-label" for="select_rol">Rol:</label>';
        buscar_usuario += '<select name="select_rol" id="select_rol" class="form-select">';
        buscar_usuario += '<option></option>';
        buscar_usuario += '<option>admin</option>';
        buscar_usuario += '<option>user</option>';
        buscar_usuario += '</select>';
        buscar_usuario += '</div>';
        buscar_usuario += '<div class="col" id="lista_usuarios"></div>';
        buscar_usuario += '</div>';
        buscar_usuario += '</form>';
        buscar_usuario += '</div>';
        buscar_usuario += '</div>';
        buscar_usuario += '<div id="btn_opciones" class="d-flex flex-column mb-3">';
        buscar_usuario += '</div>';
        buscar_usuario += '</div>';
        //Columna para mostrar info de usuarios
        buscar_usuario += '<div class="col-md-8">'
        buscar_usuario += '<div id="info_usuario"></div>';
        //Lo añadimos al div de #ver_usuarios
        $('#ver_usuarios').append(buscar_usuario);
        //Controlamos si se eligió el rol, para mostrar los usuarios adecuados
        $('#select_rol').on('change',function(){
            //Limpiamos la pantalla
            $('#lista_usuarios').html('');
            $('#info_usuario').html('');
            $('#respuesta').html('');
            //Recuperamos el rol en una variable
            var rol_elegido = $('#select_rol').val();
            if(rol_elegido!==''){
                //Mostramos la lista de usuarios correspondiente
                recuperar_usuarios(rol_elegido);
            }
        })
    }

    //Función para cargar el id del usuario elegido en $_SESSION['id_usuario_elegido']
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

    //Función para mostrar los usuarios correspondientes al rol elegido
    function recuperar_usuarios(rol_usuario){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_recuperar.php',
            data: {
                rolUser: rol_usuario
            },
            dataType: 'json',
            success: function(response){  
                let usuarios = response['usuarios'];          
                let n_usuarios = usuarios.length;
                //Creamos select para almacenar lista de usuarios
                let lista_usuario = '<label class="form-label" for="select_usuario">Usuario:</label>';
                lista_usuario += '<select name="select_usuario" id="select_usuario" class="form-select">';
                lista_usuario += '<option></option>';
                lista_usuario += '</select><br>';
                //Limpiamos la pantalla
                $('#lista_usuarios').html('');
                //Añadimos el select al div con #lista_usuarios
                $('#lista_usuarios').append(lista_usuario);
                //Agregamos usuarios al select
                for(i=0;i<n_usuarios;i++){
                    let usuario = usuarios[i];
                    let ingreso = '<option>'+usuario['usuario']+'</option>';
                    $('#select_usuario').append(ingreso);
                }
                //Controlamos si se eligió un usuario para mostrar su información
                $('#select_usuario').on('change',function(){
                    $('#info_usuario').html('');
                    $('#btn_opciones').html('');
                    if($('#select_usuario').val()!==''){
                        for(i=0;i<n_usuarios;i++){
                            let usuario = usuarios[i];
                            //Recuperamos el id del usuario en cuestión
                            if($('#select_usuario').val()==usuario['usuario']){
                                cargar_id_usuario(usuario['usuario'],usuario['id_usuario']);
                                esquema_info_usuario();
                                informacion_usuario();
                            }
                        }
                    }
                })
            },
            error: function(){
                $('#respuesta').html('');
                //Informamos respuesta
                let m_registrar = '<div class="alert alert-danger" role="alert"><p class="text-center my-1">No existen usuarios con dicho rol.</p></div>';
                $('#respuesta').append(m_registrar);
            }
        })
    }
  
    //Función para mostrar plantilla para los datos
    function esquema_info_usuario(){
        //Creamos el formulario necesario para presentar los datos
        let info_usuario = '<div class="card" id="formulario">';
        info_usuario += '<div class="card-body">';
        info_usuario += '<form id="formulario_DP" class="mb-4">';
        info_usuario += '<h3>Datos Personales</h3>';
        info_usuario += '<div class="row my-3">';
        info_usuario += '<div class="col-md-6">';
        info_usuario += '<div class="mb-4" id="div_nombre">';
        info_usuario += '<label for="nombre" class="form-label">Nombre:</label>';
        info_usuario += '<input type="text" name="nombre" id="nombre" class="form-control" disabled>';
        info_usuario += '</div>';
        info_usuario += '<div class="mb-4" id="div_apellidos">';
        info_usuario += '<label for="apellidos" class="form-label">Apellidos:</label>';
        info_usuario += '<input type="text" name="apellidos" id="apellidos" class="form-control" disabled>';
        info_usuario += '</div>';
        info_usuario += '<div class="mb-4" id="div_email">';
        info_usuario += '<label for="email" class="form-label">Email:</label>';
        info_usuario += '<input type="text" name="email" id="email" class="form-control" disabled>';
        info_usuario += '</div>';
        info_usuario += '<div class="mb-4" id="div_teléfono">';
        info_usuario += '<label for="teléfono" class="form-label">Teléfono:</label>';
        info_usuario += '<input type="text" name="teléfono" id="teléfono" class="form-control" disabled>';
        info_usuario += '</div>';
        info_usuario += '</div>';
        info_usuario += '<div class="col-md-6">';
        info_usuario += '<div class="mb-4" id="div_fecha_de_nacimiento">';
        info_usuario += '<label for="fecha_de_nacimiento" class="form-label">F. nacimiento:</label>';
        info_usuario += '<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control" disabled>';
        info_usuario += '</div>';
        info_usuario += '<div class="mb-4" id="div_dirección">';
        info_usuario += '<label for="dirección" class="form-label">Dirección:</label>';
        info_usuario += '<input type="text" name="dirección" id="dirección" class="form-control" disabled>';
        info_usuario += '</div>';
        info_usuario += '<div class="mb-4" id="div_sexo">';
        info_usuario += '<label for="sexo" class="form-label">Sexo:</label>';
        info_usuario += '<select name="sexo" id="sexo" class="form-select" disabled>';
        info_usuario += '<option value=""></option>';
        info_usuario += '<option value="hombre">Hombre</option>';
        info_usuario += '<option value="mujer">Mujer</option>';
        info_usuario += '</select>';
        info_usuario += '</div>';
        info_usuario += '</div>';
        info_usuario += '</form>';   
        info_usuario += '</div>';
        info_usuario += '</div>';
        $('#info_usuario').append(info_usuario);

        //Añadimos los botones de opciones
        let btn_opciones = '<div class="card">';
        btn_opciones += '<div class="card-body text-center" id="div_opciones">';
        btn_opciones += '<h3 class="text-start">Opciones</h3>';
        btn_opciones += '<button class="btn btn-primary w-75 mx-auto" id="modificar_datos">Cambiar Datos</button>';
        btn_opciones += '<button class="btn btn-primary w-75 mx-auto" id="modificar_rol">Cambiar Rol</button>';
        btn_opciones += '<button class="btn btn-primary w-75 mx-auto" id="modificar_password">Cambiar Password</button>';
        btn_opciones += '<button class="btn btn-primary w-75 mx-auto" id="eliminar_usuario">Eliminar Usuario</button>';
        btn_opciones += '</div>';
        btn_opciones += '</div>';
        $('#btn_opciones').append(btn_opciones);
    }

    //Función para datos del usuario en plantilla
    function informacion_usuario(){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_informacion.php',
            dataType: 'json',
            success: function(response){
                let usuarios = response['info_usuario'];
                var campos = ['nombre','apellidos','email','teléfono','fecha_de_nacimiento','dirección','sexo']
                campos.forEach(campo => {
                    $('#'+campo).val(usuarios[campo])
                })
            },
            error: function(){
                alert('Error al recuperar los datos del usuario')
            }
        })
    }

    //Función para habilitar el cambio de datos...
    function habilitar_datos(){
        var campos = ['nombre','apellidos','email','teléfono','fecha_de_nacimiento','dirección','sexo']
        campos.forEach(campo => {
            $('#'+campo).prop('disabled',false)
        })
    }

    //Función para deshabilitar el cambio de datos...
    function deshabilitar_datos(){
        var campos = ['nombre','apellidos','email','teléfono','fecha_de_nacimiento','dirección','sexo']
        campos.forEach(campo => {
            $('#'+campo).prop('disabled',true)
        })
    }

    //Función para modificar datos del usuario
    function modificar_informacion(){
        let parametros = new FormData($('#formulario_DP')[0])

        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_modificar.php',
            data: parametros,
            contentType: false,
            processData: false, 
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

                        //Limpiamos al presionar Volver
                        $('#btn_volver').on('click',function(){
                            location.reload();
                        })
                    })
                }else if(response.hasOwnProperty('campos_repetidos')){
                    response['campos_repetidos'].forEach(campo => {
                        //Limpiamos antes de iniciar
                        $('#'+campo).removeClass('is-invalid');
                        $('#error_'+campo).remove();

                        //Marcamos campos que presentan error
                        $('#'+campo).addClass('is-invalid');
                        let error = '<p id="error_'+campo+'" class="text-danger text-start my-1">El '+campo+' ya está en uso.</p>';
                        $('#div_'+campo).append(error);
                        //Hacemos scroll hasta el error
                        $('html, body').animate({
                            scrollTop: $('#'+campo).offset().top-100
                        }, 'slow');

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('click', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });

                        //Limpiamos al presionar Volver
                        $('#btn_volver').on('click',function(){
                            location.reload();
                        })
                    })
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    let m_registrar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>'
                    $('#respuesta').append(m_registrar);
                    //Quitamos botón para guardar cambios
                    $('#guardar_datos').remove();
                    deshabilitar_datos();
                    //Mostramos botones
                    $('#modificar_datos').toggle();
                    $('#modificar_rol').toggle();
                    $('#modificar_password').toggle();
                    $('#eliminar_usuario').toggle();
                }
            },
            error: function(){                
                alert('Error al modificar los datos del usuario')
            }
        })
    }

    //Función para eliminar usuarios
    function eliminar_usuario(){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_eliminar.php',
            success: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                let m_eliminar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                $('#respuesta').append(m_eliminar);
            },
            error: function(response){
                alert(response)
            }
        })
    }

    //Función para cambiar rol de usuario
    function editar_rol(rol_usuario_elegido){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_modificar_rol.php',
            data: {
                rolUser: rol_usuario_elegido
            },
            success: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                let m_editar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                $('#respuesta').append(m_editar);
            },
            error: function(response){
                alert(response)
            }
        })
    }

    //Esquema para recoger nuevo password
    function esquema_nuevo_password(){
        let nuevo_password = '<div id="esquema_nuevo_password">'
        nuevo_password += '<div class="w-75 mx-auto" id="div_nuevo_password">';
        nuevo_password += '<label for="nuevo_password" class="form-label">Nuevo Password:</label>';
        nuevo_password += '<input type="password" class="form-control" name="nuevo_password "id="nuevo_password">';
        nuevo_password += '</div>';
        nuevo_password += '<br><button class="btn btn-primary w-75 mx-auto" id="guardar_password">Guardar Cambios</button>'
        nuevo_password += '</div>';
        $('#div_opciones').append(nuevo_password);
    }

    //Función para cambiar password de usuario
    function editar_password(nuevo_password){
        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_modificar_password.php',
            data: {
                password: nuevo_password
            },
            dataType: 'json',
            success: function(response){
                if(response.hasOwnProperty('campos_vacíos')){
                    $('#nuevo_password').addClass('is-invalid');

                    //Limpiamos antes de iniciar
                    $('#nuevo_password').removeClass('is-invalid');
                    $('#error_password').remove();

                    //Marcamos campos que presentan error
                    $('#nuevo_password').addClass('is-invalid');
                    let error = '<p id="error_password" class="text-danger text-start my-1">El campo es obligatorio</p>';
                     $('#div_nuevo_password').append(error);

                    //Limpiamos al ingresar a los campos
                    $('#nuevo_password').on('focus', function(){
                        $(this).removeClass('is-invalid');
                        $('#error_password').remove();
                    });
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    let m_registrar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>'
                    $('#respuesta').append(m_registrar);
                    //Limpiamos la pantalla
                    $('#esquema_nuevo_password').remove();
                    //Mostramos botones
                    $('#modificar_datos').toggle();
                    $('#modificar_rol').toggle();
                    $('#modificar_password').toggle();
                    $('#eliminar_usuario').toggle();
                }
            },
            error: function(response){
                alert(response)
            }
        })
    }

    //Esquema de formulario para crear usuario
    function esquema_crear_usuario(){
        //Creamos el formulario necesario para recoger los datos
        let nuevo_usuario = '<div class="card">';
        nuevo_usuario += '<div class="card-body">';
        nuevo_usuario += '<form id="formulario_DP">';
        nuevo_usuario += '<div class="row">';
        nuevo_usuario += '<h3 class="mt-4">Datos de Usuario</h3>';
        //Campos para datos de usuario
        nuevo_usuario += '<div class="col-md-4" id="div_usuario">';
        nuevo_usuario += '<label for="usuario" class="form-label">Usuario:</label>';
        nuevo_usuario += '<input type="text" name="usuario" id="usuario" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div class="col-md-4" id="div_password">';
        nuevo_usuario += '<label for="password" class="form-label">Password:</label>';
        nuevo_usuario += '<input type="password" name="password" id="password" class="form-control">';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div class="col-md-4">';
        nuevo_usuario += '<label for="rol" class="form-label">Rol:</label>';
        nuevo_usuario += '<select name="rol" id="rol" class="form-select">';
        nuevo_usuario += '<option value=""></option>';
        nuevo_usuario += '<option value="admin">admin</option>';
        nuevo_usuario += '<option value="user">user</option>';
        nuevo_usuario += '</select>';
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
        $('#crear_usuario').append(nuevo_usuario);
    }

    //Función para dar de alta usuario
    function dar_alta(){
        let parametros = new FormData($('#formulario_DP')[0])
        parametros.append('usuario',$('#usuario').val())
        parametros.append('password',$('#password').val())
        parametros.append('rol',$('#rol').val())

        $.ajax({
            type: 'POST',
            url: '../../controllers/usuario/usuario_dar_alta.php',
            data: parametros,
            contentType: false,
            processData: false,
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

                        //Limpiamos al presionar Volver
                        $('#btn_volver').on('click',function(){
                            location.reload();
                        })
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
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    $('#crear_usuario').html('');
                    let m_registrar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                    $('#respuesta').append(m_registrar);
                }
            },
            error: function(){
                alert('No se pudo registrar el usuario.')
            }
        })
    }




    //Botón Ver Usuarios
    $('#btn_ver_usuario').on('click',function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#ver_usuarios').html('');
        $('#respuesta').html('');
        $('#crear_usuario').html('');
        //Elegimos usuario
        elegir_usuario();
    })   

    //Botón Cambiar Datos
    $(document).on('click','#modificar_datos',function(event){
        event.preventDefault();
        habilitar_datos();
        //Limpiamos respuestas
        $('#respuesta').html('');
        //Creamos botón para guardar cambios
        let btn_guardar = '<button class="btn btn-primary w-75 mx-auto" id="guardar_datos">Guardar Cambios</button>';
        $('#div_opciones').append(btn_guardar);
        //Ocultamos botones
        $('#modificar_datos').toggle();
        $('#modificar_rol').toggle();
        $('#modificar_password').toggle();
        $('#eliminar_usuario').toggle();
    })

    //Botón Guardar Datos
    $(document).on('click','#guardar_datos',function(event){
        event.preventDefault();
        modificar_informacion();
    })

    //Botón Borrar Usuario
    $(document).on('click','#eliminar_usuario',function(event){
        event.preventDefault();
        //Limpiamos respuesta
        $('#respuesta').html('')
        eliminar_usuario();
        //Limpiamos pantalla
        $('#ver_usuarios').html('');
        $('#btn_ver_usuario').click();
    })

    //Botón Editar rol de Usuario
    $(document).on('click','#modificar_rol',function(event){
        event.preventDefault();
        //Limpiamos respuesta
        $('#respuesta').html('');
        let rol_usuario_elegido = $('#select_rol').val();
        editar_rol(rol_usuario_elegido);  
        //Limpiamos pantalla
        $('#ver_usuarios').html('');
        $('#btn_ver_usuario').click();
    })

    //Botón Cambiar Password
    $(document).on('click','#modificar_password',function(event){
        event.preventDefault();
        //Limpiamos respuesta
        $('#respuesta').html('');
        //Creamos esquema para cambiar password
        esquema_nuevo_password();
        //Ocultamos botones
        $('#modificar_datos').toggle();
        $('#modificar_rol').toggle();
        $('#modificar_password').toggle();
        $('#eliminar_usuario').toggle();
    })

    //Botón Guardar Password
    $(document).on('click','#guardar_password',function(event){
        event.preventDefault();
        //Recuperamos el password nuevo
        let nuevo_password = $('#nuevo_password').val();
        //Editamos password
        editar_password(nuevo_password); 
    })

    //Botón Crear Usuario
    $('#btn_crear_usuario').on('click',function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#ver_usuarios').html('');
        $('#respuesta').html('');
        $('#crear_usuario').html('');
        //Mostramos esquema para crear usuario
        esquema_crear_usuario();
    })

    //Botón Dar de Alta
    $(document).on('click','#btn_dar_alta',function(event){
        event.preventDefault();
        dar_alta();
    })
  
})