# main.py
from fastapi import FastAPI
from sqlalchemy import select
from db import SessionLocal
from models import states, sections, topics, reviews
from summarizeSection import router as summarize_section
from submitReview import router as create_review
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return "Working"
@app.get("/states")
def get_states():
    db = SessionLocal()
    result = db.execute(select(states)).fetchall()
    db.close()
    return [dict(r._mapping) for r in result]

@app.get("/states/{state_id}/sections")
def get_sections(state_id: int):
    db = SessionLocal()
    result = db.execute(select(sections).where(sections.c.state_id == state_id)).fetchall()
    db.close()
    return [dict(r._mapping) for r in result]

@app.get("/sections/{section_id}/topics")
def get_topics(section_id: int):
    db = SessionLocal()
    result = db.execute(select(topics).where(topics.c.section_id == section_id)).fetchall()
    db.close()
    return [dict(r._mapping) for r in result]

@app.get("/reviews")
def get_reviews():
    db = SessionLocal()
    result = db.execute(select(reviews)).fetchall()
    db.close()
    return [dict(r._mapping) for r in result]

@app.get("/section/{id}")
def get_section(id):
    db = SessionLocal()
    result = db.execute(select(sections).where(sections.c.id == id)).fetchall()
    db.close()
    return [dict(r._mapping) for r in result]



app.include_router(summarize_section)
app.include_router(create_review)

