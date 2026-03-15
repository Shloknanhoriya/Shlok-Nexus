from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

documents = []

folder = "rag-data"

for file in os.listdir(folder):
    loader = TextLoader(os.path.join(folder, file))
    documents.extend(loader.load())

text_splitter = CharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

docs = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = Chroma.from_documents(
    docs,
    embeddings,
    persist_directory="./vector_db"
)

db.persist()

print("Vector database created successfully!")