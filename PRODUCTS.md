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

| File Name              | Product Name                              | Category              | Price |
|------------------------|-------------------------------------------|-----------------------|-------|
| Beginner_Python.zip    | Python Beginner Level                     | Programming Languages | 300   |
| Intermediate_Python.zip| Python Intermediate Level                 | Programming Languages | 400   |
| Beginner_C.zip         | C Beginner Level                          | Programming Languages | 300   |
| Intermediate_C.zip     | C Intermediate Level                      | Programming Languages | 400   |
| Beginner_EDA.zip       | Exploratory Data Analysis Beginner        | data analysis         | 10    |
| Intermediate_EDA.zip   | Exploratory Data Analysis Intermediate    | data analysis         | 700   |
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
