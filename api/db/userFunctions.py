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

def update_user(db: Session, user_id: int, newName: str, active: bool):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user:
        user.username = newName
        user.is_active = active

        db.add(user)
        db.commit()

    return user

def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user:
        db.delete(user)
        db.commit()
    return user