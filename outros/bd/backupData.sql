-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           8.0.21 - MySQL Community Server - GPL
-- SO do servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- A despejar estrutura da base de dados para test_
CREATE DATABASE IF NOT EXISTS `test_` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test_`;

-- A despejar estrutura para tabela test_.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- A despejar dados para tabela test_.category: 2 rows
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `name`, `code`) VALUES
	(1, 'Tênis', 'Tn20254'),
	(2, 'Informática', 'Infor4587');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- A despejar estrutura para tabela test_.imagem
CREATE TABLE IF NOT EXISTS `imagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext NOT NULL,
  `path` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- A despejar dados para tabela test_.imagem: 4 rows
/*!40000 ALTER TABLE `imagem` DISABLE KEYS */;
INSERT INTO `imagem` (`id`, `name`, `path`) VALUES
	(1, 'FX5550-6111329bbbe197.42439106.jpg', 'img/upload/'),
	(2, 'Tenis-Nike-Air-Max-27-React-Masculino-Multicolor-611133516e7085.70382510.jpg', 'img/upload/'),
	(3, 'ces-deve-ter-entre-outros-novos-chromebooks-como-o-acer-c710-primeiro-do-tipo-no-brasil-611133e755f487.77981793.jpg', 'img/upload/'),
	(4, 'Computador-Desktop-Dell-Vostro-6111345f049b22.90245368.jpg', 'img/upload/');
/*!40000 ALTER TABLE `imagem` ENABLE KEYS */;

-- A despejar estrutura para tabela test_.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCategory` int DEFAULT NULL,
  `idImg` int DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sku` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategory` (`idCategory`),
  KEY `idImg` (`idImg`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- A despejar dados para tabela test_.product: 4 rows
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `idCategory`, `idImg`, `name`, `sku`, `quantity`, `price`, `description`) VALUES
	(1, 1, 1, 'Adidas Stan Smith Kermit the Frog', '85790-964', 5, 100, 'Novo modelo do tênis adidas stan smith'),
	(2, 1, 2, 'Nike Air Max 270', 'NK123', 9, 250, 'Tênis Nike Air Max 270 React Masculino'),
	(3, 2, 3, 'Computador Acer CES 2014', '98547-965', 4, 50000, 'Computadores na CES 2014 híbridos chromebooks e ultrabooks'),
	(4, 2, 4, 'Computador Desktop Dell', '7412-885', 1, 56464, 'Melhor computador para teres em casa');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
