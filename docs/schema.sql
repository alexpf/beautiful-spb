create database beautiful_spb CHARACTER SET utf8 COLLATE utf8_unicode_ci;;

use beautiful_spb;

create table issues (
  id integer,
  category varchar(255),
  sub_category varchar(255),
  name varchar(1024),
  district varchar(255),
  mo varchar(255),
  latitude double,
  longitude double,
  raised_date varchar(255),
  status varchar(255),
  primary key (id)) default charset=utf8;

load data local infile '/problems_20171003-20181003_edited.csv' into table issues character set utf8 fields terminated by ',' enclosed by '"' lines terminated by '\n' (id, category, sub_category, name, district, mo, latitude, longitude, status, raised_date);
