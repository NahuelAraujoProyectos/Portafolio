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
            // Se envió 'idUser' a través de sesión de otro usuario
            $id_User = $_SESSION['id_usuario_elegido'];
        } else if(isset($_SESSION['idUser'])){
            // Se envió 'idUser' a través d la sesión
            $id_User = $_SESSION['idUser'];
        } else {
            // Si 'idUser' no está en la sesión, asigna un valor por defecto
            $id_User = 0; 
        }
    //
    
    //Preparamos la consulta general
        $sql ="SELECT *, DATE_FORMAT(fecha_cita, '%d/%m/%Y') AS fecha_nueva  ";
        $sql.="FROM citas ";
        $sql.="WHERE idUser = '".$id_User."' ";
        $sql.="AND fecha_cita>= CURDATE() ";
        $sql.="ORDER BY fecha_cita ASC;";
    //

    //Realizamos la consulta general
        $resultado = $conexion->query($sql);
        //Procesamos la respuesta
        $citas = array();
        if($resultado->num_rows>0){
            while($fila=$resultado->fetch_assoc()){
                $cita = array(
                    'idCita' => $fila['idCita'],
                    'fecha_cita' => $fila['fecha_nueva'],
                    'motivo_cita' => $fila['motivo_cita']
                );
                $citas[]=$cita;
            }
        }else{
            echo 'Error al recuperar los datos';
        }
    //

    //Consulta individual de cita por ID
        if(isset($_POST['id_cita'])){
            $id_Cita = $_POST['id_cita'];

            $sql_cita_individual ="SELECT * FROM citas ";
            $sql_cita_individual .="WHERE idUser = '".$id_User."' ";
            $sql_cita_individual .="AND idCita = '".$id_Cita."';";

            $resultado_cita_individual = $conexion->query($sql_cita_individual);

            //Cerramos la base de datos
            $conexionDB->cerrarConexion();

            //Procesamos la respuesta
            if ($resultado_cita_individual->num_rows > 0) {
                $fila = $resultado_cita_individual->fetch_assoc();
                $cita_individual = array(
                    'idCita' => $fila['idCita'],
                    'idUser' => $fila['idUser'],
                    'fecha_cita' => $fila['fecha_cita'],
                    'motivo_cita' => $fila['motivo_cita']
                );
                echo json_encode(array('cita_individual' => $cita_individual));
                exit;
            } else {
                echo 'No se encontró la noticia con el ID especificado';
                exit;
            }            
        } else {
            echo json_encode(array('citas'=>$citas));
            exit;
        }
    //
    
?>