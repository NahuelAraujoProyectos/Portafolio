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

    //Recuperamos el id noticia a eliminar
        if(isset($_POST['id_noticia'])){
            $id_noticia = $_POST['id_noticia'];
        } else {
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos mensaje de salida
            echo 'Error: No se proporcionó el ID de usuario.';
            exit;
        }
    //

    //Preparamos la consulta
        $sql_eliminar ="DELETE FROM noticias ";
        $sql_eliminar .="WHERE idNoticia = '".$id_noticia."';";
    //

    //Realizamos la eliminación
        $resultado = $conexion->query($sql_eliminar);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Gestionamos la respuesta
        if($resultado){
            echo 'Noticia eliminada.';
            exit;
        }else{
            echo 'Error al eliminar noticia.';
            exit;
        }
    //
?>