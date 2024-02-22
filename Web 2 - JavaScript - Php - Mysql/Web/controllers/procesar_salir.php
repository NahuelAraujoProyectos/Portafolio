<?php
    include "../models/Salir.php";
    Salir::salir();
    header("Location: ../index.php");
?>