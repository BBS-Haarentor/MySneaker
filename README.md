
# My-Sneaker

My-Sneaker ist ein Wirtschafst Plan spiel der BBS-Haarentor welchen die elften Klassen
der BBS zum anfang des Jahre spielen um ein grundlegendes verspändnis der wirtschaft zu 
erlangen

## Deployment mit Docker-Compose

Installien sie [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/).

Laden sie sich das Projetct runter und öfnen sie den Ordner im Terminal.
Führen sie folgenden Befehl aus

```bash
  docker-compose up -d
```


## Lokales Deployment ohne Docker (dev-version)

### Frontend

Installien sie [npm]()

Laden sie sich das Projetct runter und öfnen sie den Ordner im Terminal.
Führen sie folgende Befehle aus

```bash
    cd ./mysneaker/
    npm install
    npm start 
```
### Backend

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


## Authors

### Frontend
- [@Optischa](https://github.com/Optischa)
- [@Sabberkopf](https://github.com/Sabberkopf)
### Backend 
- [@WetStaplerWithPeas](https://github.com/WetStaplerWithPeas)
### Rechnungen
- [@JakobGrimm](https://github.com/JakobGrimm)

## License

[MIT](https://choosealicense.com/licenses/mit/)

