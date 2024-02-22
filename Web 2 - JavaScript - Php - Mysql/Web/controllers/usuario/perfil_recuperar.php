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
        if(isset($_POST['idUser'])){
            // Se envió 'idUser' a través de POST
            $id_User = $_POST['idUser'];
        } else if(isset($_SESSION['idUser'])){
            // Si no se envió 'idUser' a través de POST, lo obtenemos de la sesión
            $id_User = $_SESSION['idUser'];
        } else {
            // Si 'idUser' no está en POST ni en la sesión, asigna un valor por defecto 
            $id_User = 0;
        }
    //

    //Preparamos la consulta
        $sql ="SELECT * FROM user_data ";
        $sql .="WHERE idUser = '".$_SESSION['idUser']."';";
    //

    //Realizamos la consulta y manejamos la información
        $resultado = $conexion->query($sql);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        if($resultado->num_rows>0){
            $perfil = array();
            while($fila=$resultado->fetch_assoc()){
                $perfil['nombre'] = $fila['nombre'];
                $perfil['apellidos'] = $fila['apellidos'];
                $perfil['email'] = $fila['email'];
                $perfil['teléfono'] = $fila['teléfono'];
                $perfil['fecha_de_nacimiento'] = $fila['fecha_de_nacimiento'];
                $perfil['dirección'] = $fila['dirección'];
                $perfil['sexo'] = $fila['sexo'];   
            }
            
        }else{
            echo 'Error al recuperar los datos';
            exit;
        }
        $perfil['usuario'] = $_SESSION['usuario'];
        echo json_encode(array('perfil'=>$perfil));
        exit;
    //
?>
