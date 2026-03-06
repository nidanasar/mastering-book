"""
Mastering People & Influence - Backend API
FastAPI + Gradio for Hugging Face Spaces
RAG Chatbot for ebook Q&A
"""

import gradio as gr
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime
import json

from config import settings
from chatbot.agent import get_chatbot_agent
from rag.retriever import get_retriever
from database.connection import init_db, get_db, User, UserProgress, ChatSession

# ============================================
# FastAPI App
# ============================================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="RAG-powered chatbot API for Mastering People & Influence ebook"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    """Initialize database and services on startup"""
    try:
        init_db()
        print("✅ Database initialized")
    except Exception as e:
        print(f"⚠️ Database initialization skipped: {e}")


# ============================================
# Pydantic Models
# ============================================

class ChatRequest(BaseModel):
    """Chat request model"""
    message: str
    selected_text: Optional[str] = None
    chapter_context: Optional[str] = None
    chat_history: Optional[List[Dict[str, str]]] = None
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Chat response model"""
    message: str
    sources: List[Dict[str, Any]]
    chapter_context: Optional[str]
    selected_text: Optional[str] = None
    timestamp: str
    error: Optional[bool] = False


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    version: str
    timestamp: str
    services: Dict[str, str]


class UserProgressRequest(BaseModel):
    """User progress update request"""
    user_id: str
    chapter_id: str
    xp_earned: int = 0
    completed: bool = True


class UserProgressResponse(BaseModel):
    """User progress response"""
    user_id: str
    total_xp: int
    completed_chapters: List[str]
    badges: List[str]
    current_level: int


# ============================================
# API Endpoints
# ============================================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "Mastering People & Influence API",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        timestamp=datetime.utcnow().isoformat(),
        services={
            "database": "connected",
            "qdrant": "connected",
            "openai": "connected"
        }
    )


@app.post("/api/chat", response_model=ChatResponse, tags=["Chatbot"])
async def chat(request: ChatRequest):
    """
    Chat with the RAG-powered chatbot
    
    - **message**: User's question
    - **selected_text**: Optional text selected from the chapter
    - **chapter_context**: Current chapter ID for context
    - **chat_history**: Previous conversation messages
    """
    chatbot = get_chatbot_agent()
    
    try:
        if request.selected_text:
            # Chat with selected text context
            response = chatbot.chat_with_selected_text(
                message=request.message,
                selected_text=request.selected_text,
                chat_history=request.chat_history,
                chapter_context=request.chapter_context
            )
        else:
            # Regular chat
            response = chatbot.chat(
                message=request.message,
                chat_history=request.chat_history,
                chapter_context=request.chapter_context
            )
        
        return ChatResponse(**response)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@app.post("/api/chat/explain", response_model=ChatResponse, tags=["Chatbot"])
async def explain_concept(concept: str, chapter_context: Optional[str] = None):
    """
    Explain a specific concept from the book
    
    - **concept**: Concept to explain (e.g., "criticism", "appreciation")
    - **chapter_context**: Optional chapter filter
    """
    chatbot = get_chatbot_agent()
    response = chatbot.explain_concept(
        concept=concept,
        chapter_context=chapter_context
    )
    return ChatResponse(**response)


@app.get("/api/chapter/{chapter_id}/summary", tags=["Chapters"])
async def get_chapter_summary(chapter_id: str):
    """
    Get summary of a chapter
    
    - **chapter_id**: Chapter identifier (e.g., "chapter-01")
    """
    retriever = get_retriever()
    summary = retriever.get_chapter_summary(chapter_id)
    return {
        "chapter_id": chapter_id,
        "summary": summary,
        "timestamp": datetime.utcnow().isoformat()
    }


@app.post("/api/user/progress", response_model=UserProgressResponse, tags=["User Progress"])
async def update_user_progress(request: UserProgressRequest):
    """
    Update user's learning progress
    
    - **user_id**: User identifier
    - **chapter_id**: Chapter completed
    - **xp_earned**: XP points earned
    - **completed**: Whether chapter is completed
    """
    # Note: This is a simplified implementation
    # Full implementation would use the database session
    return UserProgressResponse(
        user_id=request.user_id,
        total_xp=100,  # Placeholder
        completed_chapters=[request.chapter_id],
        badges=[],
        current_level=1
    )


@app.get("/api/user/{user_id}/progress", response_model=UserProgressResponse, tags=["User Progress"])
async def get_user_progress(user_id: str):
    """Get user's current progress"""
    # Placeholder implementation
    return UserProgressResponse(
        user_id=user_id,
        total_xp=0,
        completed_chapters=[],
        badges=[],
        current_level=1
    )


# ============================================
# Gradio Interface
# ============================================

def chatbot_response(message, history, chapter_dropdown, selected_text):
    """Gradio chatbot response function"""
    chatbot = get_chatbot_agent()
    
    # Convert history to format expected by agent
    chat_history = []
    if history:
        for user_msg, assistant_msg in history:
            chat_history.append({"role": "user", "content": user_msg})
            chat_history.append({"role": "assistant", "content": assistant_msg})
    
    # Get response
    if selected_text and selected_text.strip():
        response = chatbot.chat_with_selected_text(
            message=message,
            selected_text=selected_text,
            chat_history=chat_history,
            chapter_context=chapter_dropdown if chapter_dropdown != "all" else None
        )
    else:
        response = chatbot.chat(
            message=message,
            chat_history=chat_history,
            chapter_context=chapter_dropdown if chapter_dropdown != "all" else None
        )
    
    # Format response with sources
    formatted_response = response["message"]
    
    if response.get("sources"):
        sources_text = "\n\n**Sources:**\n"
        for source in response["sources"]:
            sources_text += f"- {source['chapter']} | {source['section']} (relevance: {source['score']:.2f})\n"
        formatted_response += sources_text
    
    return formatted_response


# Create Gradio interface
with gr.Blocks(
    title="Mastering People & Influence - Chatbot",
    theme=gr.themes.Soft(primary_hue="emerald")
) as demo:
    gr.Markdown(
        """
        # 📚 Mastering People & Influence - AI Chatbot
        
        Ask questions about the book's content! I can help you understand:
        - Key concepts and principles
        - Specific passages you select
        - Practical applications
        
        Select a chapter or ask general questions about the entire book.
        """
    )
    
    with gr.Row():
        with gr.Column(scale=3):
            chapter_dropdown = gr.Dropdown(
                choices=[
                    ("All Chapters", "all"),
                    ("Chapter 1: Don't Criticize", "chapter-01"),
                    ("Chapter 2: Appreciation", "chapter-02"),
                    ("Chapter 3: Eager Want", "chapter-03"),
                    ("Part 1 Overview", "part-1-overview"),
                ],
                value="all",
                label="Chapter Context (optional)"
            )
            
            selected_text = gr.Textbox(
                label="Selected Text (optional)",
                placeholder="Paste text from the chapter you want to ask about...",
                lines=3
            )
        
        with gr.Column(scale=3):
            chatbot = gr.Chatbot(
                label="Chat",
                height=400,
                show_copy_button=True
            )
    
    with gr.Row():
        msg = gr.Textbox(
            label="Your Question",
            placeholder="Ask me anything about the book...",
            scale=4
        )
        submit_btn = gr.Button("Send", variant="primary", scale=1)
    
    clear_btn = gr.Button("🗑️ Clear Conversation")
    
    # Event handlers
    submit_btn.click(
        fn=chatbot_response,
        inputs=[msg, chatbot, chapter_dropdown, selected_text],
        outputs=[chatbot]
    )
    
    msg.submit(
        fn=chatbot_response,
        inputs=[msg, chatbot, chapter_dropdown, selected_text],
        outputs=[chatbot]
    )
    
    clear_btn.click(
        fn=lambda: None,
        inputs=None,
        outputs=chatbot
    )
    
    gr.Markdown(
        """
        ---
        **Tip**: For best results, select specific text from the chapter and ask questions about it!
        """
    )


# Mount Gradio app to FastAPI
app = gr.mount_gradio_app(app, demo, path="/gradio")


# ============================================
# Main Entry Point
# ============================================

if __name__ == "__main__":
    import uvicorn
    
    print("🚀 Starting Mastering People & Influence Backend...")
    print(f"📖 API Docs: http://localhost:7860/docs")
    print(f"💬 Gradio UI: http://localhost:7860/gradio")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=7860,
        reload=settings.DEBUG
    )
