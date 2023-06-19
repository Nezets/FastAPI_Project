from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)
    
class Employee(Base):
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String)
    lastName = Column(String)
    dob = Column(Date)
    email = Column(String)
    skillLevel = Column(Integer)
    active = Column(Boolean)
    age = Column(Integer)

    
