from sqlalchemy.orm import Session

from . import login, models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session):
    return db.query(models.User).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashedPassword = login.hashPassword(user.password)
    db_user = models.User(username=user.username, password=hashedPassword)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int,  user: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if db_user:
        db_user.username = user.username
        db_user.is_active = user.is_active

        db.add(db_user)
        db.commit()

    return db_user

def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user:
        db.delete(user)
        db.commit()
    return user