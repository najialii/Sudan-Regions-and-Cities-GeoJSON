-- Sudan Regions Data
-- 19 administrative regions

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `regions`;

CREATE TABLE `regions` (
  `region_id` INT PRIMARY KEY,
  `name_en` VARCHAR(255) NOT NULL,
  `name_ar` VARCHAR(255),
  `code` VARCHAR(50),
  `center_lat` DECIMAL(10, 8),
  `center_lon` DECIMAL(11, 8),
  `area_sqkm` DECIMAL(12, 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `regions` (`region_id`, `name_en`, `name_ar`, `code`, `center_lat`, `center_lon`, `area_sqkm`) VALUES
(1,'Abyei PCA','إدارية أبيي','SD19',9.76237449,28.41709322,10536.83824562),
(2,'Aj Jazirah','الجزيرة','SD15',14.5116272,33.28351684,27154.46368332),
(3,'Blue Nile','النيل الأزرق','SD08',11.02519187,34.10191244,38165.18256435),
(4,'Central Darfur','وسط دارفور','SD06',12.30838055,23.23411106,30960.93410728),
(5,'East Darfur','شرق دارفور','SD05',11.22988573,26.39722982,50775.45662694),
(6,'Gedaref','القضارف','SD12',14.21029664,35.02673717,59542.06696884),
(7,'Kassala','كسلا','SD11',15.71040524,35.5355862,48698.45247904),
(8,'Khartoum','الخرطوم','SD01',15.91498652,33.13522205,21217.39205308),
(9,'North Darfur','شمال دارفور','SD02',15.91233495,25.49878428,317221.32152399),
(10,'North Kordofan','شمال كردفان','SD13',14.38938754,29.43704807,186149.18674226),
(11,'Northern','الشمالية','SD17',19.36562691,29.89554898,364120.22127411),
(12,'Red Sea','البحر الأحمر','SD10',20.0739474,35.41261521,215609.10256364),
(13,'River Nile','نهر النيل','SD16',18.83467686,33.12314746,130405.29549332),
(14,'Sennar','سنار','SD14',12.92321074,34.07481984,39256.56099944),
(15,'South Darfur','جنوب دارفور','SD03',10.8859108,24.31318019,85824.45494866),
(16,'South Kordofan','جنوب كردفان','SD07',11.22893046,30.9139923,79330.64433715),
(17,'West Darfur','غرب دارفور','SD04',13.50261153,22.71005876,22256.82992905),
(18,'West Kordofan','غرب كردفان','SD18',11.86855138,28.22106087,106309.39788625),
(19,'White Nile','النيل الأبيض','SD09',13.5895081,32.35210132,37993.76835192);

SET FOREIGN_KEY_CHECKS = 1;
