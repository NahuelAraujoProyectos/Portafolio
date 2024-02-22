<?php
    //Iniciamos sesión
    session_start();

    //Conectamos con la Base de Datos
        include "../../models/ConexionDB.php";
        $conexionDB = new ConexionDB();
        $conexion = $conexionDB->getConexion();
    //

    //Validamos los ingresos por seguridad
        include_once('../../models/LimpiarDatos.php');
        foreach ($_POST['datos'] as $clave => $valor) {
            $_POST[$clave] = LimpiarDatos::validarDato($conexion, $valor);
        }
    //

    //Verificamos si hay campos obligatorios vacíos
        $campos_obligatorios=[];
        foreach ($_POST['datos'] as $clave => $valor) {
            if($valor==''){
                $campos_obligatorios[]=$clave;
            }
        }
        if($campos_obligatorios){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Devolvemos la respuesta
            echo json_encode(array('campos_vacíos'=>$campos_obligatorios));
            exit;
        }
    //

    //Preparamos inserción
        //Almacenamos el password ingresado
        $password = $_POST['datos']['password'];    
    
        //Creamos sentencia para tabla users_login
        $sql_login="SELECT * FROM users_login ";
        $sql_login.="WHERE usuario = '".$_POST['datos']['usuario']."';";
    //

    //Realizamos el registro
        $resultado = $conexion->query($sql_login);
        if($resultado->num_rows>0){
            while($fila=$resultado->fetch_assoc()){
                if(password_verify($password,$fila["password"])){
                    $_SESSION['login']='ok';
                    $_SESSION["usuario"]=$fila["usuario"];
                    $_SESSION["password"]=$fila["password"];
                    $_SESSION["rol"]=$fila["rol"];
                    $_SESSION["idUser"]=$fila["idUser"];
                    //Cerramos la base de datos
                    $conexionDB->cerrarConexion();
                    //Devolvemos respuesta
                    echo json_encode(array('Ingreso exitoso.'));
                    exit;
                }
            }
        }
    //
    
?>