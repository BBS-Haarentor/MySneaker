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
  "name": "Timmy",
  "game_id": 3,
  "unhashed_pw": "berrysecurepw"
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
  "name": "Grünkohl",
  "unhashed_pw": "teachy"
}
```

### example body Game

#### POST Game

route: /api/v1/game/create

schema: GameCreate

```
{
    'grade_name': 'FA1A-B',
    'owner_id': 2,
    'scenario_order': 'ABDCDCDC'
}
```
