DROP DATABASE IF EXISTS 'casaka_db';
CREATE DATABASE  IF NOT EXISTS 'casaka_db';
USE 'casaka-db';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
   `email` TEXT NOT NULL,
   `password` TEXT NOT NULL,
   `fist_name` CHAR(100) NOT NULL,
   `last_name` char(100) NOT NULL,
   `country` TEXT NOT NULL,
   `face_pic` TEXT NOT NULL,
   `category` int NOT NULL,
   `fav_national_team` INT,
   `fav_team` int,
   `adult` BOOL NOT NULL,
   PRIMARY KEY (`email`),
   FOREIGN KEY (`category`) REFERENCES `user_categories` (`id`),
   FOREIGN KEY (`fav_national_team`) REFERENCES `national_teams` (`id`),
   FOREIGN KEY (`fave_team`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `national_teams`;
CREATE TABLE `national_teams` (
   `id`  NOT NULL,
   `country` TEXT NOT NULL,
   `name` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `leagues`;
CREATE TABLE `leagues` (
   `id` INT NOT NULL,
   `name` TEXT NOT NULL,
   `country` text,
   `continent` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `league_championships`;
CREATE TABLE `league_championships` (
   `id` INT NOT NULL,
   `year_season` INT NOT NULL,
   `league` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`league`) REFERENCES `leagues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
   `id` INT NOT NULL,
   `name` TEXT NOT NULL,
   `country` TEXT NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `championship_teams`;
CREATE TABLE `championship_teams` (
   `id` INT NOT NULL,
   `league_championship` int NOT NULL,
   `team` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`team`) REFERENCES `teams` (`id`),
   FOREIGN KEY (`league_championship`) REFERENCES `league_championships` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
   `id` INT NOT NULL,
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
   `colors_available` TEXT NOT NULL,
   `special_price` NUMERIC,
   `caption` TEXT,
   `rating_value` NUMERIC,
   `rating_num_comments` INT,
   `returnable` BOOLEAN NOT NULL,
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
   `id` INT NOT NULL,
   `name`  NOT NULL,
   `country_origin` ,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `multimedia_produt`;
CREATE TABLE `multimedia_produt` (
   `id` INT NOT NULL,
   `product` int NOT NULL,
   `type` text NOT NULL,
   `description` TEXT NOT NULL,
   `name` TEXT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_inventory`;
CREATE TABLE `product_inventory` (
   `id` INT NOT NULL,
   `product_id`  NOT NULL,
   `category` INT NOT NULL,
   `size` TEXT NOT NULL,
   `weight` NUMERIC NOT NULL,
   `color` TEXT NOT NULL,
   `warehouse` TEXT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
   FOREIGN KEY (`category`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_ratings`;
CREATE TABLE `product_ratings` (
   `id` INT NOT NULL,
   `product_id` INT NOT NULL,
   `user_id` INT NOT NULL,
   `rating` INT NOT NULL,
   `date_rating` TIMESTAMPTZ NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
   FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `installments_schemes`;
CREATE TABLE `installments_schemes` (
   `id` INT NOT NULL,
   `bank_id` int NOT NULL,
   `installments` INT NOT NULL,
   `fixed` BOOLEAN NOT NULL,
   `interest_rate` FLOAT4,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`banks_id`) REFERENCES `banks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks` (
   `id` INT NOT NULL,
   `name` TEXT NOT NULL,
   `country` TEXT NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `installments_products`;
CREATE TABLE `installments_products` (
   `id` INT NOT NULL,
   `name` TEXT,
   `installments_id` int NOT NULL,
   `product_id` int NOT NULL
   PRIMARY KEY (),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
   FOREIGN KEY (`installments_id`) REFERENCES `installment_schemes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `user_categories`;
CREATE TABLE `user_categories` (
   `id` INT NOT NULL,
   `name` TEXT NOT NULL,
   `description` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
   `id` INT NOT NULL,
   `name` TEXT NOT NULL,
   `description` TEXT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart` (
   `id` int NOT NULL,
   `email_user` TEXT NOT NULL,
   `q_products` INT,
   `total_price` NUMERIC,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`email_user`) REFERENCES `users` (`email`),
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `shopping_cart_content`;
CREATE TABLE `shopping_cart_content` (
   `id`  NOT NULL,
   `id_product_in_inventory` INT NOT NULL,
   `shopping_cart` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`id_product_in_inventory`) REFERENCES `product_inventory` (`id`),
   FOREIGN KEY (`shopping_cart`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE `Users` ADD CONSTRAINT `FK_44b8f5cd-51a5-4569-95b6-e08d0395adf5` FOREIGN KEY (`fav_national_team`) REFERENCES `national_teams`(`id`)  ;

ALTER TABLE `Users` ADD CONSTRAINT `FK_4fb465c8-d6d5-49c3-825e-f2e59ac61ab4` FOREIGN KEY (`fav_team`) REFERENCES `teams`(`id`)  ;

ALTER TABLE `Users` ADD CONSTRAINT `FK_faeacb00-0c5a-477c-a92a-392e558d78e7` FOREIGN KEY (`category`) REFERENCES `user_categories`(`id`)  ;

ALTER TABLE `league_championships` ADD CONSTRAINT `FK_7d889b46-5429-4cdb-9644-900509442aeb` FOREIGN KEY (`league`) REFERENCES `leagues`(`id`)  ;

ALTER TABLE `championship_teams` ADD CONSTRAINT `FK_50dd2f5d-d859-4f97-8804-059489cc2066` FOREIGN KEY (`league_championship`) REFERENCES `league_championships`(`id`)  ;

ALTER TABLE `championship_teams` ADD CONSTRAINT `FK_b86f84be-8af2-4730-bb8f-1cadff2a9ddb` FOREIGN KEY (`team`) REFERENCES `teams`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_429da5b2-5ff7-4221-8830-30546464dc49` FOREIGN KEY (`brand`) REFERENCES `brands`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_8b4ace04-83a8-4cfd-9160-6f582b42fa1a` FOREIGN KEY (`championship_team`) REFERENCES `championship_teams`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_5a022415-8054-479b-9297-f9221afc538a` FOREIGN KEY (`national_team`) REFERENCES `national_teams`(`id`)  ;

ALTER TABLE `multimedia_produt` ADD CONSTRAINT `FK_587d4f1f-91eb-41e9-ac80-c3b6b1800d5b` FOREIGN KEY (`product`) REFERENCES `products`(`id`)  ;

ALTER TABLE `product_inventory` ADD CONSTRAINT `FK_30ba61dc-3fa7-4f25-bc52-aff34eb9dcbe` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `product_inventory` ADD CONSTRAINT `FK_6532f3d0-bf60-45af-a1b3-e781afe0503e` FOREIGN KEY (`category`) REFERENCES `product_category`(`id`)  ;

ALTER TABLE `product_ratings` ADD CONSTRAINT `FK_ce6ad001-1d49-49e9-816c-e55e78b9700f` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `product_ratings` ADD CONSTRAINT `FK_d4fbda50-a4db-49c4-802b-79a389c53647` FOREIGN KEY (`user_id`) REFERENCES `Users`(`email`)  ;

ALTER TABLE `installments_schemes` ADD CONSTRAINT `FK_9650dee7-e66f-4a59-a7a0-f1691349c509` FOREIGN KEY (`bank_id`) REFERENCES `banks`(`id`)  ;

ALTER TABLE `installments_products` ADD CONSTRAINT `FK_dcd32f4f-8209-4a62-9648-13edf697f072` FOREIGN KEY (`installment._id`) REFERENCES `installments_schemes`(`id`)  ;

ALTER TABLE `installments_products` ADD CONSTRAINT `FK_bdee2147-2fb1-45b1-9b8a-8b8b45cdf068` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `shopping_cart` ADD CONSTRAINT `FK_9fe0f2f1-4633-4f84-afc5-3667570c1897` FOREIGN KEY (`email_user`) REFERENCES `Users`(`email`)  ;

ALTER TABLE `shopping_cart_content` ADD CONSTRAINT `FK_8fd8f977-3ae9-45a5-8079-a3511c696fe3` FOREIGN KEY (`id_product_in_inventory`) REFERENCES `product_inventory`(`id`)  ;

ALTER TABLE `shopping_cart_content` ADD CONSTRAINT `FK_098a60f2-761c-476f-9731-ba09dc4426cf` FOREIGN KEY (`shopping_cart`) REFERENCES `shopping_cart`(`id`)  ;
