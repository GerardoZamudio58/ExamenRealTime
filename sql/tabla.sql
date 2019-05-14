CREATE DATABASE Examen;
USE Examen;

CREATE TABLE Usuario(
	idUsuaior INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apPaterno VARCHAR(50),
    apMaterno VARCHAR(50),
    correo VARCHAR(50),
    edad INT
);

insert into Usuario(nombre, apPaterno, apMaterno, correo, edad) values ('Lisandro', 'De los Santos', 'Martínez', 'lisann.mtz@gmail.com', 23);