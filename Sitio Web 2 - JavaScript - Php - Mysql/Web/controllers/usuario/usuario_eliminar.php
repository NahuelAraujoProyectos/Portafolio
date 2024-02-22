<?php
    //Iniciamos sesión
    session_start();

    //Conectamos y verificamos si hubo error
        include "../../models/ConexionDB.php";
        $conexionDB = new ConexionDB();
        $conexion = $conexionDB->getConexion();
    //

    //Recuperamos el id del usuario a consultar
        if(isset($_SESSION['id_usuario_elegido'])){
            // Se envió 'idUser' a través de sesión
            $id_User = $_SESSION['id_usuario_elegido'];
        } else {
            // Si 'idUser' no está en POST ni en la sesión, asigna un valor por defecto
            $id_User = 0;
        }
    //

    //Preparamos y ejecutamos la sentencia 1
        $sql_eliminar1 ="DELETE FROM user_data ";
        $sql_eliminar1 .="WHERE idUser = '".$id_User."';";
        $resultado1 = $conexion->query($sql_eliminar1);
    //

    //Preparamos y ejecutamos la sentencia 2
        $sql_eliminar2 ="DELETE FROM users_login ";
        $sql_eliminar2 .="WHERE idUser = '".$id_User."';";
        $resultado2 = $conexion->query($sql_eliminar2);
    //
    
    //Mostramos respuesta
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        if($resultado1 && $resultado2){
            echo 'Usuario eliminado.';
        }else{
            echo 'Error al eliminar usuario.';
        }
    //

?>