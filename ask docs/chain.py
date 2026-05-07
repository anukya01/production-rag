import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from sentence_transformers import CrossEncoder
from retriever import build_retriever

load_dotenv()

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

def rerank(query, docs, top_k=4):
    pairs = [(query, doc.page_content) for doc in docs]
    scores = reranker.predict(pairs)
    ranked = sorted(zip(scores, docs), reverse=True)
    return [(doc, float(score)) for score, doc in ranked[:top_k]]

def answer_question(query, pdf_path="data/test.pdf"):
    retriever = build_retriever(pdf_path)
    raw_docs = retriever.invoke(query)

    reranked = rerank(query, raw_docs)

    # Build context
    context = "\n\n".join([
        f"[chunk {i+1}, page {doc.metadata.get('page', '?')}]\n{doc.page_content}"
        for i, (doc, score) in enumerate(reranked)
    ])

    prompt = ChatPromptTemplate.from_template("""
You are a helpful assistant. Answer the question using ONLY the context below.
For every point you make, add a citation like [chunk 1] or [chunk 2].
If the answer is not in the context, say "I don't know based on the provided document."

Context:
{context}

Question: {question}

Answer with citations:
""")

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY")
    )

    chain = prompt | llm
    response = chain.invoke({
        "context": context,
        "question": query
    })

    # Build citations
    citations = []
    for i, (doc, score) in enumerate(reranked):
        citations.append({
            "chunk": i + 1,
            "page": doc.metadata.get("page", "?"),
            "score": round(score * 100),
            "excerpt": doc.page_content[:200] + "..."
        })

    # Confidence = top chunk score normalized
    raw_top_score = reranked[0][1]
    confidence = min(int((raw_top_score + 10) / 20 * 100), 99)

    return {
        "answer": response.content,
        "citations": citations,
        "confidence": confidence
    }