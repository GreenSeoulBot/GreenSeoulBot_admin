from sqlalchemy.orm import Session
from db import models, schemas


# 데이터 생성하기
def create_policy(db: Session, district_name: str, contents: str, policy: schemas.PolicyCreate):
    db_policy = models.Policy(district_name=district_name, contents=contents)
    db.add(db_policy)
    db.commit() 
    db.refresh(db_policy) 
    return db_policy

def update_policy(db: Session, district_name: str, policy_update: schemas.PolicyUpdate):
    db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
    if db_policy is None:
        return None
    if policy_update.district_name is not None:
        db_policy.district_name = policy_update.district_name
    if policy_update.contents is not None:
        db_policy.contents = policy_update.contents

    db.commit()
    db.refresh(db_policy)
    return db_policy

def update_policy_content(db: Session, new_district_name: str, new_contents: str):

    # db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
    
    # if db_policy is None:
    #     return None
    db_policy.district_name = new_district_name
    db_policy.contents = new_contents
    db.commit()  
    db.refresh(db_policy) 
    
    return db_policy



# 데이터 읽기 - 여러 항목 읽어오기
def get_policies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Policy).offset(skip).limit(limit).all()

def delete_policy(db: Session, district_name: str):
    db_policy = db.query(models.Policy).filter(models.Policy.district_name == district_name).first()
    if db_policy is None:
        return None
    db.delete(db_policy)
    db.commit()
    return db_policy