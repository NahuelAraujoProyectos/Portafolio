<?php
    // Iniciamos sesión 
    session_start();

    //Conectamos y verificamos si hubo error
        include "../../models/ConexionDB.php";
        $conexionDB = new ConexionDB();
        $conexion = $conexionDB->getConexion();
    //

    //Validamos los ingresos por seguridad
        include "../../models/LimpiarDatos.php";
        foreach ($_POST as $clave => $valor) {
            $_POST[$clave] = LimpiarDatos::validarDato($conexion, $valor);
        }
    //

    //Recuperamos el id del usuario a consultar
        if(isset($_SESSION['id_usuario_elegido'])){
            // Se envió 'idUser' a través de sesión para un usuario elegido
            $id_User = $_SESSION['id_usuario_elegido'];
        } else if(isset($_SESSION['idUser'])){
            // Se envió 'idUser' a través de sesión
            $id_User = $_SESSION['idUser'];
        } else {
            // Si 'idUser' no está en la sesión, asigna un valor por defecto 
            $id_User = 0;
        }
    //

    //Verificamos que el password no sea nulo
        if($_POST['password']==''){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('campos_vacíos'=>'El nuevo Password no puede estar vacío.'));
            exit;
        }else{
            //Encriptamos la nueva clave
            $password = $_POST['password'];
            $password = password_hash($password, PASSWORD_DEFAULT);
            //Creamos sentencia para tabla users_login
            $sql_password = "UPDATE users_login SET password = '".$password."'";
            $sql_password.= "WHERE idUser = '".$id_User."';";
            $resultado = $conexion->query($sql_password);
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            if($resultado){
                echo json_encode(array('ok'=>'Password modificado con éxito.'));
                exit;
            }else{
                echo json_encode(array('ok'=>'Error al modificar password.'));
                exit;
            }   
        }
    //
?>