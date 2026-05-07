# 📄 Ask My Docs — Production RAG Application

A production-grade Retrieval Augmented Generation (RAG) application that lets users upload any PDF and ask natural language questions. Get grounded, cited answers in seconds — no hallucinations, no copy-pasting.

🔗 **Live Demo:** https://production-rag-eta.vercel.app

---

## ✨ Features

- **Semantic Chunking** — Intelligently splits documents based on meaning, not character count
- **Hybrid Retrieval** — Combines BM25 keyword search + FAISS vector search for maximum recall
- **Cross-Encoder Reranking** — Reorders retrieved chunks by true relevance before answering
- **Citation Enforcement** — Every answer includes page-level source citations
- **Confidence Score** — Real score derived from reranker, not a random number
- **Dark Mode** — Clean light/dark theme toggle
- **Sample Documents** — One-click load of famous AI papers for instant demo

---

## 🏗️ Architecture
User uploads PDF
↓
Semantic Chunking (SemanticChunker + HuggingFace Embeddings)
↓
Hybrid Retrieval (BM25 + FAISS Vector Search)
↓
Cross-Encoder Reranking (ms-marco-MiniLM-L-6-v2)
↓
Groq LLM with Citation Enforcement (llama-3.3-70b)
↓
Answer + Confidence Score + Citations

---

## 🛠️ Tech Stack

### Backend
- **Python** — Core language
- **FastAPI** — REST API server
- **LangChain** — RAG pipeline orchestration
- **FAISS** — Vector database for semantic search
- **BM25** — Keyword-based sparse retrieval
- **HuggingFace Sentence Transformers** — Embeddings
- **Cross-Encoder** — Reranking model
- **Groq** — LLM inference (llama-3.3-70b-versatile)

### Frontend
- **React** — UI framework
- **Vite** — Build tool
- **Axios** — API communication

### Deployment
- **HuggingFace Spaces** — Backend API (Docker)
- **Vercel** — Frontend hosting
- **GitHub** — Version control

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API key (free at https://console.groq.com)

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/anukya01/production-rag.git
cd production-rag/ask\ docs

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Add environment variables
echo "GROQ_API_KEY=your_key_here" > .env

# Run the API
uvicorn api:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## 📁 Project Structure

```
production-rag/
│
├── ask docs/              ← Python Backend
│   ├── api.py             ← FastAPI server
│   ├── ingest.py          ← PDF loading & chunking
│   ├── retriever.py       ← Hybrid BM25 + FAISS retrieval
│   ├── chain.py           ← Reranking + LLM + citations
│   ├── requirements.txt   ← Python dependencies
│   └── Dockerfile         ← HuggingFace deployment
│
└── frontend/              ← React Frontend
    ├── src/
    │   └── App.jsx        ← Main application
    ├── package.json
    └── vite.config.js
```

---

## 💡 Why Production RAG?

Most RAG tutorials stop at basic vector search. This project implements the full production pipeline:

| Feature | Basic RAG | This Project |
|---|---|---|
| Chunking | Fixed size | Semantic |
| Retrieval | Vector only | BM25 + Vector |
| Reranking | ❌ | ✅ Cross-encoder |
| Citations | ❌ | ✅ Page-level |
| Confidence | ❌ | ✅ Real score |
| Evaluation | ❌ | ✅ Ragas ready |

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Your Groq API key |

---

## 📝 License

MIT License — feel free to use this project as a reference.

---

## 🙏 Acknowledgements

- LangChain for RAG orchestration
- Groq for fast LLM inference
- HuggingFace for embeddings and hosting
- FAISS by Facebook Research
