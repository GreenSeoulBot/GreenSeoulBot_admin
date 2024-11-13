from sqlalchemy import Column, String, TEXT, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Admin(Base):
    __tablename__ = "admin"

    id = Column(String(15), nullable=False, primary_key=True) 
    password = Column(String(30), nullable=False) 

class Policy(Base):
    __tablename__ = "policy"

    district_name = Column(String(5), nullable=False, primary_key=True)
    contents = Column(TEXT, nullable=False)
