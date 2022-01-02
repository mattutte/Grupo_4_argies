DROP DATABASE IF EXISTS 'casaka_db';
CREATE DATABASE  IF NOT EXISTS 'casaka_db';
USE 'casaka_db';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
   `email` TEXT NOT NULL,
   `password` TEXT NOT NULL,
   `fist_name` VARCHAR(200) NOT NULL,
   `last_name` VARCHAR(200) NOT NULL,
   `country` VARCHAR(200) NOT NULL,
   `face_pic` TEXT NOT NULL,
   `category` INT NOT NULL,
   `fav_national_team` INT,
   `fav_team` INT,
   `adult` TEXT,
   `admin` TEXT,
   PRIMARY KEY (`email`),
   FOREIGN KEY (`category`) REFERENCES `user_categories` (`id`),
   FOREIGN KEY (`fav_national_team`) REFERENCES `national_teams` (`id`),
   FOREIGN KEY (`fave_team`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `national_teams`;
CREATE TABLE `national_teams` (
   `id`  INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `country` VARCHAR(200) NOT NULL,
   `name` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `leagues`;
CREATE TABLE `leagues` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name` TEXT NOT NULL,
   `country` TEXT NOT NULL,
   `continent` VARCHAR(200),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `league_championships`;
CREATE TABLE `league_championships` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `year_season` INT NOT NULL,
   `league` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`league`) REFERENCES `leagues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name` TEXT NOT NULL,
   `country` VARCHAR(200) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `championship_teams`;
CREATE TABLE `championship_teams` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `league_championship` INT NOT NULL,
   `team` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`team`) REFERENCES `teams` (`id`),
   FOREIGN KEY (`league_championship`) REFERENCES `league_championships` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `category` TEXT NOT NULL,
   `name` TEXT NOT NULL,
   `brand` INT NOT NULL,
   `description` TEXT NOT NULL,
   `year` INT,
   `national_team` INT,
   `championship_team` INT,
   `features_style` TEXT,
   `features_gender` TEXT,
   `features_use` TEXT,
   `features_others` TEXT,
   `regular_price` NUMERIC NOT NULL,
   `special_price` NUMERIC,
   `colors_available` TEXT NOT NULL,
   `caption` TEXT,
   `rating_value` NUMERIC,
   `rating_num_comments` INT,
   `returnable` TEXT NOT NULL,
   `delivery_time` TEXT NOT NULL,
   `sizes_available` TEXT NOT NULL,
   `q_available` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`category`) REFERENCES `product_category` (`id`),
   FOREIGN KEY (`brand`) REFERENCES `brands` (`id`),
   FOREIGN KEY (`national_team`) REFERENCES `national_teams` (`id`),
   FOREIGN KEY (`championship_team`) REFERENCES `championship_teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name`  VARCHAR(200) NOT NULL,
   `country_origin` VARCHAR(200),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `multimedia_produt`;
CREATE TABLE `multimedia_produt` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `product` INT NOT NULL,
   `type` VARCHAR(200) NOT NULL,
   `description` TEXT NOT NULL,
   `name` TEXT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_inventory`;
CREATE TABLE `product_inventory` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `product_id` INT NOT NULL,
   `category` INT NOT NULL,
   `size` VARCHAR(100) NOT NULL,
   `weight` FLOAT(2) NOT NULL,
   `color` TEXT NOT NULL,
   `warehouse` TEXT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
   FOREIGN KEY (`category`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_ratings`;
CREATE TABLE `product_ratings` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `product_id` INT NOT NULL,
   `user_id` INT NOT NULL,
   `rating` INT NOT NULL,
   `date_rating` TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
   FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `installments_schemes`;
CREATE TABLE `installments_schemes` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `bank_id` INT NOT NULL,
   `installments` INT NOT NULL,
   `fixed` TEXT NOT NULL,
   `interest_rate` FLOAT(2),
   PRIMARY KEY (`id`),
   FOREIGN KEY (`banks_id`) REFERENCES `banks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name` TEXT NOT NULL,
   `country` VARCHAR(200) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `installments_products`;
CREATE TABLE `installments_products` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name` TEXT NOT NULL,
   `installments_id` INT NOT NULL,
   `product_id` INT NOT NULL
   PRIMARY KEY (),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
   FOREIGN KEY (`installments_id`) REFERENCES `installment_schemes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `user_categories`;
CREATE TABLE `user_categories` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(200) NOT NULL,
   `description` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `name` TEXT NOT NULL,
   `description` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart` (
   `id` INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `email_user` TEXT NOT NULL,
   `q_products` INT,
   `total_price` NUMERIC,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`email_user`) REFERENCES `users` (`email`),
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `shopping_cart_content`;
CREATE TABLE `shopping_cart_content` (
   `id`  INT NOT NULL UNSIGNED AUTO_INCREMENT,
   `id_product_in_inventory` INT NOT NULL,
   `shopping_cart` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`id_product_in_inventory`) REFERENCES `product_inventory` (`id`),
   FOREIGN KEY (`shopping_cart`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
