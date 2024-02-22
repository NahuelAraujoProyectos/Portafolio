<?php
    class LimpiarDatos {
        // Función para validar la entrada de datos
        public static function validarDato($conexion,$dato){
            $dato = trim($dato);
            $dato = stripslashes($dato);
            $dato = htmlspecialchars($dato);
            $dato = mysqli_real_escape_string($conexion, $dato);
            return $dato;
        }
    }
?>