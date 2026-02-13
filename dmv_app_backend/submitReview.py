from pydantic import BaseModel, Field
from datetime import date
from fastapi import APIRouter
from db import SessionLocal
from models import reviews


router = APIRouter()

class ReviewIn(BaseModel):
    name: str
    visit_type: str 
    test_date: date
    dmv_location: str
    satisfied_count: int = Field(..., ge=1, le=5)
    experience: str

@router.post("/reviews")
def create_review(review: ReviewIn):
    db = SessionLocal()
    try:
        db.execute(
            reviews.insert().values(
                name=review.name,
                visit_type=review.visit_type,
                test_date=review.test_date,
                dmv_location=review.dmv_location,
                satisfied_count=review.satisfied_count,
                experience=review.experience
            )
        )
        db.commit()
    finally:
        db.close()
    return {"status": "success", "message": "Review submitted"}
