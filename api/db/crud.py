from sqlalchemy.orm import Session

from . import login, models, schemas
from datetime import date


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

def create_employee(db: Session, employee: schemas.Employee):
    employee = models.Employee(firstName=employee.firstName, lastName=employee.lastName, dob=employee.dob, email=employee.email, skillLevel=employee.skillLevel, active=employee.active, age=employee.age)
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def get_employees(db: Session):
    employees = db.query(models.Employee).all()
    return employees

def get_employee(db: Session, employee_id: int):
    employee = db.query(models.User).filter(models.Employee.id == employee_id).first()
    return employee

def update_employee(db: Session, employee_id: int, employee: schemas.Employee):
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    update_data = employee.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_employee, key, value)

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return db_employee

def delete_employee(db: Session, employee_id: int):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    if employee:
        db.delete(employee)
        db.commit()

    return employee