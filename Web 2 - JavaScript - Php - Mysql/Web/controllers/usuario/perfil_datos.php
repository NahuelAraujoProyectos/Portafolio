<?php
    //Iniciamos sesión
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

    //Verificamos si hay campos obligatorios vacíos
        $campos_obligatorios=[];
        foreach ($_POST as $clave => $valor) {
            if ($valor == '' && ($clave !== 'dirección' && $clave !== 'sexo')) {
                $campos_obligatorios[] = $clave;
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

    if(isset($_POST['password'])){
        //Para modificar la contraseña.
            // Encriptamos la contraseña
            $password = $_POST['password'];
            $password = password_hash($password, PASSWORD_DEFAULT);
            // Definimos la consulta
            $actualizar = "UPDATE users_login SET password = '".$password."' ";
            $actualizar .= "WHERE idUser = '".$_SESSION['idUser']."';";
            // Realizamos la modificación de la contraseña
            $resultado = $conexion->query($actualizar);
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            if($resultado){
                echo json_encode(array('ok' => 'Password modificado con éxito.'));
                exit;
            }
        //
    }else{
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
                $consulta_email.= "AND idUser != '".$_SESSION['idUser']."';";
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

        //Para modificar datos de usuario.
            foreach($_POST as $clave => $valor){
                //Definimos la consulta
                    $actualizar ="UPDATE user_data SET ".$clave." = '".$valor."' ";
                    $actualizar.="WHERE idUser = '".$_SESSION['idUser']."';";
                //
                //Realizamos la modificación
                    $resultado = $conexion->query($actualizar);
                    //Verificamos si hubo error.
                    $estado = true;
                    if(!$resultado){
                        $estado = false;
                    }
                //
            }
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            if($estado){
                echo json_encode(array('ok'=>'Datos modificados con éxito.'));
                exit;
            }else{
                echo json_encode(array('ok'=>'Error al modificar datos nahuel.'));
                exit;
            }
        //
    }

?>