from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



def hash_pw(unhashed_pw: str):
    return pwd_context.hash(unhashed_pw)
