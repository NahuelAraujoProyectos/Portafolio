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

    //Recuperamos el rol a consultar
        if(isset($_POST['rolUser'])){
            // Se envió 'rol' a través de POST
            $rol_User = $_POST['rolUser'];
        } else {
            // Si 'rol' no está en POST, asigna un valor por defecto
            $rol_User = 0; 
        }
    //

    //Preparamos la consulta
        $sql ="SELECT * FROM users_login ";
        $sql .="WHERE rol = '".$rol_User."';";
    //
    
    //Realizamos la consulta
        $resultado = $conexion->query($sql);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        $usuarios = array();
        if($resultado->num_rows>0){
            while($fila=$resultado->fetch_assoc()){
                $usuario = array(
                    'usuario' => $fila['usuario'],
                    'id_usuario' => $fila['idUser'],
                    'rol_usuario' => $fila['rol']
                );
                $usuarios[]=$usuario;
            }
            echo json_encode(array('usuarios'=>$usuarios));
        }else{
            echo 'Error al recuperar los datos';
        }
    //
    
?>