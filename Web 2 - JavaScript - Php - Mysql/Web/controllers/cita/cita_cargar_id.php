<?php
    //Iniciamos sesión 
    session_start();

    //Conectamos y verificamos si hubo error
        include "../../models/ConexionDB.php";
        $conexionDB = new ConexionDB();
        $conexion = $conexionDB->getConexion();
    //

    //Validamos los ingresos por seguridad
        include "../../models/LimpiarDatos.php";
        foreach ($_POST as $clave => $valor){
            $_POST[$clave] = LimpiarDatos::validarDato($conexion, $valor);
        };
    //

    //Verificamos si tenemos los datos necesarios
        if(isset($_POST['usuario']) && isset($_POST['id_usuario'])){
            $usuario = $_POST['usuario'];
            $id_User = $_POST['id_usuario'];

            //Preparamos la consulta
                $sql_editar ="SELECT * FROM users_login ";
                $sql_editar .="WHERE idUser = '".$id_User."' ";
                $sql_editar .="AND usuario = '".$usuario."';";
            //

            //Realizamos la consulta
                $resultado = $conexion->query($sql_editar);
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Procesamos respuesta
                if($resultado->num_rows>0){
                    $_SESSION['id_usuario_elegido'] = $id_User;
                    exit;
                }else{
                    echo 'No se pudo reconocer datos del usuario elegido';
                    exit;
                }
            //
        }else{
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Informamos respuesta
            echo 'Tenemos otro error a partir de $_POST["usuario"] y $_POST["id_usuario"]';
            exit;
        }
    //

?>