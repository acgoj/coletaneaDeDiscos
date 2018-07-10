-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema diskscollections
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema diskscollections
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `diskscollections` DEFAULT CHARACTER SET utf8 ;
USE `diskscollections` ;

-- -----------------------------------------------------
-- Table `diskscollections`.`COLLECTIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `diskscollections`.`COLLECTIONS` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diskscollections`.`DISKS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `diskscollections`.`DISKS` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Artist` VARCHAR(45) NULL,
  `Style` VARCHAR(45) NULL,
  `Information` VARCHAR(200) NULL,
  `TracksCount` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `diskscollections`.`COLLECTION_DISK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `diskscollections`.`COLLECTION_DISK` (
  `IdDisk` INT NOT NULL,
  `IdCollection` INT NOT NULL,
  INDEX `FK_DISKS_idx` (`IdDisk` ASC),
  INDEX `FK_COLLECTIONS_idx` (`IdCollection` ASC),
  PRIMARY KEY (`IdDisk`, `IdCollection`),
  CONSTRAINT `FK_DISKS`
    FOREIGN KEY (`IdDisk`)
    REFERENCES `diskscollections`.`DISKS` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_COLLECTIONS`
    FOREIGN KEY (`IdCollection`)
    REFERENCES `diskscollections`.`COLLECTIONS` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
