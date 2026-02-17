
from fastapi import APIRouter
from dotenv import load_dotenv
import os
from openai import OpenAI
from sqlalchemy import select
from db import SessionLocal
from pydantic import BaseModel
from models import topics

class ChatRequest(BaseModel):
    section_id: int
    prompt: str

router = APIRouter()
load_dotenv()

api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)

@router.post("/chatresponse")
def chat_response(data: ChatRequest):
    print(data)
    
    db = SessionLocal()
    result = db.execute(select(topics).where(topics.c.section_id == data.section_id)).fetchall()
    db.close()
    topic_texts = [r._mapping['content'] for r in result]

    enhanced_prompt = f"""
You are a helpful assistant. Analyze the section data below and answer the user's question based on it.
Do not ignore context — use the data intelligently.
No need of mentioning anything like "Based on the section data provided", answer is if the assistant is answering.

SECTION DATA:
{topic_texts}

USER QUESTION:
{data.prompt}
"""

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": enhanced_prompt}
        ],
        max_tokens=300
    )

    return {
        "response": completion.choices[0].message.content
    }
    