# 🚀 Quick Start Guide

## Project Structure

```
mastering-book/
├── frontend/           # Docusaurus app → Deploy on Vercel
├── backend/            # FastAPI + Gradio → Deploy on Hugging Face
└── README.md
```

---

## ⚡ Frontend - Deploy on Vercel (5 minutes)

### Step 1: Push to GitHub

```bash
cd frontend
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository: `nidanasar/mastering-book`
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Click **Deploy**

### Step 3: Test

Your site will be live at: `https://mastering-book.vercel.app`

---

## ⚡ Backend - Deploy on Hugging Face (10 minutes)

### Prerequisites

1. **OpenAI API Key**: https://platform.openai.com/api-keys
2. **Qdrant Cloud**: https://cloud.qdrant.io (free tier)
3. **Neon Postgres**: https://console.neon.tech (free tier)

### Step 1: Create Hugging Face Space

1. Go to https://huggingface.co/spaces/create
2. Configure:
   - **Space name**: `mastering-book-backend`
   - **SDK**: Gradio
   - **Visibility**: Public

### Step 2: Push Backend Code

```bash
# Clone your space
git clone https://huggingface.co/spaces/your-username/mastering-book-backend
cd mastering-book-backend

# Copy backend files
cp /path/to/mastering-book/backend/* .

# Push
git add .
git commit -m "Deploy backend"
git push
```

### Step 3: Add Secrets

In Hugging Face Space → Settings → Repository secrets:

| Secret | Value |
|--------|-------|
| `OPENAI_API_KEY` | `sk-...` |
| `QDRANT_URL` | `https://...cloud.qdrant.io` |
| `QDRANT_API_KEY` | Your API key |
| `DATABASE_URL` | `postgresql://...neon.tech/...` |

### Step 4: Ingest Content

Run locally (pushes to your Qdrant Cloud):

```bash
cd /path/to/mastering-book/backend
pip install -r requirements.txt
python ingest_content.py
```

### Step 5: Test

Visit: `https://huggingface.co/spaces/your-username/mastering-book-backend`

---

## 🔗 Connect Frontend + Backend

Update frontend `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL="https://your-username-mastering-book-backend.hf.space"
```

---

## ✅ Verify Everything Works

### Frontend Checklist

- [ ] Site loads on Vercel
- [ ] All chapters navigate correctly
- [ ] Teal & Gold theme displays properly
- [ ] Mobile responsive

### Backend Checklist

- [ ] Gradio UI loads
- [ ] Chatbot responds to questions
- [ ] API docs accessible at `/docs`
- [ ] Health check returns: `/health`

### Integration Checklist

- [ ] Frontend can call backend API
- [ ] Chat widget shows in chapters
- [ ] Questions return answers with sources

---

## 📊 Score Tracking

| Component | Points | Status |
|-----------|--------|--------|
| **Base Functionality** | 100 | |
| RAG Chatbot | 40 | ⬜ |
| Text Selection Q&A | 40 | ⬜ |
| ChatKit Integration | 20 | ⬜ |
| **Bonus** | | |
| Better-Auth Signup | 25 | ⬜ |
| Background Questions | 25 | ⬜ |
| Content Personalization | 50 | ⬜ |
| **TOTAL** | **200** | |

---

## 🎯 What's Next?

After deployment:

1. **Test the chatbot** - Ask questions about the book
2. **Add Better-Auth** - User authentication (50 points)
3. **Build personalization** - Dynamic content (50 points)
4. **Polish UI** - Final touches
5. **Submit!** 🚀

---

## 📞 Need Help?

- **Frontend Issues**: Check Vercel logs
- **Backend Issues**: Check HF Space logs
- **API Errors**: Verify secrets are set correctly
- **Qdrant Errors**: Check cluster is running

---

**You're ready to deploy! 🎉**

Start with the frontend on Vercel first (get it live), then work on the backend.
