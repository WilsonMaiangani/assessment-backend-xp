drop database if exists Test_;
create database Test_
default character set utf8
default collate utf8_general_ci;

use Test_;


#============= Table Category ============= #

drop table if exists `Category`;

create table if not exists Category(
id 	  int not null primary key auto_increment ,
name  nvarchar(100) not null ,
code  nvarchar(100) not null 
) default charset = utf8;

#============= Tabela Imagem ============= #

drop table if exists `Imagem`;

create table if not exists Imagem(
id 	  int not null primary key auto_increment ,
name longtext not null,
path  longtext not null
) default charset = utf8;

#============= Table Product ============= #

drop table if exists `Product`;

create table if not exists Product(
id 	  int not null primary key auto_increment ,
idCategory int ,
idImg int ,
name  nvarchar(100) not null ,
sku  nvarchar(100) not null ,
quantity int not null ,
price  float not null ,
description  nvarchar(100) not null ,
foreign key (idCategory) references Category (id),
foreign key (idImg) references Imagem (id)
) default charset = utf8;