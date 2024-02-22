<?php
    //Iniciamos session
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

    //Preparamos la consulta general
        $sql_noticias ="SELECT *, users_login.usuario AS nombre_usuario ";
        $sql_noticias.="FROM noticias INNER JOIN users_login ON noticias.idUser = users_login.idUser ";
        $sql_noticias.="ORDER BY noticias.fecha DESC;";
    //

    //Realizamos la consulta
        $resultado = $conexion->query($sql_noticias);
        $noticias = array();
        if($resultado->num_rows>0){
            while($fila=$resultado->fetch_assoc()){
                //Establecemos estado de la noticia
                $fecha_actual = date("Y-m-d");
                $estado = ($fecha_actual >= $fila['fecha']) ? 'Presentada' : 'Pendiente';

                if($_SESSION['rol'] !== 'admin' && $estado == 'Presentada') {
                    // Si la vista es distinta de 'admin' y el estado es 'Presentada', guardamos los datos
                    $noticia = array(
                        'idNoticia' => $fila['idNoticia'],
                        'título' => $fila['título'],
                        'imagen' => $fila['imagen'],
                        'texto' => $fila['texto'],
                        'fecha' =>  $fila['fecha'],
                        'usuario' => $fila['nombre_usuario']
                    );
                    $noticias[] = $noticia;
                }elseif ($_SESSION['rol'] == 'admin') {
                    // Si la vista es 'admin', guardamos los datos independientemente del estado
                    $noticia = array(
                        'idNoticia' => $fila['idNoticia'],
                        'título' => $fila['título'],
                        'imagen' => $fila['imagen'],
                        'texto' => $fila['texto'],
                        'fecha' => $fila['fecha'],
                        'usuario' => $fila['nombre_usuario'],
                        'estado' => $estado
                    );
                    $noticias[] = $noticia;
                } 
            }
        }else{
            echo 'Error al recuperar los datos';
        }
    //

    //Consulta individual de noticia por ID
        if (isset($_POST['idNoticia'])) {
            $idNoticia = $_POST['idNoticia'];
            $sql_noticias ="SELECT *, users_login.usuario AS nombre_usuario  FROM noticias INNER JOIN users_login ON noticias.idUser = users_login.idUser ;";

            $sql_noticia_individual = "SELECT *, users_login.usuario AS nombre_usuario  FROM noticias INNER JOIN users_login ON noticias.idUser = users_login.idUser WHERE idNoticia = $idNoticia;";
            $resultado_noticia_individual = $conexion->query($sql_noticia_individual);

            if ($resultado_noticia_individual->num_rows > 0) {
                $fila = $resultado_noticia_individual->fetch_assoc();
                //Establecemos estado de la noticia
                $fecha_actual = date("Y-m-d");
                $estado = ($fecha_actual >= $fila['fecha']) ? 'Presentada' : 'Pendiente';
                //Guardamos id de noticia seleccionada en $_SESSION
                $_SESSION['id_noticia_elegida'] = $fila['idNoticia'];
                //Guardamos el resto de los datos en el array
                $noticia_individual = array(
                    'título' => $fila['título'],
                    'imagen' => $fila['imagen'],
                    'texto' => $fila['texto'],
                    'fecha' => $fila['fecha'],
                    'usuario' => $fila['usuario'],
                    'estado' => $estado
                );
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Devolvemos respuesta
                echo json_encode(array('noticia_individual' => $noticia_individual));
            } else {
                //Cerramos la base de datos
                $conexionDB->cerrarConexion();
                //Devolvemos respuesta
                echo 'No se encontró la noticia con el ID especificado';
            }
        } else {
            //Cerramos la base de datos
            $conexionDB->cerrarConexion();
            //Devolvemos respuesta
            echo json_encode(array('noticias'=>$noticias));
        }
    //
?>