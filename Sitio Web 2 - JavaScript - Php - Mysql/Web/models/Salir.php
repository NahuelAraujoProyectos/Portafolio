<?php
    class Salir{

        public static function salir(){
            session_start();
            session_destroy();
            $_SESSION=array();

            echo "Se cerró la sesión";
            header("Location: index.php");
        }

    }
?>