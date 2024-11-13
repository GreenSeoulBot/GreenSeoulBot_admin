from sqlalchemy.orm import Session
from db import models, schemas


# 데이터 생성하기
def create_policy(db: Session, policy: schemas.PolicyCreate):

    # SQLAlchemy 모델 인스턴스 만들기
    db_policy = models.Policy(district_name=policy.district_name, contents=policy.contents)
    db.add(db_policy)  # DB에 해당 인스턴스 추가하기
    db.commit()  # DB의 변경 사항 저장하기
    db.refresh(db_policy)  # 생성된 ID와 같은 DB의 새 데이터를 포함하도록 새로고침
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