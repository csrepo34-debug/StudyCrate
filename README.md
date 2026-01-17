# StudyCrate – Digital Study Store

Anonymous, student-focused storefront for selling PDFs/code bundles. **No database required.** Hardcoded products, guest checkout with Razorpay test payments, time-limited download links, and email receipts.

## Stack
- Frontend: Next.js 14, React, Tailwind CSS (hardcoded products)
- Backend: Node.js, Express (minimal; Razorpay + email only)
- Payments: Razorpay (test mode) with signature verification
- Files: Local storage; time-limited JWT download tokens
- Deployment: Vercel (frontend) + Railway/Render (backend)

## Quick Start
1) Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

2) Set up env files
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and set:
# - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (test keys from Razorpay dashboard)
# - JWT_SECRET (any random string, e.g., your-secret-key-here)
# - MAIL_* if you want auto-email receipts (optional; can do manually)
# - CLIENT_URL=http://localhost:3001

# Frontend
cp frontend/.env.example frontend/.env
# Default: NEXT_PUBLIC_API_BASE=http://localhost:5000
```

3) Start backend
```bash
cd backend
npm run dev
# Should start on http://localhost:5000
```

4) Start frontend (in another terminal)
```bash
cd frontend
npm run dev
# Should start on http://localhost:3001 or :3000
```

5) Test
- Open http://localhost:3001 (or :3000)
- Click **Products**
- Choose a product, click **Buy now**
- Enter name & email, proceed to Razorpay test checkout
- Use test card: `4111111111111111` with any future date & CVV
- After successful payment, download link sent to email (if mail configured)

## How It Works

### Products
- Hardcoded in [frontend/lib/products.js](frontend/lib/products.js)
- Edit the `PRODUCTS` array to add/update products
- Each product needs a file at `backend/uploads/product_{id}.pdf`

### Payment Flow
1. Customer enters name & email
2. Frontend → Backend: `POST /api/checkout` (creates Razorpay order)
3. Razorpay Checkout opens
4. Customer pays with test card
5. On success → Frontend: `POST /api/verify` (verifies signature)
6. Backend generates JWT token, sends email with download link
7. Customer clicks link → `GET /api/download/{token}` (serves file)
8. Token valid for 7 days

### Order Tracking
- Orders stored **in-memory** (cleared on backend restart)
- For permanent records, **you manually track in Excel** (email receipts + order IDs)
- Each order has: order ID, product, customer email, payment date

## File Upload
1. Add product file to `backend/uploads/product_{id}.pdf` (e.g., `product_1.pdf`)
2. Add product to [frontend/lib/products.js](frontend/lib/products.js)
3. Restart frontend to see new product

## Email Receipts (Optional)
If you want auto email receipts with download links:
1. Set `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` in backend/.env
2. Backend will auto-send receipt on successful payment
3. Otherwise, email goes to support inbox; you forward manually

## Razorpay Setup
- Signup free at https://razorpay.com
- Get test API keys from Dashboard → Settings → API Keys
- Copy `KEY_ID` and `KEY_SECRET` to backend/.env

## Compliance Pages
- Footer links: Privacy, Terms, Refund, About, Contact
- Edit [frontend/app/(legal)](frontend/app/(legal)) to customize

## Deployment

### Vercel (Frontend)
```bash
cd frontend
vercel deploy
# Set NEXT_PUBLIC_API_BASE to your backend URL
```

### Railway/Render (Backend)
1. Push to GitHub
2. Connect repo to Railway/Render
3. Set env vars (same as backend/.env)
4. Deploy

## Notes
- No authentication required (guests only)
- No database (no dependencies on Mongo/Postgres)
- Test mode only (change Razorpay keys to live mode for real payments)
- Manual order tracking (Excel or email receipts)
- Each deployment restart clears in-memory orders

## Troubleshooting
- **Backend won't start**: Check RAZORPAY_KEY_ID is set in backend/.env
- **Frontend can't reach backend**: Verify CLIENT_URL in backend/.env matches frontend origin
- **File download fails**: Ensure file exists at `backend/uploads/product_{id}.pdf`
- **Email not sending**: Verify MAIL_* env vars or skip email (manual process)

## License
Personal-use license only. No redistribution or resale.

