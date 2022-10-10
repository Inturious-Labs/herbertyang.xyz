Title: Basic PostgreSQL Commands
Date: 2017-05-25 08:00
Tags: postgresql
Category: Tech 
Slug: basic-postgresql-commands
Summary: We use MySQL for [Linkqlo app](https://itunes.apple.com/us/app/linkqlo-social-network-of-fashion-for-him-and-her/id957167717?mt=8) as that was part of the good old stack of PHP-MySQL chosen by the IT vendor we worked with. In 2015~2016 as we gradually refactored PHP endpoints into Haskell, we started running into various issues of MySQL since some of its libraries didn't work well with Haskell or our deployment script. Eventually they were all fixed, but it was a big hassle. For our new [Mirror Mirror app](https://itunes.apple.com/nl/app/apple-store/id1135966659?mt=8), since it was built from scratch, we chose a stack that would fully leverage our technical capability - **Haskell** for endpoints, **React-Native** for front-end, **PostgreSQL** for database, and **Nix** for deployment.

We use MySQL for [Linkqlo app](https://itunes.apple.com/us/app/linkqlo-social-network-of-fashion-for-him-and-her/id957167717?mt=8) as that was part of the good old stack of PHP-MySQL chosen by the IT vendor we worked with. In 2015~2016 as we gradually refactored PHP endpoints into Haskell, we started running into various issues of MySQL since some of its libraries didn't work well with Haskell or our deployment script. Eventually they were all fixed, but it was a big hassle. For our new [Mirror Mirror app](https://itunes.apple.com/nl/app/apple-store/id1135966659?mt=8), since it was built from scratch, we chose a stack that would fully leverage our technical capability - **Haskell** for endpoints, **React-Native** for front-end, **PostgreSQL** for database, and **Nix** for deployment.

Just as I was getting comfortable with MySQL, I had to pick up PostgreSQL too. Fortunately, they're rather similar. 

List all databases

```
psql -l
```

Connect to the database `xxxdb`

```
psql xxxdb
```

List all tables in the current database

```
\dt
```

Describe this table `xxxtable`

```
\d xxxtable
```

Show entries from this table with select command based on column `name_id` or `name`

```
select * from xxxtable where name_id=555;
select * from xxxtable where name like 'starlord';
```

Begin a transaction block

```
begin;
```

Update column `description` of table `xxxtable`

```
update xxxtable set description='Starlord is played by Chris Pratt' where name_id=555;
```

After update, commit the change

```
commit;
```

After update, rollback the change if needed to abort the current transaction

```
rollback;
```

Escape single `'` by doubling it as in `''`, as explained in this [Stack Overflow post](http://stackoverflow.com/questions/12316953/insert-text-with-single-quotes-in-postgresql)

Quit from psql

```
\q
```