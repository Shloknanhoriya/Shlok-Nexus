from dotenv import load_dotenv
import os

load_dotenv()
print("API KEY LOADED:", os.getenv("OPENAI_API_KEY"))
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

from openai import OpenAI


# -----------------------------
# NVIDIA CLIENT
# -----------------------------

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("OPENAI_API_KEY")
)


# -----------------------------
# FASTAPI
# -----------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# EMBEDDINGS
# -----------------------------

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# -----------------------------
# VECTOR DATABASE
# -----------------------------

db = Chroma(
    persist_directory="./vector_db",
    embedding_function=embeddings
)

retriever = db.as_retriever(search_kwargs={"k": 2})


# -----------------------------
# REQUEST MODEL
# -----------------------------

class Question(BaseModel):
    question: str


# -----------------------------
# HELPER
# -----------------------------

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# -----------------------------
# API ENDPOINT
# -----------------------------

@app.post("/chat")
async def chat(q: Question):

    try:
        docs = retriever.invoke(q.question)
        context = format_docs(docs)

        response = client.chat.completions.create(
            model="microsoft/phi-3-mini-4k-instruct",
            messages=[
                {
            "role": "system",
            "content": """
You are Shlok's AI assistant.

You only answer questions about Shlok Nanhoriya.

Important information about Shlok:
- Shlok Nanhoriya is a BTech Computer Science student from India currently in his 6th semester.
- He is passionate about Artificial Intelligence, Machine Learning, and software engineering.
- He is working on projects in AI/ML, computer vision, and intelligent systems.
- He also holds a Prabhakar degree in music and works on singing and music composition.

Rules:
- When describing Shlok, always mention in this order:
  1) BTech Computer Science student
  2) Professional interests (AI/ML, software development)
  3) Music background

- Answer in 1–2 concise sentences.
- Always complete the sentence.
- If the question is unrelated to Shlok, reply:
"I can only answer questions about Shlok's skills, projects, education, or experience."
"""
        },
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion:\n{q.question}"}
            ],
            max_tokens=108,
            temperature=0.2
        )

        return {"answer": response.choices[0].message.content}

    except Exception as e:
        print("ERROR:", e)
        return {"answer": "Error occurred"}