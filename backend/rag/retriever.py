"""
RAG - Retriever
Combine embeddings and vector store for intelligent retrieval
"""

from typing import List, Dict, Any, Optional
from datetime import datetime

from rag.vector_store import get_vector_store
from rag.embeddings import get_embedding_service
from config import settings


class RAGRetriever:
    """Retrieval service for RAG chatbot"""
    
    def __init__(self):
        self.vector_store = get_vector_store()
        self.embedding_service = get_embedding_service()
    
    def retrieve(
        self,
        query: str,
        chapter_context: Optional[str] = None,
        top_k: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Retrieve relevant chunks for a query
        
        Args:
            query: User's question
            chapter_context: Optional chapter to search within
            top_k: Number of results
            
        Returns:
            List of relevant chunks with metadata
        """
        return self.vector_store.search(
            query=query,
            top_k=top_k,
            chapter_filter=chapter_context
        )
    
    def retrieve_with_context(
        self,
        query: str,
        selected_text: str,
        chapter_context: Optional[str] = None,
        top_k: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Retrieve chunks with selected text context
        
        Args:
            query: User's question
            selected_text: Text highlighted by user
            chapter_context: Current chapter
            top_k: Number of results
            
        Returns:
            List of relevant chunks
        """
        return self.vector_store.search_with_selected_text(
            query=query,
            selected_text=selected_text,
            chapter_context=chapter_context,
            top_k=top_k
        )
    
    def build_context(
        self,
        retrieved_chunks: List[Dict[str, Any]],
        max_tokens: int = 2000
    ) -> str:
        """
        Build context string from retrieved chunks
        
        Args:
            retrieved_chunks: List of chunks from retrieval
            max_tokens: Maximum tokens for context
            
        Returns:
            Formatted context string
        """
        if not retrieved_chunks:
            return "No relevant information found in the book."
        
        context_parts = []
        total_tokens = 0
        
        for chunk in retrieved_chunks:
            # Format chunk
            chapter = chunk.get("chapter_id", "Unknown")
            section = chunk.get("section_title", "")
            content = chunk.get("content", "")
            score = chunk.get("score", 0)
            
            # Count tokens
            chunk_tokens = self.embedding_service.count_tokens(content)
            if total_tokens + chunk_tokens > max_tokens:
                break
            
            # Add to context
            context_parts.append(
                f"[Chapter: {chapter} | Section: {section} | Relevance: {score:.2f}]\n"
                f"{content}\n"
                f"---"
            )
            total_tokens += chunk_tokens
        
        return "\n".join(context_parts)
    
    def get_chapter_summary(self, chapter_id: str) -> str:
        """
        Get a summary of all chunks in a chapter
        
        Args:
            chapter_id: Chapter identifier
            
        Returns:
            Summary text
        """
        chunks = self.vector_store.search(
            query="chapter overview introduction summary",
            top_k=10,
            chapter_filter=chapter_id
        )
        
        if not chunks:
            return "No content found for this chapter."
        
        return self.build_context(chunks, max_tokens=3000)


# Global retriever instance
retriever = RAGRetriever()


def get_retriever() -> RAGRetriever:
    """Get retriever instance"""
    return retriever
