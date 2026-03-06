# 🚀 Backend Deployment Guide

## Overview

This backend provides the RAG chatbot API for the "Mastering People & Influence" ebook. It uses:

- **FastAPI** + **Gradio** for the API and UI
- **OpenAI** for embeddings and chat completions
- **Qdrant** for vector storage
- **Neon** for PostgreSQL database

---

## 📋 Prerequisites

1. **Python 3.10+** installed
2. **OpenAI API Key** - Get from https://platform.openai.com/api-keys
3. **Qdrant Cloud Account** - Free tier at https://cloud.qdrant.io
4. **Neon Account** - Free serverless Postgres at https://console.neon.tech

---

## 🛠️ Local Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy example env file
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux
```

Edit `.env` and add your credentials:

```env
OPENAI_API_KEY="sk-your-actual-key"
QDRANT_URL="https://your-cluster.cloud.qdrant.io"
QDRANT_API_KEY="your-qdrant-api-key"
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"
```

### 4. Initialize Database

```bash
python -c "from database.connection import create_tables; create_tables()"
```

### 5. Ingest Book Content

```bash
python ingest_content.py
```

This will:
- Parse all `.mdx` chapter files
- Split into chunks
- Generate embeddings
- Store in Qdrant

### 6. Run the Backend

```bash
python app.py
```

Access:
- **API Docs**: http://localhost:7860/docs
- **Gradio UI**: http://localhost:7860/gradio

---

## ☁️ Deploy to Hugging Face Spaces

### Step 1: Create a New Space

1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Configure:
   - **Space name**: `mastering-book-backend`
   - **License**: MIT
   - **SDK**: Gradio
   - **Visibility**: Public (or Private)

### Step 2: Push Code to Space

```bash
# Clone your space
git clone https://huggingface.co/spaces/your-username/mastering-book-backend
cd mastering-book-backend

# Copy backend files
cp /path/to/your/backend/* .

# Commit and push
git add .
git commit -m "Initial backend deployment"
git push
```

### Step 3: Configure Secrets

In your Hugging Face Space:

1. Go to **Settings** → **Repository secrets**
2. Add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `QDRANT_URL` | Your Qdrant Cloud URL |
| `QDRANT_API_KEY` | Your Qdrant API key |
| `DATABASE_URL` | Your Neon Postgres URL |
| `JWT_SECRET_KEY` | Random string (use `openssl rand -base64 32`) |

### Step 4: Ingest Content (Post-Deployment)

After deployment, you need to ingest the book content:

**Option A: Run locally and push to Qdrant**

```bash
# Run ingestion locally (points to your Qdrant Cloud)
python ingest_content.py
```

**Option B: Use Hugging Face Spaces terminal**

1. Go to your Space
2. Click **Files** → **Terminal**
3. Run: `python ingest_content.py`

### Step 5: Test the Deployment

1. Open your Space URL: `https://huggingface.co/spaces/your-username/mastering-book-backend`
2. Test the Gradio chatbot UI
3. Check API docs: `https://your-username-mastering-book-backend.hf.space/docs`

---

## 🔗 Connect Frontend to Backend

In your **frontend** `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL="https://your-username-mastering-book-backend.hf.space"
```

Update the chat widget API calls to use this URL.

---

## 📊 Monitoring

### Qdrant Dashboard

- View vector count: https://cloud.qdrant.io
- Check collections and search performance

### Neon Dashboard

- Monitor database queries: https://console.neon.tech
- View table sizes and connections

### Hugging Face Metrics

- Go to Space → **Metrics** tab
- View CPU, Memory, and Request stats

---

## 🔧 Troubleshooting

### "Connection refused" to Qdrant

- Check QDRANT_URL format: `https://xxx.cloud.qdrant.io`
- Verify API key is correct
- Ensure your IP is allowed (or use public access)

### OpenAI API errors

- Check API key has credits
- Verify rate limits: https://platform.openai.com/usage

### Database connection fails

- Ensure Neon project is active
- Check SSL mode: `?sslmode=require`
- Verify username/password in connection string

### Gradio UI not loading

- Check `app.py` is in the root of the Space
- Verify `requirements.txt` has all dependencies
- Look at Space logs in **Settings** → **Logs**

---

## 📈 Scaling

### For Production:

1. **Upgrade Qdrant**: Move to paid tier for more vectors
2. **Use dedicated GPU**: In Hugging Face Spaces settings
3. **Add caching**: Redis for frequent queries
4. **Enable CDN**: For static assets
5. **Set up monitoring**: Sentry, Datadog, or similar

### Cost Estimates (Monthly):

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Hugging Face Spaces | ✅ Free (CPU) | $10-60 (GPU) |
| Qdrant Cloud | 1GB vectors | $25+ |
| Neon Postgres | 0.5 GB | $19+ |
| OpenAI API | Pay per use | ~$5-20 |

**Total**: ~$50-100/month for production

---

## 🎯 Next Steps

1. ✅ Deploy backend to Hugging Face
2. ✅ Ingest book content
3. ✅ Test chatbot functionality
4. ✅ Connect frontend to backend API
5. ✅ Implement Better-Auth integration
6. ✅ Add personalization features

---

## 📞 Support

- **API Docs**: `/docs` endpoint
- **Gradio UI**: `/gradio` endpoint
- **Health Check**: `/health` endpoint
- **Issues**: Open GitHub issue

---

**Happy Deploying! 🚀**
