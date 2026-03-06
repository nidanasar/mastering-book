"""
RAG - Vector Store using Qdrant
Store and retrieve embeddings for book content
"""

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
    Filter,
    FieldCondition,
    MatchValue,
    SearchParams,
)
from typing import List, Dict, Any, Optional
import uuid

from config import settings
from rag.embeddings import get_embedding_service


class VectorStore:
    """Service for managing vector storage in Qdrant"""
    
    def __init__(self):
        self.client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY,
            timeout=60
        )
        self.collection_name = settings.QDRANT_COLLECTION
        self.vector_size = settings.QDRANT_VECTOR_SIZE
        self.embedding_service = get_embedding_service()
        
        # Initialize collection
        self._init_collection()
    
    def _init_collection(self):
        """Initialize Qdrant collection if it doesn't exist"""
        try:
            collections = self.client.get_collections().collections
            collection_exists = any(
                c.name == self.collection_name for c in collections
            )
            
            if not collection_exists:
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=self.vector_size,
                        distance=Distance.COSINE
                    ),
                    hnsw_config={
                        "m": 16,
                        "ef_construct": 100
                    }
                )
                print(f"✅ Created Qdrant collection: {self.collection_name}")
            else:
                print(f"✅ Qdrant collection exists: {self.collection_name}")
        except Exception as e:
            print(f"Error initializing collection: {e}")
            # Create in-memory fallback for development
            self.client = QdrantClient(":memory:")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=self.vector_size,
                    distance=Distance.COSINE
                )
            )
    
    def add_chunk(
        self,
        chunk_id: str,
        content: str,
        metadata: Dict[str, Any]
    ) -> bool:
        """
        Add a single chunk to the vector store
        
        Args:
            chunk_id: Unique identifier for the chunk
            content: Text content of the chunk
            metadata: Metadata (chapter, section, etc.)
            
        Returns:
            True if successful
        """
        try:
            # Generate embedding
            embedding = self.embedding_service.generate_embedding(content)
            if not embedding:
                return False
            
            # Create point
            point = PointStruct(
                id=uuid.UUID(chunk_id).int if isinstance(chunk_id, str) else chunk_id,
                vector=embedding,
                payload={
                    "content": content,
                    **metadata
                }
            )
            
            # Upsert
            self.client.upsert(
                collection_name=self.collection_name,
                points=[point]
            )
            return True
        except Exception as e:
            print(f"Error adding chunk: {e}")
            return False
    
    def add_chunks_batch(
        self,
        chunks: List[Dict[str, Any]]
    ) -> int:
        """
        Add multiple chunks in batch
        
        Args:
            chunks: List of dicts with id, content, metadata
            
        Returns:
            Number of successfully added chunks
        """
        try:
            points = []
            for chunk in chunks:
                embedding = self.embedding_service.generate_embedding(chunk["content"])
                if embedding:
                    point = PointStruct(
                        id=uuid.UUID(chunk["id"]).int if isinstance(chunk["id"], str) else chunk["id"],
                        vector=embedding,
                        payload={
                            "content": chunk["content"],
                            **chunk["metadata"]
                        }
                    )
                    points.append(point)
            
            if points:
                self.client.upsert(
                    collection_name=self.collection_name,
                    points=points
                )
                return len(points)
            return 0
        except Exception as e:
            print(f"Error adding batch chunks: {e}")
            return 0
    
    def search(
        self,
        query: str,
        top_k: Optional[int] = None,
        chapter_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Search for similar chunks
        
        Args:
            query: Search query text
            top_k: Number of results to return
            chapter_filter: Optional chapter ID to filter by
            
        Returns:
            List of search results with content and metadata
        """
        try:
            # Generate query embedding
            query_embedding = self.embedding_service.generate_embedding(query)
            if not query_embedding:
                return []
            
            # Build filter
            search_filter = None
            if chapter_filter:
                search_filter = Filter(
                    must=[
                        FieldCondition(
                            key="chapter_id",
                            match=MatchValue(value=chapter_filter)
                        )
                    ]
                )
            
            # Search
            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                query_filter=search_filter,
                limit=top_k or settings.RAG_TOP_K,
                search_params=SearchParams(
                    hnsw_ef=128,
                    exact=False
                )
            )
            
            # Format results
            formatted_results = []
            for result in results:
                if result.score >= settings.RAG_SIMILARITY_THRESHOLD:
                    formatted_results.append({
                        "content": result.payload.get("content", ""),
                        "chapter_id": result.payload.get("chapter_id", ""),
                        "section_title": result.payload.get("section_title", ""),
                        "score": result.score,
                        "metadata": result.payload
                    })
            
            return formatted_results
        except Exception as e:
            print(f"Error searching: {e}")
            return []
    
    def search_with_selected_text(
        self,
        query: str,
        selected_text: str,
        chapter_context: Optional[str] = None,
        top_k: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Search with additional selected text context
        
        Args:
            query: User's question
            selected_text: Text selected by user in the chapter
            chapter_context: Current chapter ID
            top_k: Number of results
            
        Returns:
            List of search results
        """
        # Combine query with selected text for better context
        combined_query = f"{selected_text}\n\nQuestion: {query}"
        
        # Search with chapter filter
        return self.search(
            query=combined_query,
            top_k=top_k,
            chapter_filter=chapter_context
        )
    
    def delete_chunk(self, chunk_id: str) -> bool:
        """Delete a chunk from the vector store"""
        try:
            self.client.delete(
                collection_name=self.collection_name,
                points_selector=[uuid.UUID(chunk_id).int if isinstance(chunk_id, str) else chunk_id]
            )
            return True
        except Exception as e:
            print(f"Error deleting chunk: {e}")
            return False
    
    def get_collection_stats(self) -> Dict[str, Any]:
        """Get collection statistics"""
        try:
            info = self.client.get_collection(self.collection_name)
            return {
                "collection_name": self.collection_name,
                "vectors_count": info.vectors_count,
                "points_count": info.points_count,
                "status": str(info.status)
            }
        except Exception as e:
            print(f"Error getting stats: {e}")
            return {}


# Global vector store instance
vector_store = VectorStore()


def get_vector_store() -> VectorStore:
    """Get vector store instance"""
    return vector_store
