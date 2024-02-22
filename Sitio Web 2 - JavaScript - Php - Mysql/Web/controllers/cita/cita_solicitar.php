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
        foreach ($_POST as $clave => $valor){
            $_POST[$clave] = LimpiarDatos::validarDato($conexion, $valor);
        };
    //

    //Recuperamos el id del usuario a consultar
        if(isset($_SESSION['id_usuario_elegido'])){
            // Se envió 'idUser' a través de la sesión de otro usuario
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
            //Procesamos respuesta
            echo json_encode(array('campos_vacíos'=>$campos_obligatorios));
            exit;
        }
    //

    //Verificamos si la fecha no es anterior a hoy
        $fecha_actual = date("Y-m-d");
        if($_POST['fecha_cita'] < $fecha_actual){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
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
        //Procesamos respuesta
        if($resultado->num_rows>0){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('otros_errores'=>'Ya hay citas en esta fecha.'));
            exit;           
        }else{
            $sql_cita ="INSERT INTO citas(idUser, fecha_cita, motivo_cita) ";
            $sql_cita.="VALUES (";
            $sql_cita.="'".$id_User."',";
            $sql_cita.="'".$_POST['fecha_cita']."',";
            $sql_cita.="'".$_POST['motivo_cita']."');";
            $resultado = $conexion->query($sql_cita);
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos respuesta
            echo json_encode(array('ok'=>'Cita registrada con éxito.'));
            exit;
        }
    //
?>