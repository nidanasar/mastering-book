"""
Chatbot Agent using OpenAI
Handles chat completions with RAG context
"""

from openai import OpenAI
from typing import List, Dict, Any, Optional
from datetime import datetime

from config import settings
from rag.retriever import get_retriever


class ChatbotAgent:
    """AI Chatbot agent with RAG capabilities"""
    
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
        self.retriever = get_retriever()
        
        # System prompt for the chatbot
        self.system_prompt = """You are an intelligent, friendly assistant for the ebook "Mastering the Art of People and Influence" - a modern interpretation of Dale Carnegie's timeless principles.

Your role:
1. Answer questions about the book's content accurately
2. Provide practical examples and advice
3. Be encouraging and supportive
4. Reference specific chapters and sections when possible
5. If you don't know something, admit it honestly
6. Keep responses concise but helpful (2-4 paragraphs typically)

The book teaches:
- How to build trust and influence without manipulation
- Techniques for genuine connection with others
- Leadership skills that inspire rather than command
- Conflict resolution and communication strategies
- Personal development through practical exercises

Always ground your answers in the actual book content provided in the context."""
    
    def chat(
        self,
        message: str,
        chat_history: Optional[List[Dict[str, str]]] = None,
        chapter_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        General chat with RAG context
        
        Args:
            message: User's message
            chat_history: Previous conversation messages
            chapter_context: Current chapter ID
            
        Returns:
            Response dict with message and sources
        """
        # Retrieve relevant context
        retrieved_chunks = self.retriever.retrieve(
            query=message,
            chapter_context=chapter_context
        )
        
        # Build context string
        context = self.retriever.build_context(retrieved_chunks)
        
        # Build messages
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"Context from book:\n{context}\n\nUser question: {message}"}
        ]
        
        # Add chat history if provided
        if chat_history:
            messages = messages[:1] + chat_history + messages[1:]
        
        # Get response from OpenAI
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=settings.OPENAI_MAX_TOKENS,
                temperature=settings.OPENAI_TEMPERATURE
            )
            
            assistant_message = response.choices[0].message.content
            
            # Build sources list
            sources = [
                {
                    "chapter": chunk.get("chapter_id", ""),
                    "section": chunk.get("section_title", ""),
                    "score": chunk.get("score", 0)
                }
                for chunk in retrieved_chunks[:3]  # Top 3 sources
            ]
            
            return {
                "message": assistant_message,
                "sources": sources,
                "chapter_context": chapter_context,
                "timestamp": datetime.utcnow().isoformat()
            }
        except Exception as e:
            return {
                "message": f"I apologize, but I'm having trouble responding right now. Please try again. (Error: {str(e)})",
                "sources": [],
                "error": True
            }
    
    def chat_with_selected_text(
        self,
        message: str,
        selected_text: str,
        chat_history: Optional[List[Dict[str, str]]] = None,
        chapter_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Chat with selected text context
        
        Args:
            message: User's question about selected text
            selected_text: Text highlighted by user
            chat_history: Previous conversation
            chapter_context: Current chapter
            
        Returns:
            Response dict with message and sources
        """
        # Retrieve context with selected text
        retrieved_chunks = self.retriever.retrieve_with_context(
            query=message,
            selected_text=selected_text,
            chapter_context=chapter_context
        )
        
        # Build context
        context = self.retriever.build_context(retrieved_chunks)
        
        # Enhanced system prompt for selected text
        selected_text_prompt = f"""{self.system_prompt}

The user has selected this text from the chapter:
"{selected_text}"

They are asking a question specifically about this selected passage. 
Provide a detailed explanation that connects the selected text to the broader concepts in the book."""
        
        # Build messages
        messages = [
            {"role": "system", "content": selected_text_prompt},
            {"role": "user", "content": f"Context from book:\n{context}\n\nSelected text: {selected_text}\n\nUser question about selected text: {message}"}
        ]
        
        if chat_history:
            messages = messages[:1] + chat_history + messages[1:]
        
        # Get response
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=settings.OPENAI_MAX_TOKENS * 2,  # Allow longer responses for detailed explanations
                temperature=settings.OPENAI_TEMPERATURE
            )
            
            assistant_message = response.choices[0].message.content
            
            # Build sources
            sources = [
                {
                    "chapter": chunk.get("chapter_id", ""),
                    "section": chunk.get("section_title", ""),
                    "score": chunk.get("score", 0)
                }
                for chunk in retrieved_chunks[:3]
            ]
            
            return {
                "message": assistant_message,
                "selected_text": selected_text,
                "sources": sources,
                "chapter_context": chapter_context,
                "timestamp": datetime.utcnow().isoformat()
            }
        except Exception as e:
            return {
                "message": f"I apologize, but I'm having trouble responding right now. Please try again. (Error: {str(e)})",
                "sources": [],
                "error": True
            }
    
    def explain_concept(
        self,
        concept: str,
        chapter_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Explain a specific concept from the book
        
        Args:
            concept: Concept to explain (e.g., "criticism", "appreciation")
            chapter_context: Optional chapter filter
            
        Returns:
            Detailed explanation with examples
        """
        prompt = f"Explain the concept of '{concept}' as taught in this book. Include practical examples and how to apply it."
        
        return self.chat(
            message=prompt,
            chapter_context=chapter_context
        )


# Global chatbot agent instance
chatbot_agent = ChatbotAgent()


def get_chatbot_agent() -> ChatbotAgent:
    """Get chatbot agent instance"""
    return chatbot_agent
