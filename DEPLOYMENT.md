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
  NEXT_PUBLIC_SUPPORT_EMAIL=support@studycrate.com
  ```
- Re-deploy to apply changes

---

## Backend Deployment (Railway)

### 1. Connect to Railway
- Go to https://railway.app and sign up (free)
- Click **New Project** → **Deploy from GitHub repo**
- Select your **StudyCrate** repository
- Railway auto-detects Node.js

### 2. Configure Environment Variables
In Railway Dashboard:
- Go to your service → **Variables**
- Add these:
  ```
  PORT=5000
  JWT_SECRET=your-super-secret-random-key
  RAZORPAY_KEY_ID=rzp_test_xxx
  RAZORPAY_KEY_SECRET=your_key_secret
  CLIENT_URL=https://studycrate.vercel.app
  MAIL_FROM=support@studycrate.com
  FILE_STORAGE_ROOT=./uploads
  ```
- Railway will auto-deploy

### 3. Get Backend URL
- In Railway Dashboard, click your service
- Look for **Public URL** or **Domain**
- You'll get: `https://edu-digital-backend-production-xxxx.up.railway.app`

---

## Connect Frontend ↔ Backend

### Update Frontend API Base
In Vercel:
- Go to **Settings** → **Environment Variables**
- Set `NEXT_PUBLIC_API_BASE` to your **Railway backend URL**
- Re-deploy frontend

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
- Add URL: `https://your-backend-railway.up.railway.app/api/webhooks/razorpay`
- Events: `payment.authorized`

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
- Check logs: Railway Dashboard → **Logs** tab
- Verify all env vars are set correctly
- Ensure JWT_SECRET and Razorpay keys are not empty

### Payment fails
- Verify CLIENT_URL in backend matches frontend origin
- Check Razorpay keys are correctly set
- Test with Razorpay test mode first

### Downloads fail
- Ensure product files exist: `backend/uploads/product_*.pdf`
- Check JWT_SECRET is consistent between local & Railway
- Verify backend is running: `curl https://your-backend-url/health`

---

## Cost

- **Vercel**: Free tier covers unlimited deployments, 100GB bandwidth/month
- **Railway**: Free tier gives $5/month credit (plenty for startup)
- **Razorpay**: 2% fee per transaction (test mode is free)

---

## Next Steps

1. Push code to GitHub
2. Deploy frontend to Vercel
3. Deploy backend to Railway
4. Add Razorpay website link
5. Test live checkout with test card
6. Update Razorpay to live keys when ready to accept real payments
