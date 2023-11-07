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
#delete from user where id = 2;

# delete from user where id >=2;

## with 구문으로 alias 생성 및 조합하여 표현가능
-- with
-- cte1 as (select * from board),
-- cte2 as (select id from user)
-- select * from cte1 join cte2 where cte1.author = cte2.id;

## recursive는 임의 테이블 생성해서 표현식 작동
-- with recursive time as (
--   select 0 as hour
--   union all
--   select hour + 1
--   from time
--   where hour < 23
-- ) select time.hour from time;