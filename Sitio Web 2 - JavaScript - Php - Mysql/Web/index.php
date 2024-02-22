<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Valiente Inspo</title>
    <link rel="icon" href="img/icono_sitio.jpg" type="image/jpg">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- Slick-->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css"/>
    </script>
    <!-- jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- JavaScript personalizado -->
    <script src="js/barra_navegacion.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/index.css">
    <!-- Fuentes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body>  
    <!-- Encabezado -->
    <header>
        <nav id="mainNav" class="navbar navbar-expand-xl fixed-top bg-dark navbar-dark ">
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
                        <li class="nav-item active">
                            <a class="nav-link" aria-current="page" href="index.php">Index</a>
                        </li>
                        <li class="nav-item">
                            <a id="nav_noticias" class="nav-link" href="views/public/noticias.php">Noticias</a>
                        </li>
                        <li class="nav-item">
                            <a id="nav_registro" class="nav-link" href="views/public/registro.php">Registro</a>
                        </li>
                        <li class="nav-item">
                            <a id="nav_login" class="nav-link" href="views/public/login.php">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <!-- Navbar End-->
    <!-- Main Start -->
    <!-- Sección de Bienvenida -->
    <section id="bienvenida" class="d-flex">
        <div class="container my-auto text-center">
            <h1 class="mb-1">¡Explora Tu Creatividad!</h1>
            <p class="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>Odit recusandae voluptatem vero, enim dolor laborum dolorum facilis atque modi perferendis.</p>
            <a href="views/public/login.php" title="Enlace a página de login" class="btn btn-primary mx-2">Empecemos!</a>
        </div>
    </section>
    <!-- Sección de Servicios -->
    <section id="servicios" class="text-white text-center">
        <div class="container">
            <h2 class="mb-5">Nuestros Servicios</h2>
            <p class="text-center my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sit eum culpa dolores amet asperiores!</p>
            <div class="row">
                <div class="col-md-4 servicio mb-2">
                    <div class="card mb-4 text-center">
                        <i class="icon fas fa-chalkboard-teacher fa-4x mt-3"></i>
                        <div class="card-body">
                            <h3 class="card-title">Mentoría Personalizada</h3>
                            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem amet praesentium neque molestias, doloremque modi?</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 servicio mb-2">
                    <div class="card mb-4 text-center">
                        <i class="icon fas fa-paint-brush fa-4x mt-3"></i>
                        <div class="card-body">
                            <h3 class="card-title">Talleres Creativos</h3>
                            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptatem non alias, quia quis similique!</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 servicio mb-2">
                    <div class="card mb-4 text-center">
                        <i class="icon fas fa-book-open fa-4x mt-3"></i>
                        <div class="card-body">
                            <h3 class="card-title">Recursos de Escritura</h3>
                            <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, nemo assumenda. Id perferendis eligendi nulla.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Sección de Especialidades -->
    <section id="especialidades">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mb-3 d-flex justify-content-center align-items-center">
                    <img src="img/foto_perfil.png" alt="foto de instructora" title="foto de instructora" class="img-fluid border border-5 border-warning rounded-5">
                </div>
                <div class="col-md-6 d-flex flex-column justify-content-center">
                    <h2 class="text-center mb-3">Nuestras Especialidades</h2>
                    <p class="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus accusamus veniam tenetur. Officia, error ex quia animi expedita quis rerum dicta neque! Libero, accusamus possimus?</p>
                    <!--Generos-->
                    <div class="px-4">
                        <!--Genero 1-->
                        <div>
                            <h3>Fantasía</h3>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">90%</div>
                            </div>
                        </div>
                        <br>
                        <!--Genero 2-->
                        <div>
                            <h3>Terror</h3>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 95%;" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">95%</div>
                            </div>
                        </div>
                        <br>
                        <!--Genero 3-->
                        <div>
                            <h3>Policial</h3>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80%</div>
                            </div>
                        </div>
                        <br>
                        <!--Genero 4-->
                        <div>
                            <h3>Histórica</h3>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 70%;" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Sección de Testimonios -->
    <section id="testimonios" class="text-white text-center">
        <div class="container">
            <h2 class="mb-5">Testimonios de Clientes Satisfechos</h2>
            <p class="my-4 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptas itaque doloribus dolorem fugit voluptatibus natus velit tempore, quia eum nostrum molestiae porro blanditiis atque asperiores ea iste incidunt inventore.</p>
            <div class="row">
                <div class="col">
                    <div class="responsive">
                        <div class="card mb-4 mx-2">
                            <div class="card-body">
                                <p class="card-text">"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam esse magnam dolores facere hic. Adipisci veniam ipsa natus quibusdam ipsum, doloribus nulla ratione iste neque."</p>
                            </div>
                            <div class="card-footer text-center">
                                <p>
                                    <strong>María Gómez</strong><br>Autora Independiente
                                </p>
                            </div>
                        </div>
                        <div class="card mb-4 mx-2">
                            <div class="card-body">
                                <p class="card-text">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores earum culpa adipisci doloremque, laboriosam impedit suscipit perspiciatis non, ex alias voluptate sint molestias esse odit."</p>
                            </div>
                            <div class="card-footer text-center">
                                <p>
                                    <strong>Pablo Perez</strong><br>Periodista
                                </p>
                            </div>
                        </div>
                        <div class="card mb-4 mx-2">
                            <div class="card-body">
                                <p class="card-text">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate maiores in recusandae delectus dolores ex doloribus minus repudiandae mollitia unde tempore, obcaecati expedita illo ut."</p>
                            </div>
                            <div class="card-footer text-center">
                                <p>
                                    <strong>Martin Palermo</strong><br>Estudiante Avanzado
                                </p>
                            </div>
                        </div>
                        <div class="card mb-4 mx-2">
                            <div class="card-body">
                                <p class="card-text">"Pluma Creativa ha sido una fuente inagotable de inspiración para mí. Gracias a ellos, he mejorado mi escritura y he logrado concretar mis proyectos literarios."</p>
                            </div>
                            <div class="card-footer text-center">
                                <p>
                                    <strong>Laura Caceres</strong><br>Publicista
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Sección de Contacto -->
    <section id="contacto">
        <div class="container">
            <div class="row contacto">
                <div class="col-lg-6 my-auto">
                    <h2 class="text-center mb-5">Contacto</h2>
                    <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic distinctio deserunt sint numquam maiores non reprehenderit, odit necessitatibus reiciendis delectus earum saepe doloribus nam eum deleniti maxime dignissimos at culpa!</p>
                </div>
                <div class="col-lg-6">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <div class="card">
                                    <div class="px-5">
                                        <h3>Redes sociales</h3>
                                        <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ex animi, deserunt repellat cupiditate deleniti.</p>   
                                        <div class="contact-social-icons">
                                            <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                                            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                                            <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card-back">
                                <div class="card">
                                    <div class="px-5">
                                        <h3 class="card-title">Información de contacto</h3>
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-map-marker-alt"></i> Dirección: Calle Principal, Ciudad</li>
                                            <li><i class="fas fa-phone"></i> Teléfono: +123 456 789</li>
                                            <li><i class="fas fa-envelope"></i> Correo Electrónico: info@plumacreativa.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Main End -->
    <!-- Footer Start-->
    <footer class="text-center text-white bg-dark py-3">
        <div class="container">
            <p>&copy; 2023 Mentoría de Escritura. Todos los derechos reservados.</p>
        </div>
    </footer>
    <!-- Footer End -->

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <!-- Slick js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
    <script src="js/public_index.js"></script>
</body>
</html>
