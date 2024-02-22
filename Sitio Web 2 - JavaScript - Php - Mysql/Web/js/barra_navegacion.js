$(document).ready(function() {

    var basePath = window.location.pathname;
    //Preposición si estamos en index.php
    var correccion_1 = basePath.includes('index.php') ? '' : '../../';
    var correccion_5 = basePath.includes('index.php') ? 'views/user/' : '';
    var correccion_6 = basePath.includes('index.php') ? 'views/admin/' : '';
    var correccion_7 = basePath.includes('index.php') ? 'views/public/' : '';


    //Preposicion si estamos en carpeta user o queremos ir a user
    var correccion_2 = basePath.includes('user') ? '' : '../../views/user/';
    //Preposicion si estamos en carpeta admin o queremos ir a admin
    var correccion_3 = basePath.includes('admin') ? '' : '../../views/admin/';
    //Preposicion si estamos en carpeta public o queremos ir a public
    var correccion_4 = basePath.includes('public') ? '' : '../../views/public/';


    $.ajax({
        url: correccion_1+'controllers/condiciones_generales.php',
        method: 'POST',
        dataType: 'json',
        success: function(data) {
            var perfil = data.perfil;
            // Ahora puedes mostrar información específica según el perfil
            if (perfil === 'administrador') {
                // Secciones a mostrar --------------------------------------
                    // Sección Noticias
                    $('#nav_noticias').prop('href',''+correccion_7+correccion_4+'noticias.php')
                    // Sección Usuarios-Administración
                    let usuarios_administracion = '<li class="nav-item"><a class="nav-link" href="'+correccion_6+correccion_3+'usuarios_administracion.php">Usuarios-Administración</a></li>';
                    $('#navbarNav ul').append(usuarios_administracion);
                    // Sección Citaciones-Administración
                    let citaciones_administracion = '<li class="nav-item"><a class="nav-link" href="'+correccion_6+correccion_3+'citas_administracion.php">Citaciones-Administración</a></li>';
                    $('#navbarNav ul').append(citaciones_administracion);
                    // Sección Noticias-Administración
                    let noticias_administracion = '<li class="nav-item"><a class="nav-link" href="'+correccion_6+correccion_3+'noticias_administracion.php">Noticias-Administración</a></li>';
                    $('#navbarNav ul').append(noticias_administracion);
                    // Sección perfil
                    let perfil = '<li class="nav-item"><a class="nav-link" href="'+correccion_5+correccion_2+'perfil.php">Perfil</a></li>';
                    $('#navbarNav ul').append(perfil);
                    // Sección Cerrar_sesión
                    let cerrar_sesion = '<li class="nav-item"><button class="btn btn-danger ms-2" onclick="location.href=\''+correccion_1+'controllers/procesar_salir.php\'">Cerrar Sesión</button></li>';
                    $('#navbarNav ul').append(cerrar_sesion);
                // Secciones a quitar ---------------------------------------
                    // Sección Login
                    $('#nav_login').remove();
                    // Sección Registro
                    $('#nav_registro').remove();

            } else if (perfil === 'usuario') {
                // Secciones a mostrar -------------------------------------- 
                    // Sección Citaciones
                    let citaciones = '<li class="nav-item"><a class="nav-link" href="'+correccion_5+correccion_2+'citaciones.php">Citaciones</a></li>';
                    $('#navbarNav ul').append(citaciones);
                    // Sección Perfil
                    let perfil = '<li class="nav-item"><a class="nav-link" href="'+correccion_5+correccion_2+'perfil.php">Perfil</a></li>';
                    $('#navbarNav ul').append(perfil);
                    // Sección Cerrar_sesión
                    let cerrar_sesion = '<li class="nav-item"><button class="btn btn-danger ms-2" onclick="location.href=\''+correccion_1+'controllers/procesar_salir.php\'">Cerrar Sesión</button></li>';
                    $('#navbarNav ul').append(cerrar_sesion);
                // Secciones a quitar ---------------------------------------
                    // Sección login
                    $('#nav_login').remove();
                    // Sección Registro
                    $('#nav_registro').remove();
            }
            

            
            // Marcamos el enlace activo
                let currentPage = decodeURIComponent(basePath.split('/').pop());
                $('#navbarNav a').removeClass('active');
                // Obtener todos los enlaces en la página
                let enlaces = document.querySelectorAll("nav a");
                // Iterar sobre los enlaces y mostrar el href con un alert
                for (let i = 0; i < enlaces.length; i++) {
                    if (enlaces[i].href.includes(currentPage)) {
                        enlaces[i].classList.add("enlace_activo");
                    }
                }
            //

        },
        error: function() {
            alert('Navbar: No se pudo conectar con la base de datos.');
        }
    });

});


