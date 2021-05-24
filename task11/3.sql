USE my_database;
select USER_ID , count(*)
from POST WHERE date (POST.CREATED_AT) = '2021-03-01'
group by USER_ID;