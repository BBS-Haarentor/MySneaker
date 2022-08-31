# alembic migration


# howTo

1. update system
2. backup the db -> see mysneaker_backup.md
2. run the following command:
```

docker-compose exec api alembic upgrade head

``` 
# revision history:


# revision_0 (init) -> bea9df226f6c
docker-compose exec api alembic revision --autogenerate -m "init"


# revision_1 (1_stock_tender_data_add) -> 9ab3b6744458
docker-compose exec api alembic revision --autogenerate -m "1_stock_tender_data_add"


# revision_2 (2_scenario_employee_toggle) -> 14fcbc928ce6
docker-compose exec api alembic revision --autogenerate -m "2_scenario_employee_toggle"


# revision_3 (3_stock_creation_date_type) -> 1ba9ec091197
docker-compose exec api alembic revision --autogenerate -m "3_stock_creation_date_type"


# revision_4 (4_stock_creation_date_value)
docker-compose exec api alembic revision --autogenerate -m "4_stock_creation_date_value"
