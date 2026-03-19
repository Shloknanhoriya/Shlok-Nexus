from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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
# LOAD RAG DATA AS CONTEXT
# -----------------------------

def load_context():
    folder = "rag-data"
    texts = []
    for file in os.listdir(folder):
        filepath = os.path.join(folder, file)
        with open(filepath, "r", encoding="utf-8") as f:
            texts.append(f.read())
    return "\n\n".join(texts)

CONTEXT = load_context()


# -----------------------------
# REQUEST MODEL
# -----------------------------

class Question(BaseModel):
    question: str


# -----------------------------
# API ENDPOINT
# -----------------------------

@app.post("/chat")
async def chat(q: Question):

    try:
        response = client.chat.completions.create(
            model="microsoft/phi-3-mini-4k-instruct",
            messages=[
                {
                    "role": "system",
                    "content": f"""
You are Shlok's AI assistant.

You only answer questions about Shlok Nanhoriya.

Important information about Shlok:
- Shlok Nanhoriya is a BTech Computer Science student from India currently in his 6th semester.
- He is passionate about Artificial Intelligence, Machine Learning, and software engineering.
- He is working on projects in AI/ML, computer vision, and intelligent systems.
- He also holds a Prabhakar degree in music and works on singing and music composition.

Here is detailed information about Shlok:
{CONTEXT}

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
                {"role": "user", "content": q.question}
            ],
            max_tokens=108,
            temperature=0.2
        )

        return {"answer": response.choices[0].message.content}

    except Exception as e:
        print("ERROR:", e)
        return {"answer": "Error occurred"}