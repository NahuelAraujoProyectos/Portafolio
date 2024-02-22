<?php
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

    //Verificamos si hay campos obligatorios vacíos
        $campos_obligatorios=[];
        foreach ($_POST as $clave => $valor) {
            if($clave!=='dirección' && $clave!=='sexo' && $clave!=='rol'){
            if($valor==''){
                $campos_obligatorios[]=$clave;
            }
            }
        }
        if($campos_obligatorios){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('campos_vacíos'=>$campos_obligatorios));
            exit;
        }
    //

    //Verificamos si la edad es inferior a 16 años
        $fecha_nacimiento = $_POST['fecha_de_nacimiento'];
        $edad_minima = 16;
        
        // Convertimos la fecha de nacimiento a un timestamp
        $timestamp_nacimiento = strtotime($fecha_nacimiento);
        
        // Calculamos la edad en años [[31556926 segundos en un año]] 
        $edad = floor((time() - $timestamp_nacimiento) / 31556926); 
        
        if ($edad < $edad_minima) {
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('edad_minima' => 'No se puede registrar personas menores de 16 años.'));
            exit;
        }
    //

    //Verificamos si los datos son validos
        $valores_invalidos=[];
        //Verificamos email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $valores_invalidos[]='email';
        };
        //Verificamos teléfono
        if (!filter_var($_POST['teléfono'], FILTER_VALIDATE_INT)) {
            $valores_invalidos[]='teléfono';
        };
        if($valores_invalidos){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('campos_invalidos'=>$valores_invalidos));
            exit;
        }
    // 
    
    //Verificamos que el usuario y email no están en uso
            $valores_repetidos=[];
        //Usuario
            $usuario = $_POST['usuario'];
            $consulta_usuario = "SELECT * FROM users_login WHERE usuario = '".$usuario."';";
            $resultado = $conexion->query($consulta_usuario);
            if($resultado->num_rows>0){
                $respuesta = 'usuario';
                $valores_repetidos[] = $respuesta;
            }
        //Email
            $email = $_POST['email'];
            $consulta_email = "SELECT * FROM user_data WHERE email = '".$email."';";
            $resultado = $conexion->query($consulta_email);
            if($resultado->num_rows>0){
                $respuesta = 'email';
                $valores_repetidos[] = $respuesta;
            }
        //Imprimimos error si existe
            if($valores_repetidos){
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Procesamos respuesta
                echo json_encode(array('campos_repetidos'=>$valores_repetidos));
                exit;
            }
    //
    
    //Preparamos inserción
        $conexion->begin_transaction(); 
        // Creamos sentencia para tabla user_data
            $sql_data = "INSERT INTO user_data(nombre, apellidos, email, teléfono, fecha_de_nacimiento, dirección, sexo) VALUES(
                '".$_POST['nombre']."',
                '".$_POST['apellidos']."',
                '".$_POST['email']."',
                '".$_POST['teléfono']."',
                '".$_POST['fecha_de_nacimiento']."',
                '".$_POST['dirección']."',
                '".$_POST['sexo']."')";
            $conexion->query($sql_data);
        //
            
        //Preparamos los datos
            // Obtenemos el ID insertado
            $last_id = $conexion->insert_id;
            // Encriptamos el password
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            // Verificamos si se estableció el rol
            $rol = $_POST['rol'] ? $_POST['rol'] : 'user';
        //

        // Creamos sentencia para tabla users_login
            $sql_login = "INSERT INTO users_login(idUser, usuario, password, rol) VALUES (
                $last_id,
                '".$_POST['usuario']."',
                '$password',
                '$rol')";
            $conexion->query($sql_login);
        //

        // Confirmamos la transacción
        $conexion->commit();
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        echo json_encode(array('Usuario registrado con éxito.'));
    //
        
?>