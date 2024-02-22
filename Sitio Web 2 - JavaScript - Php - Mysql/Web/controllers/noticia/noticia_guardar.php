<?php
    //Iniciamos la sesión
    session_start();

    //Conectamos a la Base de Datos
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

    //Guardamos los datos en variables
        $titulo = $_POST['título'];
        $fecha = $_POST['fecha'];
        $texto = $_POST['texto'];
        $foto = $_FILES['foto'];
        $idUser = $_SESSION['idUser'];
    //

    //Verificamos si hay campos obligatorios vacíos
        $campos_obligatorios=[];
        foreach ($_POST as $clave => $valor) {
            if($valor==''){
                $campos_obligatorios[]=$clave;
            }
        }
        if (!is_uploaded_file($foto['tmp_name'])) {
            $campos_obligatorios[]='foto';
        }

        if($campos_obligatorios){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos la salida
            echo json_encode(array('campos_vacíos'=>$campos_obligatorios));
            exit;
        }
    //
    
    //Verificamos que la imagen está en formato esperado
        $formato_imagen = array('image/png','image/jpg','image/jpeg');
        if(!in_array($foto['type'],$formato_imagen)){
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos la salida
            echo json_encode(array('otros_errores'=>'El formato de la imagen no es aceptable.'));
            exit;
        }
    //

    //Guardamos la foto en la carpeta imágenes
        $nombre_foto = $foto['name'];
        $ruta_foto = '../../img/noticias/' . $nombre_foto;

        if (!move_uploaded_file($foto['tmp_name'], $ruta_foto)) {
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Procesamos la salida
            echo json_encode(array('otros_errores'=>'Error al guardar la imagen.'));
            exit;
        }
    //

    //Preparamos la consulta
        $sql_noticias ="INSERT INTO noticias (título,imagen,texto,fecha,idUser) ";
        $sql_noticias .="VALUES ('".$titulo."','".$nombre_foto."','".$texto."','".$fecha."','".$idUser."');";
    //

    //Realizamos el registro
        $resultado = $conexion->query($sql_noticias);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        if($resultado){
            echo json_encode(array('Se registró la noticia con éxito.'));
            exit;
        }else{
            echo json_encode(array('No se pudo registrar la noticia.'));
            exit;
        }
    //

?>

