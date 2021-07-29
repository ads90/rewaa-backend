-- project rewaa database

CREATE DATABASE rewaa_db;
use rewaa_db;

-- table `products`
CREATE  TABLE IF NOT EXISTS `products` (
  `Id` BIGINT UNSIGNED AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Quantity` INT UNSIGNED DEFAULT 0,
  `Status` TINYINT UNSIGNED DEFAULT 1,
  `Created_at` DATETIME NOT NULL,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB  DEFAULT CHARSET=utf8mb4;

-- add dump data
ALTER TABLE `products` ;
INSERT INTO `products` VALUES (1,'Tea',5.00,55,1,'2019-11-19 03:30:30','2021-07-27 22:30:30'),(2,'Coffee',6.00,22,2,'2019-11-20 03:30:30','2021-07-27 22:30:30'),(3,'Meat',14.00,11,3,'2021-07-27 22:53:16','2021-07-27 22:53:16');

-- table `users`
CREATE TABLE IF NOT EXISTS `users` (
   `Id` BIGINT UNSIGNED AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` mediumtext NOT NULL,
  `Status` TINYINT UNSIGNED DEFAULT 1,
  `Created_at` DATETIME NOT NULL,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`))
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- add dump data
INSERT INTO `users` VALUES (2,'abdullah','ads','','1','2019-11-19 03:30:30','2021-07-27 22:30:30');