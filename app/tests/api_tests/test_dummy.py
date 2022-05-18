from fastapi.testclient import TestClient

from app.entrypoint import api

test_client = TestClient(api)


def test_create_dummy():
    response = test_client.get("/")
    
    raise NotImplementedError