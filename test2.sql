-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2021 at 08:28 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test2`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Logo` longtext DEFAULT NULL,
  `Banner` longtext DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  `CreatedAt` date NOT NULL,
  `UpdatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`Id`, `Name`, `Logo`, `Banner`, `Status`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 'Djournal Coffe', 'Djournal.png', 'Kitchenette.png', 1, '2021-12-25', '2021-12-25');

-- --------------------------------------------------------

--
-- Table structure for table `outlets`
--

CREATE TABLE `outlets` (
  `Id` int(11) NOT NULL,
  `BrandId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Image` longtext NOT NULL,
  `Address` longtext NOT NULL,
  `Latitude` double NOT NULL,
  `Longitude` double NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `CreatedAt` date NOT NULL,
  `UpdatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `outlets`
--

INSERT INTO `outlets` (`Id`, `BrandId`, `Name`, `Image`, `Address`, `Latitude`, `Longitude`, `Status`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 1, 'Djournal coffee gancy', 'test.jpg', '', -6.2440056107119615, 106.78411562834985, 1, '2021-12-27', '2021-12-27');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Image` longtext NOT NULL,
  `Price` decimal(10,0) NOT NULL,
  `Status` int(11) NOT NULL,
  `CreatedAt` date NOT NULL,
  `UpdatedAt` date NOT NULL,
  `OutletId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Id`, `Name`, `Image`, `Price`, `Status`, `CreatedAt`, `UpdatedAt`, `OutletId`) VALUES
(3, 'Aceh Gayo', 'Aceh Gayo.png', '3000', 1, '2021-12-27', '2021-12-27', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `outlets`
--
ALTER TABLE `outlets`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `BrandId` (`BrandId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_outlet_product` (`OutletId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `outlets`
--
ALTER TABLE `outlets`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `outlets`
--
ALTER TABLE `outlets`
  ADD CONSTRAINT `fk_brand_outlet` FOREIGN KEY (`BrandId`) REFERENCES `brands` (`Id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_outlet_product` FOREIGN KEY (`OutletId`) REFERENCES `outlets` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
