$(document).ready(function() {
    // Esquema de formulario para crear noticia
    function esquema_crear_noticia() {
        // Creamos el formulario necesario para recoger los datos
        let nuevo_usuario = '<div class="card mb-3">';
        nuevo_usuario += '<div class="card-body">';
        nuevo_usuario += '<div id="formulario_CN">';
        nuevo_usuario += '<h3 class="mb-3">Crear Noticia</h3>';
        nuevo_usuario += '<form id="formulario_NC" name="formulario_NC" enctype="multipart/form-data" method="post">';
        nuevo_usuario += '<div class="row my-4">';
        //Columna con título, fecha y foto
        nuevo_usuario += '<div class="col-md-6 px-4">';
        nuevo_usuario += '<div class="mb-3" id="div_título">';
        nuevo_usuario += '<label for="titulo" class="form-label">Título:</label>';
        nuevo_usuario += '<input type="text" class="form-control" name="título" id="título" required>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div class="mb-3" id="div_fecha">';
        nuevo_usuario += '<label for="fecha" class="form-label">Fecha:</label>';
        nuevo_usuario += '<input type="date" class="form-control" name="fecha" id="fecha" required>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<div class="mb-3" id="div_foto">';
        nuevo_usuario += '<label for="foto" class="form-label">Foto:</label>';
        nuevo_usuario += '<input type="file" class="form-control" name="foto" id="foto" required>';
        nuevo_usuario += '<img id="imagen_vista_previa" src="" class="mt-3" style="display: none; max-width: 100%;">';
        nuevo_usuario += '<div id="div_foto_nueva"></div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        //Columna solo para el texto
        nuevo_usuario += '<div class="col-md-6 px-4">';
        nuevo_usuario += '<div class="mb-3" id="div_texto">';
        nuevo_usuario += '<label for="texto" class="form-label">Texto:</label>';
        nuevo_usuario += '<textarea class="form-control" name="texto" id="texto" cols="50" rows="8" required></textarea>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '<hr>';
        nuevo_usuario += '<div class="row my-4">';
        nuevo_usuario += '<button id="btn_dar_alta" class="btn btn-primary w-50 mx-auto">Presentar Noticia</button>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</form>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';
        nuevo_usuario += '</div>';

        $('#crear_noticias').append(nuevo_usuario);

        // Agregar controlador de eventos al campo de selección de imagen 'foto' para pre visualizar la imagen
        $('#foto').on('change', (event) => {
            const [file] = event.target.files;
            const imagenPrevia = $('#imagen_vista_previa');

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    imagenPrevia.attr('src', e.target.result).css('display', 'block');
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // Función para dar de alta noticia
    function guardar_noticia() {
        var parametros = new FormData($('#formulario_NC')[0]);

        $.ajax({
            type: 'POST',
            url: '../../controllers/noticia/noticia_guardar.php',
            data: parametros,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(response) {
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
                        //Hacemos scroll hasta el error
                        $('html, body').animate({
                            scrollTop: $('#'+campo).offset().top-100
                        }, 'slow');

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    });
                //Respuesta a otros errores
                }else if(response.hasOwnProperty('otros_errores')){
                    //Limpiamos antes de iniciar
                    $('#foto').removeClass('is-invalid');
                    $('#error_imagen').remove();

                    //Marcamos campos que presentan error
                    $('#foto').addClass('is-invalid');
                    let error = '<p id="error_imagen" class="text-danger text-start my-1">'+response['otros_errores']+'</p>';
                    $('#div_foto_nueva').append(error);
                    //Hacemos scroll hasta el error
                    $('html, body').animate({
                        scrollTop: $('#'+campo).offset().top-100
                    }, 'slow');

                    //Limpiamos al ingresar a los campos
                    $('#foto').on('focus', function(){
                        $(this).removeClass('is-invalid');
                        $('#error_imagen').remove();
                });
                //Respuesta correcta
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    $('#ver_citas').html('');
                    $('#btn_ver_noticias').click();
                    let m_editar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                    $('#respuesta').append(m_editar);
                }
            },
            error: function() {
                $('#ver_citas').html('');
                $('#btn_ver_noticias').click();
                alert('No se pudo guardar la noticia.');
            }
        });
    }

    //Función para mostrar plantilla para los datos
    function esquema_info_noticias() {
        // Creamos el formulario necesario para presentar los datos
        let esquema_info_noticias = '<div class="card mb-3">';
        esquema_info_noticias += '<div class="card-body">';
        esquema_info_noticias += '<div id="formulario_DU">';
        esquema_info_noticias += '<h3>Noticias Presentadas</h3>';
        esquema_info_noticias += '<div class="contenedor_tabla">'
        esquema_info_noticias += '<table id="tabla_noticias" class="table table-hover">';
        esquema_info_noticias += '<thead class="thead-dark">';
        esquema_info_noticias += '<tr>';
        esquema_info_noticias += '<th></th>';
        esquema_info_noticias += '<th>ID</th>';
        esquema_info_noticias += '<th>Título</th>';
        esquema_info_noticias += '<th>Imagen</th>';
        esquema_info_noticias += '<th>Fecha</th>';
        esquema_info_noticias += '<th>Autor</th>';
        esquema_info_noticias += '<th>Estado</th>';
        esquema_info_noticias += '</tr>';
        esquema_info_noticias += '</thead>';
        esquema_info_noticias += '<tbody>';
        esquema_info_noticias += '</tbody>';
        esquema_info_noticias += '</table>';
        esquema_info_noticias += '</div>';
        esquema_info_noticias += '</div><br>';
        esquema_info_noticias += '<div id="acciones">';
        esquema_info_noticias += '<button id="btn_editar" class="btn btn-primary mx-2" disabled>Editar</button>';
        esquema_info_noticias += '<button id="btn_borrar" class="btn btn-danger" disabled>Borrar</button>';
        esquema_info_noticias += '</div>';
        esquema_info_noticias += '</div>';
        esquema_info_noticias += '</div>';

        $('#ver_citas').append(esquema_info_noticias);
    }
    
    //Función para recuperar información de las noticias
    function recuperar_noticias(){
        $.ajax({
            type: 'POST',
            url: '../../controllers/noticia/noticia_recuperar.php',
            dataType: 'json',
            success: function(response) {
                //Guardamos la respuesta en una variable
                let noticias = response['noticias'];
                
                //Imprimimos datos en pantalla
                esquema_info_noticias();
                let n_noticias = noticias.length;
                for (let i = 0; i < n_noticias; i++) {
                    // Dividimos la fecha en año, mes y día
                    let fechaOriginal = noticias[i]['fecha'];
                    let partesFecha = fechaOriginal.split('-');
                    let año = partesFecha[0];
                    let mes = partesFecha[1];
                    let dia = partesFecha[2];

                    // Creamos la nueva fecha en el formato deseado (dd-mm-yyyy)
                    let fechaFormateada = dia + "-" + mes + "-" + año;
                    
                    let info_noticias = '<tr>';
                    info_noticias += '<td><input type="radio" name="noticia_seleccionada" class="form-check-input"></td>';
                    info_noticias += '<td name="id_noticia">'+noticias[i]['idNoticia']+'</td>';
                    info_noticias += '<td name="título">'+noticias[i]['título']+'</td>';
                    info_noticias += '<td name="imagen">'+noticias[i]['imagen']+'</td>';
                    info_noticias += '<td name="fecha">'+fechaFormateada+'</td>';
                    info_noticias += '<td name="autor">'+noticias[i]['usuario']+'</td>';
                    info_noticias += '<td name="estado">'+noticias[i]['estado']+'</td>';
                    info_noticias += '</tr>';
                    $('#tabla_noticias tbody').append(info_noticias);
                }

                // Habilitamos botones cuando se selecciona una noticia
                $('#tabla_noticias input[name="noticia_seleccionada"]').on('change', function() {
                    if ($(this).is(':checked')) {
                        $('#btn_editar, #btn_borrar').prop('disabled', false);
                    } else {
                        $('#btn_editar, #btn_borrar').prop('disabled', true);
                    }
                });

            },
            error: function(){
                let m_error = '<div class="alert alert-danger" role="alert"><p class="text-center my-1">No existen noticias para mostrar.</p></div>';
                $('#respuesta').append(m_error);
            }
        })
        
    }

    // Esquema de formulario para editar noticia
    function esquema_editar_noticia(id_noticia) {
        $.ajax({
            type: 'POST',
            url: '../../controllers/noticia/noticia_recuperar.php',
            data: {
                idNoticia: id_noticia
            },
            dataType: 'json',
            success: function (response) {
                let noticia = response['noticia_individual'];

                // Creamos el formulario necesario para recoger los datos
                let nuevo_usuario = '<div class="card mb-3">';
                nuevo_usuario += '<div class="card-body">';
                nuevo_usuario += '<div id="formulario_CN">';
                nuevo_usuario += '<h3 class="mb-3">Editar Noticia</h3>';
                nuevo_usuario += '<form id="formulario_NE" name="formulario_NE" enctype="multipart/form-data" method="post">';
                nuevo_usuario += '<div class="row my-4">';
                //Columna con título, fecha y fotos
                nuevo_usuario += '<div class="col-md-6 px-4">';
                nuevo_usuario += '<label for="estado" class="form-label">Estado:</label>';
                nuevo_usuario += '<input type="text" class="form-control mb-3" name="estado" id="estado" value="' + noticia.estado + '" disabled>';
                nuevo_usuario += '<label for="usuario" class="form-label">Autor:</label>';
                nuevo_usuario += '<input type="text" class="form-control mb-3" name="usuario" id="usuario" value="' + noticia.usuario + '" disabled>';
                nuevo_usuario += '<div class="mb-3" id="div_título">';
                nuevo_usuario += '<label for="titulo" class="form-label">Título:</label>';
                nuevo_usuario += '<input type="text" class="form-control mb-3" name="título" id="título" value="' + noticia.título + '">';
                nuevo_usuario += '</div>';
                nuevo_usuario += '<div class="mb-3" id="div_fecha">';
                nuevo_usuario += '<label for="fecha" class="form-label">Fecha:</label>';
                nuevo_usuario += '<input type="date" class="form-control mb-3" name="fecha" id="fecha" value="' + noticia.fecha + '">';
                nuevo_usuario += '</div>';
                nuevo_usuario += '<div class="row">';
                nuevo_usuario += '<div class="col-md-6 d-flex flex-column">'
                nuevo_usuario += '<label for="foto_actual" class="form-label">Foto Actual:</label>';
                nuevo_usuario += '<img src="../../img/noticias/' + noticia.imagen + '" class="img-fluid mb-3">';
                nuevo_usuario += '</div>';
                nuevo_usuario += '<div class="col-md-6 d-flex flex-column mb-3">'
                nuevo_usuario += '<label for="foto" class="form-label">Nueva Foto:</label>';
                nuevo_usuario += '<img id="imagen_vista_previa" src="" class="mb-3" style="display: none;">'
                nuevo_usuario += '<input type="file" class="form-control" name="foto" id="foto">';
                nuevo_usuario += '<div id="div_foto_nueva"></div>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</div>';
                //Columna solo para el texto
                nuevo_usuario += '<div class="col-md-6 px-4">';
                nuevo_usuario += '<div id="div_texto">';
                nuevo_usuario += '<label for="texto" class="form-label">Texto:</label>';
                nuevo_usuario += '<textarea class="form-control" name="texto" id="texto" cols="50" rows="8">' + noticia.texto + '</textarea>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '<hr>';
                nuevo_usuario += '<div class="row d-flex flex-column my-4">';
                nuevo_usuario += '<button id="btn_guardar_editar" class="btn btn-primary w-50 mx-auto">Guardar Cambios</button><br>';
                nuevo_usuario += '<button id="btn_volver" class="btn btn-primary w-50 mx-auto">Volver</button>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</form>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</div>';
                nuevo_usuario += '</div>';
                $('#ver_citas').append(nuevo_usuario);

                // Agregamos controlador de eventos al campo de selección de imagen 'foto' para pre visualizar la imagen
                $('#foto').on('change', (event) => {
                    const [file] = event.target.files;
                    const imagenPrevia = $('#imagen_vista_previa');

                    if (file) {
                        const reader = new FileReader();

                        reader.onload = (e) => {
                            imagenPrevia.attr('src', e.target.result).css('display', 'block');
                        };

                        reader.readAsDataURL(file);
                    }
                });
            },
            error: function () {
                alert('No se pudo conectar');
            }
        })
    }

    //Función para editar noticia
    function editar_noticia(){
        var parametros = new FormData($('#formulario_NE')[0]);

        //Verificamos si se seleccionó una nueva foto
        if($('#foto')[0].files.length ===0){
            parametros.delete('foto')
        }

        $.ajax({
            type: 'POST',
            url: '../../controllers/noticia/noticia_editar.php',
            data: parametros,
            contentType: false,
            processData: false,
            dataType:'json',
            success: function(response) {
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
                        //Hacemos scroll hasta el error
                        $('html, body').animate({
                            scrollTop: $('#'+campo).offset().top-100
                        }, 'slow');

                        //Limpiamos al ingresar a los campos
                        $('#'+campo).on('focus', function(){
                            $(this).removeClass('is-invalid');
                            $('#error_'+campo).remove();
                        });
                    });
                //Respuesta a otros errores
                }else if(response.hasOwnProperty('otros_errores')){
                    //Limpiamos antes de iniciar
                    $('#foto').removeClass('is-invalid');
                    $('#error_imagen').remove();

                    //Marcamos campos que presentan error
                    $('#foto').addClass('is-invalid');
                    let error = '<p id="error_imagen" class="text-danger text-start my-1">'+response['otros_errores']+'</p>';
                    $('#div_foto_nueva').append(error);
                    //Hacemos scroll hasta el error
                    $('html, body').animate({
                        scrollTop: $('#'+campo).offset().top-100
                    }, 'slow');

                    //Limpiamos al ingresar a los campos
                    $('#foto').on('focus', function(){
                        $(this).removeClass('is-invalid');
                        $('#error_imagen').remove();
                    });
                //Respuesta correcta
                }else{
                    //Hacemos scroll hasta la parte superior
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                    //Informamos respuesta
                    $('#ver_citas').html('');
                    $('#btn_ver_noticias').click();
                    let m_editar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response['ok']+'</p></div>'
                    $('#respuesta').append(m_editar);
                }
            },
            error: function() {
                alert('No se pudo guardar la noticia.');
            }
        })
    }

    //Función para borrar noticia
    function eliminar_noticia(idNoticia){
        $.ajax({
            type: 'POST',
            url: '../../controllers/noticia/noticia_eliminar.php',
            data: {
                id_noticia: idNoticia
            },
            success: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                $('#btn_ver_noticias').click();
                let m_eliminar = '<div class="alert alert-success" role="alert"><p class="text-center my-1">'+response+'</p></div>'
                $('#respuesta').append(m_eliminar);
            },
            error: function(response){
                //Hacemos scroll hasta la parte superior
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
                //Informamos respuesta
                $('#btn_ver_noticias').click();
                let m_eliminar = '<p class="text-danger text-center my-1">'+response+'</p>';
                $('#respuesta').append(m_eliminar);
            }
        })
    }



    //Mostramos la noticias creadas
    recuperar_noticias();

    // Botón Ver Noticias
    $('#btn_ver_noticias').on('click', function(event){
        event.preventDefault();
        //Limpiamos la pantalla
        $('#ver_citas').html('');
        $('#respuesta').html('');
        $('#crear_noticias').html('');
        //Recuperamos las noticias
        recuperar_noticias();
    })

    //Botón Editar Noticias
    $(document).on('click', '#btn_editar', function(event) {
        event.preventDefault();
        //Encontramos el registro seleccionado
        let noticia = $('#tabla_noticias input[name="noticia_seleccionada"]:checked').closest('tr');
        //Recuperamos el id de la noticia
        let id_noticia = noticia.find('td[name="id_noticia"]').html();
        //Limpiamos la pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        //Imprimimos nuevo esquema para editar
        esquema_editar_noticia(id_noticia);
    });

    //Botón Volver
    $(document).on('click', '#btn_volver', function(event) {
        event.preventDefault();
        //Limpiamos pantalla
        $('#respuesta').html('');
        $('#ver_citas').html('');
        //Mostramos las noticias
        $('#btn_ver_noticias').click();
    });

    //Botón Guardar Cambios
    $(document).on('click', '#btn_guardar_editar', function(event) {
        event.preventDefault();
        editar_noticia();
    });

    //Botón Borrar Noticias
    $(document).on('click', '#btn_borrar', function(event) {
        event.preventDefault();
        //Limpiamos respuestas
        $('#respuesta').html('');
        //Encontramos el div que contiene el registro seleccionado
        let noticia = $('#tabla_noticias input[name="noticia_seleccionada"]:checked').closest('tr');
        //Recuperamos los valores para la sentencia de eliminación
        let idNoticia = noticia.find('td[name="id_noticia"]').html();
        eliminar_noticia(idNoticia);
    });

    // Botón Crear Noticias
    $('#btn_crear_noticias').on('click', function(event) {
        event.preventDefault();
        //Limpiamos la pantalla
        $('#ver_citas').html('');
        $('#respuesta').html('');
        $('#crear_noticias').html('');
        //Presentamos esquema para crear noticia
        esquema_crear_noticia();
    });

    // Botón Guardar Noticia
    $(document).on('click', '#btn_dar_alta', function(event) {
        event.preventDefault();
        guardar_noticia();
    });

});
