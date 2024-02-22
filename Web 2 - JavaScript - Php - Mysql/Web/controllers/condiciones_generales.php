<?php

    // Iniciamos sesión
    session_start();

    // Verificamos si hubo inicio de sesión
        if (isset($_SESSION['login'])) {
            if ($_SESSION['rol'] == 'user') {
                $perfil = 'usuario';
            } elseif ($_SESSION['rol'] == 'admin') {
                $perfil = 'administrador';
            }
        } else {
            $_SESSION['rol'] = 'public';
            $perfil = 'publico';
        }
    //

    //Procesamos respuesta
    echo json_encode(array('perfil' => $perfil));

?>