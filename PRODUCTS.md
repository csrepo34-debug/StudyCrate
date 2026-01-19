# Product File Management

## Adding a New Product

## 1. Create Product Entry
Edit `frontend/lib/products.js` and add a new product:
```javascript
{
  _id: '6',
  title: 'Your Product Title',
  description: 'Short description',
  category: 'Programming', // or DSA, ML, DS, DAA, Others
  price: 299,
  isActive: true
}
```

## 2. Upload Product File
- Place your file at: `backend/uploads/product_6.pdf`
- Naming convention: `product_{_id}.pdf`
- Format: PDF, ZIP, or any downloadable file

## 3. Test
- Restart frontend to see new product
- Click product → Buy Now → Test checkout

## Current Products
```
product_1.pdf  ← DSA Complete Notes
product_2.pdf  ← Web Dev Bootcamp Code Pack
product_3.pdf  ← ML Interview Questions
product_4.pdf  ← System Design Guide
product_5.pdf  ← Data Science Cheatsheet
```

## File Size Limits
- Default: 2MB per file (configured in backend)
- Adjust in `backend/src/server.js` if needed

## Sharing Download Links
- After purchase, download link sent to customer email
- Link format: `http://localhost:5000/api/download/{jwt_token}`
- Token valid for 7 days from purchase date

## Manual Order Tracking
Since there's no database, track orders manually:
- Email receipts are sent to customer's email address
- Each receipt contains Order ID and product name
- Copy Order ID + Customer Email to your Excel sheet
- Use receipts as proof for disputes/refunds
