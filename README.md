# API backend for the MySneaker Project

This project uses FastAPI with a Postgres-docker-container as permanent storage solution. 

## Project structure

## Setup

Please note that this code works only with a python3.10 interpreter

### dev-version (sqlite as db)

set up a virtual environment (venv)

```

{path_to_python_interpreter} -m venv venv_dir

```

#### activate on Windows (bash):

```

source venv_dir/Scripts/activate

```

#### activate on linux:

```

source venv_dir/bin/activate

```

#### install requirements:

```

pip install -r requirements.txt

```

#### start up uvicorn with the following command (you find the same command in the docker-compose.yml)

You are supplying the uvicorn-program installed via the requirements.txt with the entrypoint FastAPI-object (api:FastAPI)

```

uvicorn app.entrypoint:api --host 0.0.0.0

```

  

The API is now available via localhost:8000

For the automatically generated Swagger docs visit localhost:8000/docs

### docker-version (postgres as db)

make sure the engine-object in session.py is correctly set for postgres interaction

```
docker-compose up -d
```

This should start the respective docker containers for the API and the postgres database

The API is now available via localhost:8008

Note that the port changes compared to directly starting with sqlite
  
  
  

## Test accounts in sqlitedb

  
id: 1
login: teacher
pw: teacher

  
id: 2
login: admin
pw: admin

  
  

valid game_create body:

{

  "grade_name": "FA1A-B",

  "owner_id": 2,

  "scenario_order": "NEWORDER"

}