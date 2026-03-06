"""
Database connection and models for Neon Postgres
"""

from sqlalchemy import create_engine, Column, String, Integer, DateTime, JSON, Boolean, ARRAY, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from typing import List, Optional
import uuid

from config import settings

# Database URL
DATABASE_URL = settings.DATABASE_URL

# Create engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


# ============================================
# Database Models
# ============================================

class User(Base):
    """User account model"""
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Profile information
    software_background = Column(String, nullable=True)
    hardware_background = Column(String, nullable=True)
    learning_goals = Column(JSON, nullable=True)
    
    # Relationships
    progress = relationship("UserProgress", back_populates="user", uselist=False)
    chat_sessions = relationship("ChatSession", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email})>"


class UserProgress(Base):
    """User learning progress and gamification"""
    __tablename__ = "user_progress"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    
    # Progress tracking
    completed_chapters = Column(JSON, default=list)
    total_xp = Column(Integer, default=0)
    current_level = Column(Integer, default=1)
    
    # Badges
    badges = Column(JSON, default=list)
    unlocked_badges = Column(JSON, default=list)
    
    # Challenge progress
    challenge_progress = Column(JSON, default={})
    
    # Last active
    last_active = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="progress")
    
    def __repr__(self):
        return f"<UserProgress(user_id={self.user_id}, xp={self.total_xp})>"


class ChatSession(Base):
    """Chat session history for RAG chatbot"""
    __tablename__ = "chat_sessions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    
    # Session data
    messages = Column(JSON, default=list)
    chapter_context = Column(String, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    message_count = Column(Integer, default=0)
    
    # Relationship
    user = relationship("User", back_populates="chat_sessions")
    
    def __repr__(self):
        return f"<ChatSession(id={self.id}, messages={self.message_count})>"


class BookChunk(Base):
    """Processed book content chunks for RAG"""
    __tablename__ = "book_chunks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Content
    chapter_id = Column(String, index=True)
    section_title = Column(String)
    content = Column(Text)
    
    # Metadata
    chunk_index = Column(Integer)
    word_count = Column(Integer)
    metadata = Column(JSON, default=dict)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"<BookChunk(chapter={self.chapter_id}, index={self.chunk_index})>"


class PersonalizationCache(Base):
    """Cached personalized content for users"""
    __tablename__ = "personalization_cache"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    chapter_id = Column(String)
    
    # Personalized content
    personalized_content = Column(JSON)
    examples_swapped = Column(JSON, default=list)
    scenarios_adapted = Column(JSON, default=list)
    
    # Metadata
    generated_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)
    
    def __repr__(self):
        return f"<PersonalizationCache(user={self.user_id}, chapter={self.chapter_id})>"


# ============================================
# Database Functions
# ============================================

def init_db():
    """Initialize database - create all tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")


def get_db():
    """Get database session - dependency for FastAPI"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """Create database tables"""
    init_db()


if __name__ == "__main__":
    # Create tables when run directly
    create_tables()
    print("Database initialized!")
