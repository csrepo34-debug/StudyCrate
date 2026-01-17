# Deployment Guide

## Frontend Deployment (Vercel)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial StudyCrate commit"
git remote add origin https://github.com/YOUR_USERNAME/StudyCrate.git
git branch -M main
git push -u origin main
```

### 2. Deploy Frontend
- Go to https://vercel.com and sign in with GitHub
- Click **Add New...** → **Project**
- Select your **StudyCrate** repository
- Vercel auto-detects Next.js; click **Deploy**
- Wait ~2 minutes
- You'll get a URL like: `https://studycrate.vercel.app`

### 3. Set Frontend Environment Variables
In Vercel Dashboard:
- Go to your project → **Settings** → **Environment Variables**
- Add (if needed, usually auto-detected):
  ```
  NEXT_PUBLIC_API_BASE=https://your-backend-railway.up.railway.app
  NEXT_PUBLIC_BRAND_NAME=StudyCrate
  NEXT_PUBLIC_SUPPORT_EMAIL=csrepo34@gmail.com
  ```
- Re-deploy to apply changes

---

## Backend Deployment (Render.com)

### 1. Connect to Render
- Go to https://render.com and sign up (free with GitHub)
- Click **New +** → **Web Service**
- Connect your GitHub account if not already
- Select your **csrepowebsite** repository

### 2. Configure Web Service
- **Name**: `studycrate-backend` (or any name)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 3. Configure Environment Variables
In Render Dashboard (before deploy):
- Click **Advanced** → **Add Environment Variable**
- Add these one by one:
  ```
  PORT=10000
  NODE_ENV=production
  JWT_SECRET=your-super-secret-random-key-change-this
  RAZORPAY_KEY_ID=rzp_test_xxx
  RAZORPAY_KEY_SECRET=your_key_secret
  CLIENT_URL=https://your-vercel-app.vercel.app
  MAIL_FROM=support@studycrate.com
  FILE_STORAGE_ROOT=./uploads
  ```
- Click **Create Web Service**

### 4. Get Backend URL
- Wait ~3-5 minutes for first deploy
- Once live, you'll get: `https://studycrate-backend.onrender.com`
- Test health: `https://studycrate-backend.onrender.com/api/health` → should return `{"status":"ok"}`

---

## Connect Frontend ↔ Backend

### Update Frontend API Base
In Vercel:
- Go to **Settings** → **Environment Variables**
- Set `NEXT_PUBLIC_API_BASE` to your **Render backend URL** (e.g., `https://studycrate-backend.onrender.com`)
- **Important**: No trailing slash!
- Go to **Deployments** tab → Click **...** on latest → **Redeploy**

---

## Configure Razorpay

### Get Live Keys (Optional)
- Go to https://razorpay.com/dashboard
- Settings → API Keys
- For testing: use **Test Keys**
- For live: use **Live Keys** (need KYC)

### Add Website Link
In Razorpay Dashboard:
- Settings → Website
- Add: `https://studycrate.vercel.app` (your Vercel URL)

### Add Webhook (Optional)
- Settings → Webhooks
- Add URL: `https://studycrate-backend.onrender.com/api/webhooks/razorpay`
- Events: `payment.authorized`

**Note**: Free Render services sleep after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up. Upgrade to paid ($7/month) for always-on service.

---

## Test Live Deployment

1. Open https://studycrate.vercel.app
2. Go to **Products**
3. Click **Buy**
4. Enter email + name
5. Use test card: `4111111111111111` (expiry: any future date, CVV: any 3 digits)
6. Confirm payment
7. Check your email for receipt + download link

---

## Troubleshooting

### Frontend build fails
- Check `npm run build` locally: `cd frontend && npm run build`
- Vercel logs show error; fix and push again

### Backend won't start
- Check logs: Render Dashboard → **Logs** tab
- Verify all env vars are set correctly
- Ensure JWT_SECRET and Razorpay keys are not empty
- Check `backend/package.json` has `"start": "node src/server.js"`

### Payment fails
- Verify CLIENT_URL in backend matches frontend origin
- Check Razorpay keys are correctly set
- Test with Razorpay test mode first

### Downloads fail
- Ensure product files exist: `backend/uploads/product_*.pdf`
- Check JWT_SECRET is consistent between local & Render
- Verify backend is running: `curl https://studycrate-backend.onrender.com/api/health`
- **Note**: Render's free tier has ephemeral storage - uploaded files are deleted on restart. For production, use AWS S3 or similar.

---

## Cost

- **Vercel**: Free tier covers unlimited deployments, 100GB bandwidth/month
- **Render**: Free tier gives 750 hours/month (plenty for startup; service sleeps after 15 min idle)
- **Razorpay**: 2% fee per transaction (test mode is free)

**To keep costs at $0/month**: Use free tiers for both. Backend will sleep when idle but wakes on first request (~30 sec delay).

---

## Next Steps

1. ✅ Push code to GitHub (done: `csrepo34-debug/csrepowebsite`)
2. Deploy frontend to Vercel
3. Deploy backend to Render.com
4. Connect frontend to backend (update NEXT_PUBLIC_API_BASE)
5. Add Razorpay website link
6. Test live checkout with test card
7. Update Razorpay to live keys when ready to accept real payments
