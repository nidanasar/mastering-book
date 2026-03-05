# Mastering People & Influence

A modern, interactive ebook teaching Dale Carnegie's timeless principles with gamification, RAG chatbot, and personalized learning.

## 📁 Project Structure

```
mastering-book/
├── frontend/          # Docusaurus frontend (deployed on Vercel)
├── backend/           # FastAPI + Gradio backend (deployed on Hugging Face)
└── README.md          # This file
```

## 🚀 Quick Start

### Frontend (Docusaurus)

```bash
cd frontend
npm install
npm run start
```

### Backend (FastAPI + Gradio)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 📦 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Backend**: Deployed on [Hugging Face Spaces](https://huggingface.co/spaces)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Docusaurus v3 (React/TypeScript)
- **Styling**: Custom CSS (Teal & Gold theme)
- **Deployment**: Vercel

### Backend
- **API**: FastAPI + Gradio
- **Database**: Neon Serverless Postgres
- **Vector DB**: Qdrant Cloud
- **AI**: OpenAI Agents/ChatKit SDKs
- **Auth**: Better-Auth
- **Deployment**: Hugging Face Spaces

## 📚 Features

- ✅ 30 chapters organized in 4 parts
- ✅ Gamification (XP, badges, progress tracking)
- ✅ Interactive exercises and challenges
- ✅ RAG chatbot for Q&A about book content
- ✅ Text selection-based contextual questions
- ✅ User authentication with Better-Auth
- ✅ Personalized content based on user background
- ✅ Mobile-responsive design

## 🎯 Scoring (Competition)

| Component | Points |
|-----------|--------|
| RAG Chatbot (base) | 100 |
| Better-Auth Signup | 50 |
| Content Personalization | 50 |
| **TOTAL** | **200** |

## 📖 Book Structure

### Part 1: The Foundation (Days 1-7)
- Chapter 1: Don't Criticize, Condemn, or Complain
- Chapter 2: Give Honest and Sincere Appreciation
- Chapter 3: Arouse an Eager Want

### Part 2: Building Connections (Days 8-20)
- 6 chapters on genuine connection skills

### Part 3: Leading Others (Days 21-45)
- 12 chapters on leadership and influence

### Part 4: Mastery (Days 46-60)
- 9 chapters on advanced techniques

## 🔗 Links

- [Live Site](https://your-domain.vercel.app)
- [Backend API](https://huggingface.co/spaces/your-username/mastering-book-backend)
- [GitHub Repo](https://github.com/nidanasar/mastering-book)

## 📄 License

MIT
