from sqlalchemy.orm import Session

from . import login, models, schemas
from datetime import date

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