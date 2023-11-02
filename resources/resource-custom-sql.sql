use `nest-test`;

show tables;
desc board;
desc user;

select * from user where deleted_at is null;

delete from board;
delete from user;

alter table board auto_increment=1;
alter table user auto_increment=2;

select * from board where deleted_at is null;
select * from user;
update user set fail_sign_in_count = 0 where email = 'chaplet01@gmail.com';
delete from user where id = 2;

# delete from user where id >=2;