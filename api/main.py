from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from db import  login, models, schemas, employeeFunctions, userFunctions
from db.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User, status_code=201)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = userFunctions.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered.")
    return userFunctions.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User], status_code=200)
def read_users(db: Session = Depends(get_db)):
    users = userFunctions.get_users(db)
    return users

@app.get("/users/{user_id}", response_model=schemas.User, status_code=200)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = userFunctions.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found,")
    return db_user

@app.put("/users/{user_id}")
def update_user(user_id: int, body: dict, db: Session = Depends(get_db), status_code=200):
    db_user = userFunctions.get_user(db, user_id)

    if db_user:
        user = userFunctions.update_user( db, body['id'], body['username'], body['is_active'])
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found.")
    

@app.delete("/users/{user_id}", status_code=200)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = userFunctions.delete_user(db, user_id)
    return user

@app.post("/login/", status_code=200)
def login_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    result = login.authenticateUser(db, user)
    if result:
        return result
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password.")

@app.get("/employees/")
def get_employees(db: Session = Depends(get_db)):
    employees = employeeFunctions.get_employees(db)
    return employees

@app.get("/employees/{employee_id}", response_model=schemas.Employee, status_code=200)
def read_user(employee_id: int, db: Session = Depends(get_db)):
    employee = employeeFunctions.get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found.")
    return employee

@app.post("/employees/", response_model=schemas.Employee, status_code=201)
def create_employee(employee: schemas.Employee, db: Session = Depends(get_db)):
    employee = employeeFunctions.create_employee(db, employee)
    return employee

@app.put("/employees/{employee_id}", status_code=200)
def update_employee(employee_id: int, employee: schemas.Employee, db: Session = Depends(get_db)):
    employee = employeeFunctions.update_employee(db, employee_id, employee)
    return employee

@app.delete("/employees/{employee_id}", status_code=200)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = employeeFunctions.delete_employee(db, employee_id)
    return employee