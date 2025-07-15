CREATE DATABASE  IF NOT EXISTS `salao` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `salao`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: salao
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientes_idclientes` int NOT NULL,
  `profissional_id` int NOT NULL,
  `data_hora` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_agendamento_clientes_idx` (`clientes_idclientes`),
  KEY `fk_agendamento_profissional1_idx` (`profissional_id`),
  CONSTRAINT `fk_agendamento_clientes` FOREIGN KEY (`clientes_idclientes`) REFERENCES `clientes` (`idclientes`),
  CONSTRAINT `fk_agendamento_profissional1` FOREIGN KEY (`profissional_id`) REFERENCES `profissional` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (10,2,4,'2025-05-21 14:00:00'),(11,1,2,'2025-01-19 07:50:00'),(12,9,6,'2024-12-08 15:30:20'),(13,5,1,'2024-09-15 12:20:36');
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agendamento_has_procedimento`
--

DROP TABLE IF EXISTS `agendamento_has_procedimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento_has_procedimento` (
  `agendamento_id` int NOT NULL,
  `procedimento_id` int NOT NULL,
  PRIMARY KEY (`agendamento_id`,`procedimento_id`),
  KEY `fk_agendamento_has_procedimento_procedimento1_idx` (`procedimento_id`),
  KEY `fk_agendamento_has_procedimento_agendamento1_idx` (`agendamento_id`),
  CONSTRAINT `fk_agendamento_has_procedimento_agendamento1` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamento` (`id`),
  CONSTRAINT `fk_agendamento_has_procedimento_procedimento1` FOREIGN KEY (`procedimento_id`) REFERENCES `procedimento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento_has_procedimento`
--

LOCK TABLES `agendamento_has_procedimento` WRITE;
/*!40000 ALTER TABLE `agendamento_has_procedimento` DISABLE KEYS */;
INSERT INTO `agendamento_has_procedimento` VALUES (11,101),(10,105),(12,107);
/*!40000 ALTER TABLE `agendamento_has_procedimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idclientes` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `telefone` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idclientes`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Antonia','9986214856'),(2,'Joana','9984136674'),(3,'Tereza','9976304541'),(4,'Marcelina','9631248116'),(5,'Roberta','9763041861'),(7,'Erika','9870641546'),(8,'Alexandra','9965317466'),(9,'Luana','9125793049');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedimento`
--

DROP TABLE IF EXISTS `procedimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedimento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `preco` decimal(10,0) DEFAULT NULL,
  `imagem` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedimento`
--

LOCK TABLES `procedimento` WRITE;
/*!40000 ALTER TABLE `procedimento` DISABLE KEYS */;
INSERT INTO `procedimento` VALUES (101,'Sobrancelha',30,'https://clinicaanazandona.com.br/wp-content/webp-express/webp-images/uploads/2018/10/Design-Sobrancelha.jpg.webp'),(102,'Manicure',45,'https://img.freepik.com/fotos-gratis/mulher-fazendo-as-unhas-de-uma-cliente_23-2148697080.jpg'),(103,'Corte',85,'https://www.em.com.br/emfoco/wp-content/uploads/2025/04/corte-de-cabelo_1743438577845.jpg'),(104,'Pedicure',45,'https://istoe.com.br/wp-content/uploads/2020/04/unhas-pedicure.jpg?ims=778x438/filters:quality(85)'),(105,'Progressiva',200,'https://belezamoderna.com.br/wp-content/uploads/2023/01/cabelo-progressiv.jpeg'),(106,'Maquiagem',150,'https://img.freepik.com/fotos-gratis/mulher-num-salao-de-beleza-a-fazer-maquiagem_1303-27761.jpg'),(107,'Hidratação',120,'https://extra.globo.com/incoming/12667826-5b9-cf1/w976h550-PROP/hidratacao01.jpg'),(108,'Depilação',250,'https://static.vecteezy.com/ti/fotos-gratis/p1/2885638-mulher-fazendo-procedimento-de-remocao-de-cabelo-na-perna-aplicando-tira-cera-foto.jpg'),(109,'Cilios',180,'https://img.freepik.com/fotos-premium/foto-de-cosmetologista-fazendo-o-procedimento-de-extensao-de-cilios-em-uma-mulher-sobre-fundo-branco_519356-1988.jpg'),(110,'Estetica',350,'https://img.freepik.com/fotos-gratis/esteticista-aplicando-injecao-de-preenchimento-para-cliente_23-2148875477.jpg?semt=ais_hybrid&w=740'),(111,'Escova',120,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiaCFoph28sXzVHlPBDoDTh5khgn3Spr9hhQ&s'),(112,'Massagem',400,'https://img.freepik.com/fotos-gratis/mulher-recebendo-uma-massagem-nas-costas-do-massagista_23-2150461415.jpg?semt=ais_hybrid&w=740');
/*!40000 ALTER TABLE `procedimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profissional`
--

DROP TABLE IF EXISTS `profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissional` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `especialidade` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissional`
--

LOCK TABLES `profissional` WRITE;
/*!40000 ALTER TABLE `profissional` DISABLE KEYS */;
INSERT INTO `profissional` VALUES (1,'Isabela','manicure'),(2,'Isabelly','maquiadora'),(3,'Grasiela','cabeleireira'),(4,'Isa','design'),(5,'Ana Luiza','depiladora'),(6,'Gabriela','pedicure');
/*!40000 ALTER TABLE `profissional` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14 16:50:13
