"""
Content Ingestion Script
Process book chapters and add to vector store

Run this script to ingest all book content into Qdrant
"""

import os
import sys
import markdown
from pathlib import Path
from typing import List, Dict, Any
import uuid

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import settings
from rag.vector_store import get_vector_store
from rag.embeddings import get_embedding_service
from database.connection import BookChunk, SessionLocal, init_db


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """
    Split text into overlapping chunks
    
    Args:
        text: Text to chunk
        chunk_size: Maximum characters per chunk
        overlap: Overlap between chunks
        
    Returns:
        List of text chunks
    """
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        
        # Try to break at sentence boundary
        if end < len(text):
            last_period = chunk.rfind('.')
            if last_period > chunk_size // 2:
                chunk = text[start:start + last_period + 1]
                end = start + last_period + 1
        
        chunks.append(chunk.strip())
        start = end - overlap
    
    return chunks


def parse_mdx_file(file_path: str) -> Dict[str, Any]:
    """
    Parse MDX file and extract metadata and content
    
    Args:
        file_path: Path to MDX file
        
    Returns:
        Dict with metadata and content
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter (YAML between ---)
    metadata = {}
    body = content
    
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            body = parts[2].strip()
            
            # Parse simple YAML-like metadata
            for line in frontmatter.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip().strip("'\"")
                    
                    # Convert types
                    if value.isdigit():
                        value = int(value)
                    elif value.replace('.', '').isdigit():
                        value = float(value)
                    
                    metadata[key] = value
    
    # Convert markdown to plain text (remove formatting)
    html = markdown.markdown(body)
    # Simple HTML tag removal
    import re
    plain_text = re.sub(r'<[^>]+>', '', html)
    
    return {
        "metadata": metadata,
        "content": plain_text,
        "raw_content": body
    }


def ingest_chapter(file_path: str, chapter_id: str) -> int:
    """
    Ingest a single chapter into vector store
    
    Args:
        file_path: Path to chapter file
        chapter_id: Chapter identifier
        
    Returns:
        Number of chunks added
    """
    print(f"📖 Processing {chapter_id}...")
    
    # Parse file
    parsed = parse_mdx_file(file_path)
    metadata = parsed["metadata"]
    content = parsed["content"]
    
    # Chunk content
    chunks = chunk_text(
        content,
        chunk_size=settings.RAG_CHUNK_SIZE,
        overlap=settings.RAG_CHUNK_OVERLAP
    )
    
    print(f"  Created {len(chunks)} chunks")
    
    # Prepare chunks for vector store
    chunk_data = []
    for i, chunk in enumerate(chunks):
        if len(chunk.strip()) < 50:  # Skip very small chunks
            continue
        
        chunk_metadata = {
            "chapter_id": chapter_id,
            "section_title": metadata.get("title", f"Chapter {chapter_id}"),
            "chunk_index": i,
            "total_chunks": len(chunks),
            "principle_number": metadata.get("principle_number", ""),
            "badge": metadata.get("badge", ""),
            "part_number": metadata.get("part_number", ""),
        }
        
        chunk_data.append({
            "id": str(uuid.uuid4()),
            "content": chunk,
            "metadata": chunk_metadata
        })
    
    # Add to vector store
    vector_store = get_vector_store()
    added = vector_store.add_chunks_batch(chunk_data)
    
    # Also save to database
    try:
        init_db()
        db = SessionLocal()
        for chunk in chunk_data:
            db_chunk = BookChunk(
                chapter_id=chapter_id,
                section_title=chunk["metadata"]["section_title"],
                content=chunk["content"],
                chunk_index=chunk["metadata"]["chunk_index"],
                word_count=len(chunk["content"].split()),
                metadata=chunk["metadata"]
            )
            db.add(db_chunk)
        db.commit()
        db.close()
        print(f"  ✅ Saved to database")
    except Exception as e:
        print(f"  ⚠️ Database save failed: {e}")
    
    return added


def ingest_all_chapters(docs_dir: str) -> Dict[str, int]:
    """
    Ingest all chapters from docs directory
    
    Args:
        docs_dir: Path to docs directory
        
    Returns:
        Dict mapping chapter_id to chunks added
    """
    results = {}
    
    # Find all chapter files
    chapter_files = []
    for file in Path(docs_dir).glob("chapter-*.mdx"):
        chapter_files.append(file)
    
    # Also include part overviews
    for file in Path(docs_dir).glob("part-*-overview.md"):
        chapter_files.append(file)
    
    print(f"📚 Found {len(chapter_files)} chapter files")
    
    for file_path in chapter_files:
        # Extract chapter ID from filename
        chapter_id = file_path.stem
        
        try:
            added = ingest_chapter(str(file_path), chapter_id)
            results[chapter_id] = added
            print(f"  ✅ Added {added} chunks\n")
        except Exception as e:
            print(f"  ❌ Error processing {chapter_id}: {e}\n")
            results[chapter_id] = 0
    
    return results


def main():
    """Main ingestion function"""
    print("🚀 Starting content ingestion...\n")
    
    # Path to docs directory (adjust as needed)
    docs_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "frontend",
        "docs"
    )
    
    if not os.path.exists(docs_dir):
        print(f"❌ Docs directory not found: {docs_dir}")
        print("Please update the path in the script.")
        return
    
    # Ingest all chapters
    results = ingest_all_chapters(docs_dir)
    
    # Summary
    total_chunks = sum(results.values())
    print("\n" + "="*50)
    print("📊 Ingestion Summary")
    print("="*50)
    for chapter_id, chunks in results.items():
        print(f"  {chapter_id}: {chunks} chunks")
    print("-"*50)
    print(f"  TOTAL: {total_chunks} chunks")
    print("="*50)
    print("\n✅ Content ingestion complete!")
    print("\nNext steps:")
    print("1. Verify chunks in Qdrant Cloud dashboard")
    print("2. Test the chatbot at /gradio endpoint")
    print("3. Deploy to Hugging Face Spaces")


if __name__ == "__main__":
    main()
