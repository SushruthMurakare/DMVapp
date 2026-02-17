# models.py
from sqlalchemy import Table, Column, Integer, String, Text, ForeignKey, JSON, MetaData, Date
from pgvector.sqlalchemy import Vector

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
    Column("order_number", Integer),
    Column("summary", String)
)

topics = Table(
    "topics",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("section_id", Integer, ForeignKey("sections.id")),
    Column("title", String, nullable=False),
    Column("content", Text, nullable=False),
    Column("order_number", Integer),
    Column("embedding", Vector)
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

reviews = Table(
    "reviews",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("visit_type", String, nullable=False),
    Column("test_date", Date, nullable=False),
    Column("dmv_location", String, nullable=False),
    Column("satisfied_count", Integer, nullable=False),
    Column("experience", Text, nullable=False),
    Column("created_at", Date, nullable=False)
)