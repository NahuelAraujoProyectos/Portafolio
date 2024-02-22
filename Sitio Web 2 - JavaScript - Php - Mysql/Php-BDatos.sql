-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2023 a las 21:20:56
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `trabajo_final`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `idCita` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `fecha_cita` date NOT NULL,
  `motivo_cita` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`idCita`, `idUser`, `fecha_cita`, `motivo_cita`) VALUES
(1, 3, '2023-12-06', 'Desarrollar voz única como escritor.'),
(2, 3, '2023-12-08', 'Descubrir cómo superar bloqueos creativos'),
(3, 3, '2023-12-10', 'Aprender a construir personajes memorables'),
(4, 4, '2023-12-07', 'Desarrollar habilidades de escritura persuasiva'),
(5, 4, '2023-12-15', 'Crear diálogos auténticos y convincentes'),
(6, 4, '2023-12-11', 'Descubrir mi estilo de escritura distintivo'),
(7, 5, '2023-12-09', 'Superar el miedo al folio en blanco'),
(8, 5, '2023-12-12', 'Explorar géneros literarios diversos'),
(9, 5, '2023-12-15', 'Crear atmósferas envolventes en tus historias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `idNoticia` int(11) NOT NULL,
  `título` varchar(50) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `texto` text NOT NULL,
  `fecha` date NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`idNoticia`, `título`, `imagen`, `texto`, `fecha`, `idUser`) VALUES
(1, 'Cliches literarios y tópicos', 'noticia_1.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit posuere curae placerat taciti, netus lobortis praesent in cubilia non parturient mollis vestibulum. Per inceptos euismod pretium natoque ad, accumsan facilisi praesent nostra ante risus, nisi magna sed morbi. Vitae platea dis mollis curabitur rutrum torquent sagittis, feugiat nascetur magnis litora fusce ut, integer aliquam habitant ligula dictumst phasellus. Dis purus posuere metus ac etiam pharetra tortor sagittis maecenas, potenti suspendisse nibh montes sodales imperdiet hac nullam, velit pulvinar erat quisque torquent cursus fusce justo.\r\n\r\nVolutpat nascetur tempor sollicitudin odio quam cras, ornare vehicula etiam interdum taciti habitant lobortis, venenatis est natoque tellus vivamus. Magna integer sagittis egestas morbi curabitur maecenas ligula viverra, risus mi habitant purus posuere lobortis platea vestibulum, massa netus suscipit himenaeos duis sociosqu molestie. Neque ornare dis ultrices cursus rutrum turpis tristique nec auctor nam, cubilia congue curabitur felis urna tincidunt blandit porta facilisi justo, odio volutpat leo mollis augue arcu iaculis pretium lacinia. Vehicula non sociis orci ligula libero pellentesque tortor ornare nisl metus leo, suscipit fames integer ac semper lectus nunc tempor ad.', '2023-11-28', 1),
(2, 'Normas de Prefijos', 'noticia_3.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing, elit metus augue cursus montes felis, varius pellentesque quisque feugiat tellus. Ridiculus facilisis pretium cubilia tempus nulla sem hac leo turpis rhoncus molestie, duis natoque himenaeos suspendisse proin montes sociis mauris torquent. Pellentesque tortor phasellus inceptos urna rhoncus primis sapien platea ligula ante, dapibus pharetra torquent condimentum neque curabitur auctor felis augue sodales, convallis metus imperdiet lacus a volutpat in et suscipit.\r\n\r\nJusto mattis dui ad duis leo et tempus aenean, luctus porta potenti aliquet torquent mus orci ultrices hendrerit, varius quis aptent mi dignissim ornare convallis. Dapibus aliquam sodales faucibus placerat diam euismod augue vel netus nostra et, himenaeos in conubia varius eros montes vitae facilisi per nascetur, duis vivamus sociis interdum lacus elementum primis arcu nam magna. Lectus vel blandit per volutpat mattis sapien a ligula, aliquet rhoncus nullam placerat primis pellentesque turpis sem porttitor, diam aliquam nostra orci maecenas facilisi consequat.', '2023-12-04', 1),
(3, 'Desenlace Deus Ex Machina', 'noticia_2.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit lacus rhoncus vehicula in, dictum velit tempor dictumst nec mauris curae viverra aenean convallis. Sollicitudin cum magnis fermentum nibh ornare semper sem netus vulputate lectus, libero rhoncus gravida sagittis auctor porta mollis ultricies. Nisl nostra nunc penatibus a himenaeos parturient commodo mi, duis pulvinar natoque dapibus eu condimentum mauris taciti pharetra, mattis rutrum lacus fusce quis sem accumsan. Venenatis vivamus lacinia habitant penatibus malesuada rhoncus turpis congue massa, aptent porttitor ad phasellus risus facilisis quis felis, vestibulum ornare consequat tincidunt parturient sed id facilisi.\r\n\r\nFusce nisl in sociis platea ultrices imperdiet placerat pretium, euismod proin nam habitasse sociosqu praesent. Ultrices libero litora parturient cras facilisi vel odio pharetra diam iaculis quis, laoreet ac donec mattis sociosqu platea eget dapibus nibh velit. Dui potenti imperdiet dignissim volutpat tristique habitant cursus integer sed litora, auctor fames tincidunt lacus purus cubilia senectus facilisis. Mollis tellus habitant neque ad nullam fames, suspendisse accumsan cubilia inceptos tristique vivamus, nunc dapibus venenatis libero facilisi.', '2023-12-01', 2),
(4, '¿Cómo hacer una descripción?', 'noticia_4.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit, pretium blandit platea conubia taciti massa donec, gravida convallis condimentum lectus diam natoque. Potenti vivamus imperdiet sed sociosqu integer sagittis vehicula feugiat porttitor sociis, non rhoncus nibh egestas vulputate arcu habitasse quam faucibus interdum est, natoque augue laoreet purus leo etiam commodo maecenas nisi. Metus nisi accumsan dui sapien per duis est nullam, fusce semper penatibus ornare risus bibendum fames quis etiam, maecenas nibh sodales gravida eu tempor a.\r\n\r\nLaoreet odio vitae nisi felis diam aenean vehicula mauris justo mattis vulputate curabitur, vivamus purus imperdiet convallis ultricies tempus ac donec inceptos metus consequat velit, viverra conubia quam fusce sem class ultrices dapibus sodales taciti iaculis. Phasellus vitae class aliquam massa tempus ut tincidunt nisi magna viverra euismod, commodo conubia dui egestas diam dignissim per aptent sociosqu quis nisl, ornare platea dapibus ridiculus risus tristique erat vel faucibus pharetra. Dignissim feugiat risus massa ut semper enim vitae egestas, nostra quis ullamcorper taciti aliquam praesent ornare primis, nascetur conubia sem donec vulputate ad ultricies.', '2023-12-09', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_login`
--

CREATE TABLE `users_login` (
  `idLogin` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_login`
--

INSERT INTO `users_login` (`idLogin`, `idUser`, `usuario`, `password`, `rol`) VALUES
(1, 1, 'admin1', '$2y$10$JqWmgxUu/2s7GtaQGNeikO6O2OOv4wJg5NfQb2Tzpa/ZPMDnOFzRy', 'admin'),
(2, 2, 'admin2', '$2y$10$KQ8fqJneJoV.ScCTVyJhcuwKOkT2v767h5x/O3Iqx83abqM8AgRh.', 'admin'),
(3, 3, 'user3', '$2y$10$anfpTt/yviXpXKRW1JHoU.NUuA357jFn6uNfMhNRvtRInww1gNCWG', 'user'),
(4, 4, 'user4', '$2y$10$LNCy75hTh7Rc8cxEXV1oNeL.GCPZ2HQiJ7KH82tf7GlzIb9k61pZm', 'user'),
(5, 5, 'user5', '$2y$10$9WiVYYDQxSaWHhFJaFXeJesEjRD2vogegMIs26VbGoTB3E.nOZYdK', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_data`
--

CREATE TABLE `user_data` (
  `idUser` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `teléfono` varchar(15) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `dirección` varchar(30) DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_data`
--

INSERT INTO `user_data` (`idUser`, `nombre`, `apellidos`, `email`, `teléfono`, `fecha_de_nacimiento`, `dirección`, `sexo`) VALUES
(1, 'Juan', 'Perez', 'admin1@example.com', '987654321', '1990-01-01', 'Calle Ficticia 123', 'hombre'),
(2, 'Maria', 'Rodriguez', 'admin2@example.com', '987654321', '1985-01-15', 'Av Imaginaria 456', 'mujer'),
(3, 'Carlos', 'Gomez', 'user3@example.com', '987654321', '1988-03-20', 'Calle Irreal 789', 'hombre'),
(4, 'Laura', 'Martinez', 'user4@example.com', '987654321', '1995-04-12', 'Av Virtual 101', 'mujer'),
(5, 'Alejandro', 'Sanchez', 'user5@example.com', '987654321', '1982-05-25', 'Calle Imaginaria 567', 'hombre');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `FK_citas_idUser` (`idUser`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`idNoticia`),
  ADD UNIQUE KEY `UNIQUE_titulo` (`título`),
  ADD KEY `FK_noticias_idUser` (`idUser`);

--
-- Indices de la tabla `users_login`
--
ALTER TABLE `users_login`
  ADD PRIMARY KEY (`idLogin`),
  ADD UNIQUE KEY `UNIQUE_usuario` (`usuario`),
  ADD UNIQUE KEY `UNIQUE_idUser` (`idUser`);

--
-- Indices de la tabla `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `idNoticia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users_login`
--
ALTER TABLE `users_login`
  MODIFY `idLogin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user_data`
--
ALTER TABLE `user_data`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `FK_citas_idUser` FOREIGN KEY (`idUser`) REFERENCES `user_data` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD CONSTRAINT `FK_noticias_idUser` FOREIGN KEY (`idUser`) REFERENCES `user_data` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users_login`
--
ALTER TABLE `users_login`
  ADD CONSTRAINT `FK_user_login_idUser` FOREIGN KEY (`idUser`) REFERENCES `user_data` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
