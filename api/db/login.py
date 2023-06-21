from datetime import datetime, timedelta
from dotenv import dotenv_values

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
import hashlib

from . import models, schemas, userFunctions

env = dotenv_values(".env")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def hashPassword(password: str):
    hashedPassword = hashlib.sha256(str(password).encode('utf-8'))
    return hashedPassword.hexdigest()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=int(env["KEY_DURATION"]))
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, env["SECRET_KEY"], algorithm=env["ALGORITHM"])
    return encoded_jwt

def authenticateUser(db: Session, user: schemas.UserCreate):
    result = db.query(models.User).filter(models.User.username == user.username).first()
    
    hashedPassword = hashPassword(user.password)
    if result and hashedPassword == result.password:
        token = create_access_token({"name": user.username})
        return token
    else:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

async def get_current_user(db: Session, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
    )

    try:
        payload = jwt.decode(token, env["SECRET_KEY"], algorithm=env["ALGORITHM"])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = models.TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = userFunctions.get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception

    return user