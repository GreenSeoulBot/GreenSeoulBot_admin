from pydantic import BaseModel
from typing import Optional

class PolicyBase(BaseModel):
    district_name: str
    contents: str

class PolicyCreate(PolicyBase):
    pass

class Policy(PolicyBase):
    class Config:
        orm_mode = True

class PolicyUpdate(BaseModel):
    district_name: Optional[str] = None
    contents: Optional[str] = None