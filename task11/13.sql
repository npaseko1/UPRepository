USE my_database;
select *
FROM USER
         JOIN POST ON USER.USER_ID=POST.USER_ID
group by POST.USER_ID having count(*) > 3 AND POST.CREATED_AT=current_date();