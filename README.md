# API backend for the MySneaker Project

## Setup
Please note that this code works only with a python3.10 interpreter
### sqlite-version
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
uvicorn app.entrypoint:api --host 0.0.0.0:8080
```
### docker-version
make sure the engine-object in session.py is correctly set for postgres interaction
```
docker-compose up -d
```


