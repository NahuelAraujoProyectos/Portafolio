<?php
    include '../../controllers/condiciones_seguridad.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Valiente Inspo</title>
    <link rel="icon" href="../../img/icono_sitio.jpg" type="image/jpg">
    <!--Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!--JQuery-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../../js/barra_navegacion.js"></script>
    <script src="../../js/user_citaciones.js"></script>
    <!--CSS-->
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/user_citaciones.css">
    <!-- Fuentes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body>
    <!-- Navbar Start -->
    <header>
        <nav class="navbar navbar-expand-xl fixed-top navbar-dark bg-dark">
        <div class="container">
            <span class="navbar-brand">
                <i class="icon fas fa-dragon fa-1x"></i>
                Valiente Inspo
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                <a class="nav-link" aria-current="page" href="../../index.php">Index</a>
                </li>
                <li class="nav-item">
                <a id="nav_noticias" class="nav-link" href="../public/noticias.php">Noticias</a>
                </li>
                <li class="nav-item">
                <a id="nav_registro" class="nav-link" href="registro.php">Registro</a>
                </li>
                <li class="nav-item">
                <a id="nav_login" class="nav-link" href="login.php">Login</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </header>
    <!-- Navbar End-->
    <!-- Main Start -->
    <main>
        <!-- Sección de Contenido -->
        <section id="citaciones">
            <div id="titulo_seccion" class="container-fluid">
                <div class="container">
                    <h1>Citaciones</h1>
                </div>
            </div>
            <div class="container">
                <div class="row" id="contenido_citaciones">
                    <div id="div_contenido">
                        <!--Seleccionar usuario-->
                        <div id="seleccionar_usuario">
                        </div>
                        <!--Opciones de usuarios-->
                        <div id="citas_opciones">
                            <button type="button" id="btn_ver_citas" class="btn btn-success">Ver Citas</button>
                            <button type="button" id="btn_solicitar_citas" class="btn btn-success">Solicitar Citas</button>
                            <hr>
                        </div>
                        <!--Respuestas-->
                        <div id="respuesta"></div>              
                        <!--Ver citas creadas-->
                        <div id="ver_citas" class="row">
                        </div>
                        <!--Registrar citas nuevas-->
                        <div id="solicitar_citas" class="row">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <!-- Main End -->
    <!-- Footer Start-->
    <footer class="bg-dark text-white text-center py-3">
        <div class="container-fluid">
            <p>&copy; 2023 Mentoría de Escritura. Todos los derechos reservados.</p>
        </div>
    </footer>
    <!-- Footer End -->
    <!--Bootstrap-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>