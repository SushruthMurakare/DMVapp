from fastapi import FastAPI
from sqlalchemy import select
from db import SessionLocal
from models import topics
from openai import OpenAI
import numpy as np
from dotenv import load_dotenv
import os
from fastapi import APIRouter

router = APIRouter()

app = FastAPI()
load_dotenv()

api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

@router.get("/sections/{section_id}/summary")
def summarize_section(section_id: int, query: str = "summarize"):
    db = SessionLocal()
    results = db.execute(select(topics).where(topics.c.section_id == section_id)).fetchall()
    
    # get all topic texts and embeddings
    topic_texts = [r._mapping['content'] for r in results]
    embeddings = [r._mapping['embedding'] for r in results]
    
    # optional: simple RAG selection (closest topic to query)
    res = client.embeddings.create(input=query, model="text-embedding-3-small")
    query_emb = res.data[0].embedding
    similarities = [cosine_similarity(np.array(query_emb), np.array(e)) for e in embeddings]
    top_index = np.argmax(similarities)
    context = topic_texts[top_index]
    
    # call OpenAI to summarize
    prompt = f"Summarize this in detail for someone learning to drive:\n\n{context}"
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300
    )
    summary_text = completion.choices[0].message.content
    
    
    db.close()
    return {"summary": summary_text}
