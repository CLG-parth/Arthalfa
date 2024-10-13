# Product Management API

This is a RESTful API built using **Node.js** and **Express.js** for managing products in an inventory system. The API supports basic CRUD (Create, Read, Update, Delete) operations for products and provides validation middleware to ensure data consistency.

## Features

- **Add a new product**: POST `/products`
- **Get a list of all products**: GET `/products?query=query&page=1&limit=2`
- **Get details of a single product by ID**: GET `/products/:id`
- **Update an existing product**: PUT `/products/:id`
- **Delete a product by ID**: DELETE `/products/:id`

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/product-management-api.git
    cd product-management-api
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:

    Create a `.env` file in the root of the project and add the following:

    ```bash
    PORT=8989
    DATABASE_URL=postgres://yourusername:yourpassword@yourhost:5432/yourdbname
    ```

    Replace the values with your actual database credentials.

4. Start the server:

    ```bash
    npm run start
    ```

    The server will run on `http://localhost:8989`.

### API Endpoints

| HTTP Method | Endpoint          | Description                          |
| ----------- | ----------------- | ------------------------------------ |
| `POST`      | `/products`        | Add a new product                    |
| `GET`       | `/products`        | Get a list of all products           |
| `GET`       | `/products/:id`    | Get details of a single product by ID|
| `PUT`       | `/products/:id`    | Update an existing product by ID     |
| `DELETE`    | `/products/:id`    | Delete a product by ID               |

### Request Body

For the **POST** and **PUT** requests, ensure to send the following fields in the request body:

```json
{
  "name": "CSparth",          
  "price": "99",      
  "description": "A product by CS",
  "category": "Omniscient"  
}
```
