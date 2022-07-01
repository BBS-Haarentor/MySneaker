# Benutzeranleitung für den Sys-Admin

## Kurzerklärung:

Das Projekt MySneaker ist eine Webapp die in docker läuft.
Die drei Hauptkomponenten sind:
- die Datenbank (in docker-compose service "db")
- die API (in docker-compose service "api")
- das Frontend (in docker-compose service "frontend")

Die Datenbank ist eine PostgreSQL-Instanz
Die API ist in FastAPI in Python geschrieben
Das Frontend ist ein React (javascript) Single-Page App

Das Projekt soll über die docker-compose gestartet werden.
```
docker-compose up
```

Die folgenden Datein sind relevant für das Starten der App:
- docker-compose.yml    relevant für: Volumes, Proxy und Netzwerk
- .env                  relevant für: Secret-Keys, Netzwerk


## Datenbank

### Parameter
#### docker-compose.yml

##### volume

Die Datenbank wird mit dem persistenten Volume "postgres_data_storage:/var/lib/postgresql/data/" gestartet.
**postgres_data_storage** ist der volume-name und **/var/lib/postgresql/data/** ist der Pfad im Host-System.
Dieser Pfad ist ggf. anzupassen wenn sich die Datenbank in einem anderen Verzeichnis befinden soll.


