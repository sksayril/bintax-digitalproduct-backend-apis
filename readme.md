# API Documentation for Razorpay Product Payment Application

This document explains how to call the APIs in the Razorpay Product Payment application built with Express.js, MongoDB, and Razorpay integration. It includes details on the request format and expected responses for each endpoint.

## Base URL
- All APIs are accessible at `http://localhost:3000` (or your deployed server URL).
- Ensure the server is running (`node app.js`) and MongoDB is connected.

## APIs

### 1. Add Product
- **Endpoint**: `POST /api/products`
- **Description**: Adds a new product to the database.
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/products`
  - **Headers**: `Content-Type: application/json`
  - **Body** (JSON):
    ```json
    {
      "name": "Laptop",
      "imageUrl": "https://example.com/laptop.jpg",
      "description": "High-performance laptop",
      "originalPrice": 50000,
      "purchasePrice": 45000
    }
    ```
  - **Example (cURL)**:
    ```bash
    curl -X POST http://localhost:3000/api/products \
    -H "Content-Type: application/json" \
    -d '{"name":"Laptop","imageUrl":"https://example.com/laptop.jpg","description":"High-performance laptop","originalPrice":50000,"purchasePrice":45000}'
    ```
- **Response**:
  - **Success (201)**:
    ```json
    {
      "message": "Product added successfully",
      "product": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Laptop",
        "imageUrl": "https://example.com/laptop.jpg",
        "description": "High-performance laptop",
        "originalPrice": 50000,
        "purchasePrice": 45000,
        "createdAt": "2025-05-19T10:46:00.000Z",
        "__v": 0
      }
    }
    ```
  - **Error (400 - Missing Fields)**:
    ```json
    {
      "error": "All fields are required"
    }
    ```
  - **Error (500 - Server Error)**:
    ```json
    {
      "error": "Failed to add product"
    }
    ```

### 2. Get All Products
- **Endpoint**: `GET /api/products`
- **Description**: Retrieves all products from the database.
- **Request**:
  - **Method**: GET
  - **URL**: `http://localhost:3000/api/products`
  - **Headers**: None
  - **Body**: None
  - **Example (cURL)**:
    ```bash
    curl -X GET http://localhost:3000/api/products
    ```
- **Response**:
  - **Success (200)**:
    ```json
    [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Laptop",
        "imageUrl": "https://example.com/laptop.jpg",
        "description": "High-performance laptop",
        "originalPrice": 50000,
        "purchasePrice": 45000,
        "createdAt": "2025-05-19T10:46:00.000Z",
        "__v": 0
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Phone",
        "imageUrl": "https://example.com/phone.jpg",
        "description": "Latest smartphone",
        "originalPrice": 30000,
        "purchasePrice": 28000,
        "createdAt": "2025-05-19T10:47:00.000Z",
        "__v": 0
      }
    ]
    ```
  - **Error (500 - Server Error)**:
    ```json
    {
      "error": "Failed to fetch products"
    }
    ```

### 3. Add Customer
- **Endpoint**: `POST /api/customers`
- **Description**: Adds a new customer to the database.
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/customers`
  - **Headers**: `Content-Type: application/json`
  - **Body** (JSON):
    ```json
    {
      "name": "John Doe",
      "mobileNumber": "+919876543210",
      "email": "john@example.com"
    }
    ```
  - **Example (cURL)**:
    ```bash
    curl -X POST http://localhost:3000/api/customers \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","mobileNumber":"+919876543210","email":"john@example.com"}'
    ```
- **Response**:
  - **Success (201)**:
    ```json
    {
      "message": "Customer added successfully",
      "customer": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "John Doe",
        "mobileNumber": "+919876543210",
        "email": "john@example.com",
        "createdAt": "2025-05-19T10:48:00.000Z",
        "__v": 0
      }
    }
    ```
  - **Error (400 - Missing Fields)**:
    ```json
    {
      "error": "All fields are required"
    }
    ```
  - **Error (500 - Server Error)**:
    ```json
    {
      "error": "Failed to add customer"
    }
    ```

### 4. Create Razorpay Order
- **Endpoint**: `POST /api/payments/create-order`
- **Description**: Creates a Razorpay order for a payment, linked to a product and customer.
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/payments/create-order`
  - **Headers**: `Content-Type: application/json`
  - **Body** (JSON):
    ```json
    {
      "amount": 45000,
      "productId": "507f1f77bcf86cd799439011",
      "customerId": "507f1f77bcf86cd799439013"
    }
    ```
  - **Example (cURL)**:
    ```bash
    curl -X POST http://localhost:3000/api/payments/create-order \
    -H "Content-Type: application/json" \
    -d '{"amount":45000,"productId":"507f1f77bcf86cd799439011","customerId":"507f1f77bcf86cd799439013"}'
    ```
- **Response**:
  - **Success (200)**:
    ```json
    {
      "key": "YOUR_RAZORPAY_KEY_ID",
      "amount": 4500000,
      "currency": "INR",
      "id": "order_123456789",
      "productId": "507f1f77bcf86cd799439011",
      "customerId": "507f1f77bcf86cd799439013"
    }
    ```
  - **Error (400 - Missing Fields)**:
    ```json
    {
      "error": "Amount, productId, and customerId are required"
    }
    ```
  - **Error (500 - Server Error)**:
    ```json
    {
      "error": "Unable to create order"
    }
    ```

### 5. Verify Payment
- **Endpoint**: `POST /api/payments/verify-payment`
- **Description**: Verifies the Razorpay payment signature after a payment is made.
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/payments/verify-payment`
  - **Headers**: `Content-Type: application/json`
  - **Body** (JSON):
    ```json
    {
      "razorpay_order_id": "order_123456789",
      "razorpay_payment_id": "pay_987654321",
      "razorpay_signature": "generated_signature_from_razorpay"
    }
    ```
  - **Example (cURL)**:
    ```bash
    curl -X POST http://localhost:3000/api/payments/verify-payment \
    -H "Content-Type: application/json" \
    -d '{"razorpay_order_id":"order_123456789","razorpay_payment_id":"pay_987654321","razorpay_signature":"generated_signature_from_razorpay"}'
    ```
  - **Note**: This endpoint is typically called by the frontend after Razorpay processes the payment. The `razorpay_signature` is generated by Razorpay during payment.
- **Response**:
  - **Success (200 - Valid Signature)**:
    ```json
    {
      "status": "success",
      "message": "Payment verified successfully"
    }
    ```
  - **Error (400 - Invalid Signature)**:
    ```json
    {
      "status": "failed",
      "message": "Invalid signature"
    }
    ```

## Testing the APIs
1. **Prerequisites**:
   - Ensure the server is running (`node app.js`).
   - MongoDB is running on `mongodb://localhost:27017`.
   - Replace `YOUR_RAZORPAY_KEY_ID` and `YOUR_RAZORPAY_KEY_SECRET` in `controllers/paymentController.js` with your Razorpay Test Mode API keys (from Razorpay Dashboard).
2. **Testing Workflow**:
   - **Add a Product**: Use the `POST /api/products` endpoint to add a product.
   - **Add a Customer**: Use the `POST /api/customers` endpoint to add a customer.
   - **Get Products**: Use the `GET /api/products` endpoint to verify products are listed.
   - **Create Order**: Use the `POST /api/payments/create-order` endpoint with a product ID and customer ID.
   - **Make Payment**: Use the Razorpay checkout form (via the frontend at `http://localhost:3000`) or simulate a payment with test card details (e.g., Card Number: 4111 1111 1111 1111, any future expiry date, random CVV).
   - **Verify Payment**: The frontend automatically calls `POST /api/payments/verify-payment` after payment completion.
3. **Tools**:
   - Use Postman or cURL for API testing.
   - Use MongoDB Compass to inspect the `products`, `customers`, and `payments` collections in the `razorpay_db` database.

## Notes
- The `amount` in the `create-order` request is in INR (e.g., 45000 for ₹45000). Razorpay converts it to paise (45000 * 100 = 4500000) internally.
- For production, switch to Razorpay Live Mode API keys and complete KYC.
- The frontend (`public/index.html`) provides a UI to interact with these APIs, including forms to add products/customers and initiate payments.

For further assistance, refer to the Razorpay Documentation (https://razorpay.com/docs/) or contact the developer.