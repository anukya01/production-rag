import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

def load_and_chunk(pdf_path):
    print(f"Loading PDF: {pdf_path}")

    # Load the PDF
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    print(f"Total pages loaded: {len(documents)}")

    # Semantic chunking using free HuggingFace embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    splitter = SemanticChunker(
        embeddings=embeddings,
        breakpoint_threshold_type="percentile",
        breakpoint_threshold_amount=95
    )

    chunks = splitter.split_documents(documents)
    print(f"Total chunks created: {len(chunks)}")

    return chunks

# Test it
if __name__ == "__main__":
    chunks = load_and_chunk("data/test.pdf")
    print("\nFirst chunk preview:")
    print(chunks[0].page_content)
    print("\nSecond chunk preview:")
    print(chunks[1].page_content)