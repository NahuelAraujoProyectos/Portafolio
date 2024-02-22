<?php
    // Iniciamos sesión
    session_start();

    //Conectamos y verificamos si hubo error
        include "../../models/ConexionDB.php";
        $conexionDB = new ConexionDB();
        $conexion = $conexionDB->getConexion();
    //

    //Recuperamos el id del usuario a consultar
        if(isset($_SESSION['id_usuario_elegido'])){
            // Se envió 'idUser' a través de la sesión
            $id_User = $_SESSION['id_usuario_elegido'];
        } else if(isset($_SESSION['idUser'])){
            // Se envió 'idUser' a través de la sesión
            $id_User = $_SESSION['idUser'];
        } else {
            // Si 'idUser' no está en POST ni en la sesión, asigna un valor por defecto
            $id_User = 0;
        }
    //

    //Preparamos la consulta
        $sql ="SELECT * FROM user_data ";
        $sql .="WHERE idUser = '".$id_User."';";
    //

    //Realizamos la consulta y manejamos la información
        $resultado = $conexion->query($sql);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        $info_usuario = array();
        if($resultado->num_rows>0){
            //echo('hay resultado');
            while($fila=$resultado->fetch_assoc()){
                $info_usuario['nombre'] = $fila['nombre'];
                $info_usuario['apellidos'] = $fila['apellidos'];
                $info_usuario['email'] = $fila['email'];
                $info_usuario['teléfono'] = $fila['teléfono'];
                $info_usuario['fecha_de_nacimiento'] = $fila['fecha_de_nacimiento'];
                $info_usuario['dirección'] = $fila['dirección'];
                $info_usuario['sexo'] = $fila['sexo'];
            }
            echo json_encode(array('info_usuario'=>$info_usuario));
            exit;
        }else{
            echo 'Error al recuperar los datos';
            exit;
        }
    //
    
?>