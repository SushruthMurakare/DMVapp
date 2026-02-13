import openai
from sqlalchemy import select, update
from db import SessionLocal
from models import topics
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)

db = SessionLocal()
results = db.execute(select(topics)).fetchall()

for r in results:
    content = r._mapping['content']
    title = r._mapping['title']
    res = client.embeddings.create(input=f"{title}\n\n{content}", model="text-embedding-3-small")
    emb = res.data[0].embedding
    
    db.execute(
        update(topics)
        .where(topics.c.id == r._mapping['id'])
        .values(embedding=emb)
    )

db.commit()
db.close()
