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
            // Se envió 'idUser' a través sesión de un usuario diferente
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
            if($valor==''){
                $campos_obligatorios[]=$clave;
            }
        }
        if($campos_obligatorios){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos salida
            echo json_encode(array('campos_vacíos'=>$campos_obligatorios));
            exit;
        }
    //

    //Verificamos si la fecha no es anterior a hoy
        $fecha_actual = date("Y-m-d");
        if($_POST['fecha_cita'] < $fecha_actual){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos salida
            echo json_encode(array('otros_errores' => 'No se puede agendar una cita en una fecha anterior a la actual.'));
            exit;
        }
    //

    //Creamos sentencia para tabla citas
        $sql ="SELECT * FROM citas ";
        $sql.="WHERE idUser = '".$id_User."' ";
        $sql.="AND fecha_cita = '".$_POST['fecha_cita']."';";
    //

    //Realizamos la consulta
        $resultado = $conexion->query($sql);
        if($resultado->num_rows>0){
            // Verificamos si la cita encontrada es la misma que la actual
            $cita_encontrada = $resultado->fetch_assoc();
            if ($cita_encontrada['idCita'] == $_POST['id_cita']) {
                // La cita encontrada es la misma que la actual, actualizamos el motivo
                $actualizar = "UPDATE citas SET motivo_cita = '".$_POST['motivo_cita']."' ";
                $actualizar .= "WHERE idUser = '".$id_User."' ";
                $actualizar .= "AND fecha_cita = '".$_POST['fecha_cita']."';";
                $resultado = $conexion->query($actualizar);
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Procesamos salida
                echo json_encode(array('ok' => 'Se actualizó la cita correctamente.'));
                exit;
            } else {
                // La cita encontrada es diferente a la cita actual, no se puede editar
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Procesamos salida
                echo json_encode(array('otros_errores' => 'Ya existe una cita para ese día.'));
                exit;
            }
        }else{
            // La cita no existe en la nueva fecha, actualizamos la fecha y el motivo
            $actualizar = "UPDATE citas SET fecha_cita = '" . $_POST['fecha_cita'] . "', ";
            $actualizar .= "motivo_cita = '" . $_POST['motivo_cita'] . "' ";
            $actualizar .= "WHERE idUser = '" . $id_User . "' ";
            $actualizar .= "AND idCita = '" . $_POST['id_cita'] . "';";
            $resultado = $conexion->query($actualizar);
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos salida
            echo json_encode(array('ok' => 'Se actualizó la cita correctamente.'));
            exit;
        }
    //

?>