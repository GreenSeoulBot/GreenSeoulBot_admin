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


# 로그인 페이지 (첫 화면)
@app.get("/green-seoul-bot-admin")
async def home():
    return "home"

# 로그인 
@app.post("/green-seoul-bot-admin")
async def login(db: session = Depends(get_db)):
    db_model = models.Admin
    admin_info = db.query(db_model).first() 

    if admin_info:  
        return {
            "id": admin_info.id,
            "password": admin_info.password
        }
    else:
        return {
            "status": "failed",
            "error": "관리자 정보가 존재하지 않습니다."
        }

# 지역구 페이지
@app.get("/green-seoul-bot-admin/districts")
async def districts():
    return "districts"

# 구 선택 > 정책정보 반환 
@app.post("/green-seoul-bot-admin/districts{district_name}")
async def choose_districts(district_name: str, db: session = Depends(get_db)):
    db_model = models.Policy
    policy = db.query(db_model).filter(db_model.district_name == district_name).first()
    
    if policy:
        return policy
    else:
        return {
            "status": "failed",
            "error": "정책 정보를 조회할 수 없습니다."
        }

# 정책 수정 
@app.patch("/green-seoul-bot-admin/districts/update{district_name}", response_model=schemas.Policy)
async def update_policy(district_name: str, policy_update: schemas.PolicyUpdate, db: session = Depends(get_db)):
    db_policy = crud.update_policy(db=db, district_name=district_name, policy_update=policy_update)
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy

# 정책 삭제
@app.delete("/green-seoul-bot-admin/districts/delete{district_name}", response_model=schemas.Policy)
async def delete_policy(district_name: str, db: session = Depends(get_db)):
    db_policy = crud.delete_policy(db=db, district_name=district_name)
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy


# 정책 추가
@app.post("/green-seoul-bot-admin/districts/write{district_name}", response_model=schemas.PolicyCreate)
async def create_policy(district_name: str, contents: str, db: session = Depends(get_db)):
    # Policy 생성
    db_policy = crud.update_policy_content(db=db, new_district_name=district_name, new_contents=contents)
    if db_policy is None:
        raise HTTPException(status_code=400, detail="Failed to create policy")
    return db_policy