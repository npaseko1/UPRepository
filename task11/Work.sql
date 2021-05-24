DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
                        `POST_ID` int NOT NULL AUTO_INCREMENT,
                        `USER_ID` int NOT NULL,
                        `DESCRIPTION` varchar(200) DEFAULT NULL,
                        `CREATED_AT` date DEFAULT NULL,
                        KEY `USER_ID` (`USER_ID`),
                        CONSTRAINT `post_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `post` WRITE;
INSERT INTO `post` VALUES (1,1,'Hi, it is my first post','2020-01-12','',2),(2,1,'Hi, it is my first post','2020-05-18','link',2),(3,2,'Today is a raibow!','2020-03-11','',2),(4,2,'I will go to the sea','2019-11-11','',2),(5,1,'I am afraid of ghosts','2020-05-18','link',5),(6,3,'my dinner','2020-01-12','',2),(7,4,'love you, my sun and stars','2020-01-12','',2),(8,5,'many many years ago...','2020-05-18','link',0),(9,6,'Hi, it is my first post','2020-01-12','',2),(10,1,'Do not like washing','2020-01-12','',2),(11,1,'hello world','2020-01-12','',2);
UNLOCK TABLES;

DROP TABLE IF EXISTS `posttags`;

CREATE TABLE `posttags` (
                            `ID` int NOT NULL,
                            `POST_ID` int DEFAULT NULL,
                            `TAG_ID` int DEFAULT NULL,
                            PRIMARY KEY (`ID`),
                            KEY `POST_ID` (`POST_ID`),
                            KEY `TAG_ID` (`TAG_ID`),
                            CONSTRAINT `posttags_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `post` (`POST_ID`),
                            CONSTRAINT `posttags_ibfk_2` FOREIGN KEY (`TAG_ID`) REFERENCES `tags` (`TAG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `posttags` WRITE;

INSERT INTO `posttags` VALUES (1,1,3),(2,1,4),(3,2,2),(4,2,1),(5,3,2);

UNLOCK TABLES;

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
                        `TAG_ID` int NOT NULL AUTO_INCREMENT,
                        `TEXT` varchar(100) DEFAULT NULL,
                        PRIMARY KEY (`TAG_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tags` WRITE;

INSERT INTO `tags` VALUES (1,'hello'),(2,'love'),(3,'happy'),(4,'grass');
UNLOCK TABLES;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
                        `USER_ID` int NOT NULL,
                        `NAME` varchar(30) DEFAULT NULL,
                        PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;

INSERT INTO `user` VALUES (1,'Nadia'),(2,'Alena'),(3,'Anna'),(4,'Sasha'),(5,'Nastya'),(6,'Maksim'),(7,'Polina'),(8,'Gleb'),(9,'Kirill'),(10,'Egor');

UNLOCK TABLES;
