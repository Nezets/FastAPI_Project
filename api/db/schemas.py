from typing import Union

from sqlalchemy.orm import base

from pydantic import BaseModel
from datetime import date

class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    
    is_active: bool

    class Config:
        orm_mode = True
        
        
class Employee(BaseModel):
    email : str
    firstName: str
    lastName: str
    dob: date
    skillLevel: str
    active: bool
    age: int
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str


class TokenData(BaseModel):
    username: str | None = None