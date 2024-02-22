<?php
    // Iniciamos sesión
    session_start();
    session_regenerate_id(true);

    // Verificamos si hubo inicio de sesión
        if (isset($_SESSION['login'])) {
            if ($_SESSION['rol'] == 'user') {
                $perfil = 'usuario';
            } elseif ($_SESSION['rol'] == 'admin') {
                $perfil = 'administrador';
            }
        } else {
            $perfil = 'publico';
        }
    //

    // Obtener la URL actual
        $url_actual = basename($_SERVER['REQUEST_URI']);
    //

    // Definir una lista blanca de rutas accesibles por perfil
        $lista_blanca = array(
            'publico' => array('index.php', 'login.php', 'noticias.php', 'registro.php'),
            'usuario' => array('index.php', 'noticias.php', 'citaciones.php', 'perfil.php'),
            'administrador' => array('index.php', 'noticias.php', 'citas_administracion.php', 'noticias_administracion', 'usuarios_administracion.php', 'perfil.php')
        );
    //

    // Verificamos si el usuario puede acceder a la URL actual
        if (!in_array($url_actual, $lista_blanca[$perfil])) {
            header('Location: ../../index.php');
            exit();
        }
    //

?>