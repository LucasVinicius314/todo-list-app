drop database if exists todolist;
create database todolist;
use todolist;

drop table if exists user;
create table user (
  id int unsigned not null auto_increment primary key,
  name varchar(20) not null,
  email varchar(100) not null unique,
  password char(40) not null
) engine=InnoDB;

drop table if exists todo;
create table todo (
  id int unsigned not null auto_increment primary key,
  title varchar(30) not null,
  text text not null,
  favorite enum('true', 'false') not null default 'false',
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
) engine=InnoDB;

insert into user (name, email, password) values ('User', 'user@user.com', sha1('1234'));
insert into todo (title, text, user_id) values ('Thing', 'I must do the thing', 1);
insert into todo (title, text, user_id) values ('Another thing', 'Dont forget to do the other thing. Yes. That one.', 1);
insert into todo (title, text, user_id) values ('How far does this go?', 'Joe. Joe is not welcome here, for he does not wash his toes on saturdays. How dare him.', 1);

select * from user;
select * from todo;
