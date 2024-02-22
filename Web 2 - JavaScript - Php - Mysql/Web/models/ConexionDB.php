<?php
    class ConexionDB {

        private $conexion;

        // Constructor para establecer la conexión
        public function __construct() {
            $this->conexion = new mysqli("localhost", "root", "", "web_php");

            if ($this->conexion->connect_errno) {
                echo 'Fallo conexión';
                exit;
            }
        }

        // Método para obtener la conexión
        public function getConexion() {
            return $this->conexion;
        }

        // Método para cerrar la conexión
        public function cerrarConexion() {
            $this->conexion->close();
        }
    }
?>
