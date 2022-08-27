# alembic migration


# howTo

1. update system
2. backup the db -> see mysneaker_backup.md
2. run the following command:
```

docker-compose exec api alembic upgrade head

``` 
# revision history:


# revision_0 (init)
docker-compose exec api alembic revision --autogenerate -m "init"


# revision_1 (stock_tender_data_add)
docker-compose exec api alembic revision --autogenerate -m "stock_tender_data_add"