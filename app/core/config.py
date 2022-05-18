from dataclasses import dataclass
from enum import IntEnum
from pydantic import BaseSettings


class Settings(BaseSettings):
    MODE: str
    DATABASE_URL_SQLITE: str
    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_HOST: str
    DATABASE_PORT: int
    DATABASE_NAME: str
    USER_VERIFICATION_SECRET: str

    ORIGINS: list

    API_KEY: str
    API_KEY_NAME: str
    COOKIE_DOMAIN: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    ADMIN_USER_NAME: str
    ADMIN_USER_HASHED_PW: str
    
    class Config:
        env_file = '.env'
        case_sensitive = True

ordered_roles = {   "BASE": 1, 
                        "TEACHER": 2, 
                        "ADMIN":3 }


def cls_factory(classname):
    cls = globals()[classname]
    return cls()

class RolesEnums(IntEnum):
    ADMIN = 3
    MANAGER = 2
    NORMAL = 1

    #def __int__(self):
    #    return self.value[0]




SETTINGS = Settings()