<?php 
    // Iniciamos sesión
    session_start();

    //Conectamos y verificamos si hubo error
        include "../../models/ConexionDB.php";
        $conexionDB = new ConexionDB();
        $conexion = $conexionDB->getConexion();
    //

    //Preparamos la consulta
        $sql_usuarios ="SELECT * FROM users_login ";
        $sql_usuarios .="WHERE rol = 'user';";
    //

    //Realizamos la consulta 
        $resultado = $conexion->query($sql_usuarios);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos la respuesta
        if($resultado->num_rows>0){
            //Si la respuesta es positiva, guardamos los id y usuarios
            $usuarios = array();
            while($fila=$resultado->fetch_assoc()){
                $usuarios[] = array(
                    'id' => $fila['idUser'],
                    'usuario' => $fila['usuario']
                ); 
            }
            echo json_encode(array('usuarios'=>$usuarios));
            exit;
        }else{
            //Si la respuesta es negativa mostramos el error
            echo json_encode(array('otros_errores'=>'No se pudo recuperar usuarios.'));
            exit;
        }
    //

?>