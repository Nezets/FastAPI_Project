from sqlalchemy.orm import Session
import hashlib

from . import models, schemas

def hashPassword(password: str):
    hashedPassword = hashlib.sha256(str(password).encode('utf-8'))
    return hashedPassword.hexdigest()

def authenticateUser(db: Session, user: schemas.UserCreate):
    result = db.query(models.User).filter(models.User.username == user.username).first()
    
    hashedPassword = hashPassword(user.password)
    if result and hashedPassword == result.password:
        return True
    else:
        return False