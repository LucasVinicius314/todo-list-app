drop database if exists todolist;
create database todolist;
use todolist;

drop table if exists user;
create table user (
  id int unsigned not null auto_increment primary key,
  name varchar(20) not null,
  email varchar(100) not null,
  password char(40) not null
) engine=InnoDB;

insert into user values (null, 'Sure', 'sure@sure.com', sha1('1234'));

select * from user;