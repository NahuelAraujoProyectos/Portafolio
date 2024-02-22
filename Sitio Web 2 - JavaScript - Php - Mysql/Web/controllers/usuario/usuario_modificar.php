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
            // Se envió 'idUser' a través de sesión para otro usuario
            $id_User = $_SESSION['id_usuario_elegido'];
        } else if(isset($_SESSION['idUser'])){
            // Se envió 'idUser' a través de la sesión
            $id_User = $_SESSION['idUser'];
        } else {
            // Si 'idUser' no está en la sesión, asigna un valor por defecto 
            $id_User = 0;
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

    //Verificamos que el email no está en uso
        $valores_repetidos=[];
        //Email
            $email = $_POST['email'];
            //Verificamos si el email está siendo usado por otra persona
            $consulta_email = "SELECT * FROM user_data WHERE email = '".$email."'";
            $consulta_email.= "AND idUser != '".$id_User."';";
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

    //Preparamos la consulta
        $sql_editar ="SELECT * FROM user_data ";
        $sql_editar .="WHERE idUser = '".$id_User."'; ";
    //

    //Guardamos el resto de los valores en variables
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $email = $_POST['email'];
        $telefono = $_POST['teléfono'];
        $fecha_nacimiento = $_POST['fecha_de_nacimiento'];
        $direccion = $_POST['dirección'];
        $sexo = $_POST['sexo'];    
    //

    //Realizamos la modificación
        $resultado = $conexion->query($sql_editar);
        if($resultado->num_rows>0){
            $actualizar ="UPDATE user_data SET nombre = '".$nombre."', ";
            $actualizar.="apellidos = '".$apellidos."', ";
            $actualizar.="email = '".$email."', ";
            $actualizar.="teléfono = '".$telefono."', ";
            $actualizar.="fecha_de_nacimiento = '".$fecha_nacimiento."', ";
            $actualizar.="dirección = '".$direccion."', ";
            $actualizar.="sexo = '".$sexo."' ";
            $actualizar.="WHERE idUser = '".$id_User."';";

            $resultado = $conexion->query($actualizar);
            if($resultado){
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Procesamos respuesta
                echo json_encode(array('ok'=>'Datos modificados con éxito'));
                exit;
            }
        }else{
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('ok'=>'No se pudo modificar la cita.'));
            exit;
        }
    //

?>