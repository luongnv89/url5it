create database ticdb;
use ticdb;
CREATE TABLE IF NOT EXISTS `urltable` (`shorturl` varchar(255) NOT NULL,`longurl` varchar(255) NOT NULL,PRIMARY KEY (`shorturl`)) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
INSERT INTO `urltable` (`shorturl`, `longurl`) VALUES('test', 'http://luongnv.info');