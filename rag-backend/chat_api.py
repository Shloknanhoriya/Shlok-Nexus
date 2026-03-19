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
                    "content": f"""You are Shlok's AI assistant. Answer ONLY using the information provided below. Do NOT use any outside knowledge.
 
===== SHLOK'S INFORMATION =====
{CONTEXT}
================================
 
Rules:
- Answer ONLY from the information above.
- If the answer is not in the information above, say: "I don't have that information about Shlok."
- If the question is unrelated to Shlok, say: "I can only answer questions about Shlok's skills, projects, education, or experience."
- Keep answers concise, 1-3 sentences.
- Always complete your sentence."""
                },
                {"role": "user", "content": q.question}
            ],
            max_tokens=512,
            temperature=0.1
        )

        return {"answer": response.choices[0].message.content}

    except Exception as e:
        print("ERROR:", e)
        return {"answer": "Error occurred"}