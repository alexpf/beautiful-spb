create database beautiful_spb CHARACTER SET utf8 COLLATE utf8_unicode_ci;;

use beautiful_spb;

create table issue (
  id integer,
  external_id integer,
  raw_id bigint,
  category varchar(255),
  sub_category varchar(255),
  name varchar(1024),
  district varchar(255),
  mo varchar(255),
  latitude double,
  longitude double,
  author_id varchar(255),
  author varchar(255),
  status varchar(1024),
  status_id integer,
  raised_date varchar(255),
  last_updated_date varchar(255),
  primary key (id))
  default charset=utf8;

load data local infile '/problems_20171003-20181003_no_first_line.csv'
into table issue
character set utf8
fields terminated by ',' enclosed by '"'
lines terminated by '\n'
(id, external_id, raw_id, category, sub_category, name, district, mo, latitude, longitude,
 author_id, author, status, status_id, raised_date, last_updated_date);
