from PIL import Image
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from db.database import engineconn
from db.models import Admin
from db.models import Policy
from db import models, schemas
import crud
from typing import List 


app = FastAPI()

engine = engineconn()
session = engine.sessionmaker()

def get_db():
    db = engine.sessionmaker()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"} # 홈을 따로 만들까요?

@app.get("/login")
async def login_page():
    return "login_page"

# admin 로그인 
@app.post("/login")
async def login_info():
    try:
        admin_example = session.query(Admin).first()

        result = {
            "status": "success",
            "admin": {
                "id": admin_example.id if admin_example else None,
                "password": admin_example.password if admin_example else None
            }
        }
        
        return result
    except Exception as e:
        return {"status": "failed", "error": str(e)}

    print(result[0][0])

@app.get("/board", response_model=List[schemas.Policy])
async def show_board(skip: int=0, limit: int = 100, db: session = Depends(get_db)):
    policies = crud.get_policies(db=db, skip=skip, limit=limit)
    return policies

@app.get("/board/get/{district_name}", response_model=schemas.Policy)
async def policy(district_name: str, db: session = Depends(get_db)):
    db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy

@app.patch("/board/update/{district_name}", response_model=schemas.Policy)
async def update_policy(district_name: str, policy_update: schemas.PolicyUpdate, db: session = Depends(get_db)):
    db_policy = crud.update_policy(db=db, district_name=district_name, policy_update=policy_update)
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy


@app.delete("/board/delete/{district_name}", response_model=schemas.Policy)
async def delete_policy(district_name: str, db: session = Depends(get_db)):
    db_policy = crud.delete_policy(db=db, district_name=district_name)
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy

@app.post("/board/create/{district_name}", response_model=schemas.Policy)
async def create_policy(policy: schemas.PolicyCreate, db: session = Depends(get_db)):
    db_policy = crud.create_policy(db=db, policy=policy)
    if db_policy is None:
        raise HTTPException(status_code=400, detail="Failed to create policy")
    return db_policy