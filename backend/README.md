---
title: Mastering People & Influence - RAG Chatbot
emoji: 📚
colorFrom: green
colorTo: emerald
sdk: gradio
sdk_version: 4.19.0
app_file: app.py
pinned: false
license: mit
tags:
  - fastapi
  - rag
  - chatbot
  - openai
  - qdrant
  - ebook
---

# Mastering People & Influence - RAG Chatbot Backend

This is the backend API for the "Mastering the Art of People and Influence" interactive ebook.

## Features

- 🤖 **RAG-Powered Chatbot**: Answers questions about book content
- 📖 **Text Selection Support**: Ask questions about specific passages
- 🎯 **Chapter Context**: Filter responses by chapter
- 💾 **Persistent Storage**: Neon Postgres for user data
- 🔍 **Vector Search**: Qdrant for semantic search
- 🧠 **OpenAI Integration**: GPT-4 for intelligent responses

## API Endpoints

- `/docs` - Interactive API documentation
- `/gradio` - Gradio chatbot UI
- `/api/chat` - Chat endpoint
- `/health` - Health check

## Configuration

Set the following secrets in your Hugging Face Space:

- `OPENAI_API_KEY` - Your OpenAI API key
- `QDRANT_URL` - Qdrant Cloud URL
- `QDRANT_API_KEY` - Qdrant API key
- `DATABASE_URL` - Neon Postgres connection string

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

## Deployment

This app is designed for Hugging Face Spaces with Gradio.

1. Create a new Space on Hugging Face
2. Select "Gradio" as the SDK
3. Push this code to the Space
4. Add your secrets in Space Settings
5. The app will deploy automatically!

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   User      │────▶│  FastAPI +   │────▶│   OpenAI    │
│  (Frontend) │     │   Gradio     │     │   (GPT-4)   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ├─────▶ Qdrant (Vector DB)
                           │
                           └─────▶ Neon (Postgres)
```

## License

MIT
