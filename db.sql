CREATE DATABASE myfiles;
USE myfiles;

CREATE TABLE Users(id_user int primary key AUTO_INCREMENT not null, name varchar(40) not null, surname varchar(40) not null, email varchar(70) not null unique, password varchar(70) not null, permission int not null);
CREATE TABLE Devices(id_device int primary key AUTO_INCREMENT not null, model varchar(40) not null, brand varchar(40) not null, unique_key varchar(40) not null unique);
CREATE TABLE Files(id_file int primary key AUTO_INCREMENT not null, directory varchar(70) not null, name varchar(40) not null, creation_date date not null, size double not null);
CREATE TABLE Access(id_access int primary key AUTO_INCREMENT not null, id_user int not null, id_device int not null, dateTime datetime not null, foreign key (id_user) references Users(id_user), foreign key (id_device) references Devices(id_device));
CREATE TABLE FileAccess(id_user int not null, id_file int not null, dateTime datetime not null, foreign key (id_user) references Users(id_user), foreign key (id_file) references Files(id_file));

INSERT INTO Users (name, surname, email, password, permission) values ("Mirko", "Olivetti Frè", "mirko.olivetti.f@gmail.com", "testtest", 1);
INSERT INTO Users (name, surname, email, password, permission) values ("test", "test", "mirko.oli.f@gmail.com", "testtest", 2);