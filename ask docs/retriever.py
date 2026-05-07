import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.retrievers import BM25Retriever
from langchain_classic.retrievers import EnsembleRetriever
from ingest import load_and_chunk

load_dotenv()

def build_retriever(pdf_path):
    print("Building retriever...")

    # Load and chunk the PDF
    chunks = load_and_chunk(pdf_path)

    # Create embeddings (same model as before)
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # Store chunks in FAISS vector database
    print("Creating vector store...")
    vectorstore = FAISS.from_documents(chunks, embeddings)
    vector_retriever = vectorstore.as_retriever(
        search_kwargs={"k": 5}
    )
    print("Vector store created ✅")

    # BM25 keyword retriever
    print("Creating BM25 retriever...")
    bm25_retriever = BM25Retriever.from_documents(chunks)
    bm25_retriever.k = 5
    print("BM25 retriever created ✅")

    # Combine both into hybrid retriever
    hybrid_retriever = EnsembleRetriever(
        retrievers=[bm25_retriever, vector_retriever],
        weights=[0.4, 0.6]
    )
    print("Hybrid retriever created ✅")

    return hybrid_retriever

# Test it
if __name__ == "__main__":
    retriever = build_retriever("data/test.pdf")
    
    # Test with a question
    query = "What is the transformer architecture?"
    results = retriever.invoke(query)
    
    print(f"\nTop result for: '{query}'")
    print(results[0].page_content)