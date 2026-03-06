"""
Configuration for Mastering People & Influence Backend
Environment variables and settings
"""

from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # ============================================
    # Application
    # ============================================
    APP_NAME: str = "Mastering People & Influence API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # ============================================
    # Database - Neon Serverless Postgres
    # ============================================
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://user:password@host.neon.tech/dbname?sslmode=require"
    )
    
    # ============================================
    # Vector Database - Qdrant Cloud
    # ============================================
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY: Optional[str] = os.getenv("QDRANT_API_KEY")
    QDRANT_COLLECTION: str = "book_content"
    QDRANT_VECTOR_SIZE: int = 1536  # OpenAI embeddings
    
    # ============================================
    # AI - OpenAI
    # ============================================
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    OPENAI_MAX_TOKENS: int = 1024
    OPENAI_TEMPERATURE: float = 0.7
    
    # ============================================
    # Authentication - Better-Auth
    # ============================================
    BETTER_AUTH_URL: Optional[str] = os.getenv("BETTER_AUTH_URL")
    BETTER_AUTH_SECRET: Optional[str] = os.getenv("BETTER_AUTH_SECRET")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # ============================================
    # RAG Configuration
    # ============================================
    RAG_CHUNK_SIZE: int = 500
    RAG_CHUNK_OVERLAP: int = 50
    RAG_TOP_K: int = 5  # Number of chunks to retrieve
    RAG_SIMILARITY_THRESHOLD: float = 0.7
    
    # ============================================
    # CORS
    # ============================================
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:8080",
        "https://*.vercel.app",
        "https://*.huggingface.co",
    ]
    
    # ============================================
    # File Paths
    # ============================================
    DATA_DIR: str = "./data"
    BOOK_CHUNKS_DIR: str = "./data/book_chunks"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """Get settings instance"""
    return settings
