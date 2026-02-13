# models.py
from sqlalchemy import Table, Column, Integer, String, Text, ForeignKey, JSON, MetaData

metadata = MetaData()

states = Table(
    "states",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("code", String, nullable=False)
)

sections = Table(
    "sections",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("state_id", Integer, ForeignKey("states.id")),
    Column("title", String, nullable=False),
    Column("order_number", Integer)
)

topics = Table(
    "topics",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("section_id", Integer, ForeignKey("sections.id")),
    Column("title", String, nullable=False),
    Column("content", Text, nullable=False),
    Column("order_number", Integer)
)

questions = Table(
    "questions",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("section_id", Integer, ForeignKey("sections.id")),
    Column("difficulty", String),
    Column("question_text", Text, nullable=False),
    Column("options", JSON, nullable=False),
    Column("correct_answer", String),
    Column("explanation", Text)
)
