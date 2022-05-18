from fastapi.testclient import TestClient

from app.entrypoint import api

test_client = TestClient(api)


def test_create_user():
    response = test_client.post("/api/user/create")
    
    raise NotImplementedError