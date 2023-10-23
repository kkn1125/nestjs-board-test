drop schema  IF EXISTS `nest-test`;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nest-test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nest-test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nest-test` DEFAULT CHARACTER SET utf8 ;
USE `nest-test` ;

-- -----------------------------------------------------
-- Table `nest-test`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nest-test`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `gender` VARCHAR(5) NOT NULL,
  `birth` DATE NOT NULL,
  `signed_in` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  `last_sign_in` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fail_sign_in_count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nest-test`.`board`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nest-test`.`board` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `author` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_board_user_idx` (`author` ASC) VISIBLE,
  CONSTRAINT `fk_board_user`
    FOREIGN KEY (`author`)
    REFERENCES `nest-test`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
