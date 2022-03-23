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
    class Config:
        env_file = '.env'
        case_sensitive = True
        
SETTINGS = Settings()