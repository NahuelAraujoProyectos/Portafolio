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
        foreach ($_POST as $clave => $valor){
            $_POST[$clave] = LimpiarDatos::validarDato($conexion, $valor);
        };
    //

    //Recuperamos el id del usuario a consultar
        if(isset($_SESSION['id_usuario_elegido'])){
            // Se envió 'idUser' a través sesión de otro usuario
            $id_User = $_SESSION['id_usuario_elegido'];
        } else if(isset($_SESSION['idUser'])){
            // Se envió 'idUser' a través de la sesión
            $id_User = $_SESSION['idUser'];
        } else {
            // Si 'idUser' no está en la sesión, asigna un valor por defecto
            $id_User = 0; 
        }
    //

    //Preparamos la consulta
        $sql_eliminar ="DELETE FROM citas ";
        $sql_eliminar .="WHERE idUser = '".$id_User."' ";
        $sql_eliminar .="AND idCita = ".$_POST['id_cita'].";";
    //

    //Realizamos la eliminación
        $resultado = $conexion->query($sql_eliminar);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos salida
        if($resultado){
            echo 'Cita eliminada.';
            exit;
        }else{
            echo 'Error al eliminar cita.';
            exit;
        }
    //
?>