CREATE DATABASE ng_contacts_db;

USE ng_contacts_db;

CREATE TABLE contacts(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(180) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    phoneNumber INT(9) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE contacts;