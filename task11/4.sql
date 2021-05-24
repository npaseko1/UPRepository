USE my_database;
select USER_ID, NAME
from USER WHERE USER_ID in (
    SELECT USER_ID FROM POST
    GROUP BY USER_ID having count(*) > 3);