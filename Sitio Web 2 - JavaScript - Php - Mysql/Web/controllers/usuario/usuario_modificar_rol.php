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
            // Se envió 'idUser' a través de sesión
            $id_User = $_SESSION['id_usuario_elegido'];
        } else {
            // Si 'idUser' no está en la sesión, asigna un valor por defecto 
            $id_User = 0;
        }
    //

    //Realizamos el cambio de rol
        $rol_User = $_POST['rolUser'];
        if($rol_User=='admin'){
            $rol_nuevo = 'user';
        }else if ($rol_User=='user'){
            $rol_nuevo = 'admin';
        }else{
            $rol_nuevo = 0;
            echo 'Error: no se proporcionó el rol original del usuario.';
        }
    //

    //Preparamos la consulta
        $sql_editar ="UPDATE  users_login SET rol = '".$rol_nuevo."' ";
        $sql_editar .="WHERE idUser = '".$id_User."'; ";
    //
    
    //Realizamos la consulta
        $resultado = $conexion->query($sql_editar);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        if($resultado){
            echo 'Se modificó el rol del usuario.';
        }else{
            echo 'No se pudo modificar el rol.';
        }
    //

?>