<?php
    // Iniciamos sesión
    session_start();

    //Conectamos con la Base de Datos
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

    //Verificamos si hay campos obligatorios vacíos
        $campos_obligatorios=[];
        foreach ($_POST as $clave => $valor) {
            if($valor==''){
                $campos_obligatorios[]=$clave;
            }
        }
        if($campos_obligatorios){
            echo json_encode(array('campos_vacíos'=>$campos_obligatorios));
            exit;
        }
    //

    // Guardamos los datos en variables
        $id_User = $_SESSION['idUser'];
        $id_Noticia = $_SESSION['id_noticia_elegida'];
        $título = $_POST['título'];
        $fecha = $_POST['fecha'];
        $texto = $_POST['texto'];
    //

    // Procesamiento de la imagen si se ha proporcionado una nueva
        if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
            // Verificamos que la imagen está en formato esperado
                $formato_imagen = array('image/png','image/jpg','image/jpeg');
                if(!in_array($_FILES['foto']['type'], $formato_imagen)){ 
                    //Cerramos la base de datos
                    $conexionDB->cerrarConexion();
                    //Enviamos respuesta
                    echo json_encode(array('otros_errores' => 'El formato de la imagen no es aceptable.'));
                    exit;
                }
            //

            // Guardamos la foto en la carpeta imágenes
                $nombre_foto = $_FILES['foto']['name'];
                $ruta_foto = '../img/noticias/' . $nombre_foto;
                if (!move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_foto)) {
                    //Cerramos la base de datos
                    $conexionDB->cerrarConexion();
                    //Enviamos la respuesta
                    echo json_encode(array('otros_errores' => 'Error al guardar la imagen.'));
                    exit;
                }
            //

            // Actualiza la base de datos con la nueva ubicación de la imagen
                $sql_editar = "UPDATE noticias SET ";
                $sql_editar .= "idUser = '" . $id_User . "', ";
                $sql_editar .= "título = '" . $título . "', ";
                $sql_editar .= "imagen = '" . $nombre_foto . "', ";
                $sql_editar .= "texto = '" . $texto . "', ";
                $sql_editar .= "fecha = '" . $fecha . "' ";
                $sql_editar .= "WHERE idNoticia = '" . $id_Noticia . "'; ";
            //
        } else {
            // No se proporcionó una nueva imagen, no actualizamos la ubicación de la imagen en la base de datos
                $sql_editar = "UPDATE noticias SET ";
                $sql_editar .= "idUser = '" . $id_User . "', ";
                $sql_editar .= "título = '" . $título . "', ";
                $sql_editar .= "texto = '" . $texto . "', ";
                $sql_editar .= "fecha = '" . $fecha . "' ";
                $sql_editar .= "WHERE idNoticia = '" . $id_Noticia . "'; ";
            //
        }
    //

    // Realizamos la actualización
        $resultado = $conexion->query($sql_editar);
        //Cerramos la base de datos
        $conexionDB->cerrarConexion();
        //Procesamos respuesta
        if ($resultado) {
            echo json_encode(array('ok'=>'Se actualizó la noticia correctamente.'));
            exit;
        } else {
            echo json_encode(array('ok'=>'No se pudo actualizar la noticia.'));
            exit;
        }
    //
?>
