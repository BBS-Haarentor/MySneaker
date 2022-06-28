# Technical documentation and setup instructions for developers



## Flow of information 

### Step-By-Step

1. create Admin user with API-Header authentication

2. login as admin and create teacher

3. teacher creates game

4. student accounts sign up via the game_id

5. students create a new cycle entry

6. teacher turns game over to the next cycle

7. repeat from step (5) until last cycle reached





## Example request bodies

OpenAPI/Swagger docs can be found at localhost:8008/docs (docker) oder localhost:8000/docs (sqlite)
(at the bottom, expand the Schemas)

### example body of Scenario POST

```
{
    'char': 'A',
    'sneaker_price': 20,
    'paint_price': 10,
    'storage_fee_sneaker': 4.00,
    'storage_fee_paint': 1.00,
    'storage_fee_finished_sneaker': 8.00,
    'employee_count_modifier': -2
}
```

### example bodies of User

#### POST Student User

route: /user/create/student
schema: UserPostStudent

example_minimal: 
```
{
  "name": "s1",
  "game_id": 1,
  "unhashed_pw": "s1"
}

```
example_email: 
```
{
  "name": "Tamtam",
  "email": "tam@lol.de",
  "game_id": 5,
  "unhashed_pw": "pw1234"
}
```

#### POST Teacher/Admin User

route: /user/create/teacher
route: /user/create/admin

schema: UserPostElevated

example_minimal: 
```
{
  "name": "teacher",
  "unhashed_pw": "teachy"
}
```

### example body Game

#### POST Game

route: /api/v1/game/create

schema: GameCreate

```
{
    "grade_name": "FA1A-B",
    "owner_id": 1
    "scenario_order": "AAA"
}
```
```
{
  "grade_name": "FA1A-B",
  "scenario_order": "AAA"
}
```


### example body Scenario

```
{
  "char": "A",
  "sneaker_price": 0,
  "paint_price": 0,
  "storage_fee_sneaker": 0,
  "storage_fee_paint": 0,
  "storage_fee_finished_sneaker": 0,
  "employee_count_modifier": 0,
  "factor_interest_rate": 0,
  "employee_salary": 0,
  "machine_purchase_allowed": true,
  "sneaker_ask": 0,
  "factor_ad_take": 0
}
```

### example body Cycle

```
{
  "game_id": 1,
  "current_cycle_index": 0,
  "company_id": 2,
  "buy_sneaker": 100,
  "buy_paint": 200,
  "planned_production_1": 100,
  "planned_production_2": 0,
  "planned_production_3": 0,
  "planned_workers_1": 5,
  "planned_workers_2": 0,
  "planned_workers_3": 0,
  "include_from_stock": 0,
  "sales_planned": 100,
  "sales_bid": 200.00,
  "tender_offer_price": 0.00,
  "research_invest": 1000.00,
  "ad_invest": 0.00,
  "take_credit": 1000.00,
  "payback_credit": 0.00,
  "new_employees": 2,
  "let_go_employees": 0,
  "buy_new_machine": 0,
}
```
                                                                   #sneaker price
### example body2 Cycle

```
{
  "game_id": 1,
  "current_cycle_index": 0,
  "company_id": 2,
  "buy_sneaker": 160,
  "buy_paint": 320,
  "planned_production_1": 160,
  "planned_production_2": 0,
  "planned_production_3": 0,
  "planned_workers_1": 8,
  "planned_workers_2": 0,
  "planned_workers_3": 0,
  "include_from_stock": 0,
  "sales_planned": 160,
  "sales_bid": 130.00,
  "tender_offer_price": 0.00,
  "research_invest": 2500.00,
  "ad_invest": 0.00,
  "take_credit": 0.00,
  "payback_credit": 0.00,
  "new_employees": 0,
  "let_go_employees": 0,
  "buy_new_machine": 0,
}

```

{
  "grade_name": "FA1A-B",
  "owner_id": 1,
  "scenario_order": "AAA"
}

{
  "char": "A"
}

{
  "id": 0,
  "char": "string",
  "sneaker_price": 60,
  "paint_price": 10,
  "storage_fee_sneaker": 4.00,
  "storage_fee_paint": 1.00,
  "storage_fee_finished_sneaker": 8.00,
  "employee_count_modifier_temporary": 0,
  "employee_count_modifier_permanent": 0,
  "factor_interest_rate": 0.04,
  "employee_salary": 400,
  "employee_signup_bonus": 100,
  "employee_production_capacity": 10,
  "employee_cost_modfier": 0.00,
  "machine_purchase_allowed": false,
  "machine_purchase_cost": 1000.00,
  "sneaker_ask": 400,
  "factor_ad_take": 0.1,
  "machine_production_capacity": 200,
  "machine_maintainance_cost": 4000.00,
  "production_cost_per_sneaker": 60.00
}

{
  "name": "s1",
  "game_id": 1,
  "unhashed_pw": "s1"
}

