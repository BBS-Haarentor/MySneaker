# MySneaker backup

# create 
run the following command:
```

docker exec -t mysneaker_db_1 pg_dumpall -c -U mysneaker > mysneaker_backup_`date +%d-%m-%Y"_"%H_%M_%S`.sql

```

# restore 
delete the volume with:
```

docker volume rm <volume_name/id>

``` 

make sure that the DB is not initialized via the startup hook in app/entrypoint.py


restore with:
``` 

cat <dump_file> | docker exec -i mysneaker_db_1 psql -U mysneaker -d foo

``` 

