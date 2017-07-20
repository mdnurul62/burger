
/* Create and use the starwars db */
CREATE DATABASE  `burgers_db`;
USE `burgers_db`;

/* Create a table for all your star wars characters */
CREATE TABLE `burgers`(
	`id` INT( 11 ) AUTO_INCREMENT NOT NULL,
	`burger_name` VARCHAR( 255) NOT NULL,
	`devoured` VARCHAR( 255 ) NOT NULL,
	`date` VARCHAR( 255 ) NOT NULL,
	PRIMARY KEY ( `id` ) 
); 
/* Set ID as primary key */
