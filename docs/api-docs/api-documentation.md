# API Documentation

## Authentication
All API requests require authentication using JWT (JSON Web Tokens). Include the token in the Authorization header of your requests:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Base URL
The base URL for all API endpoints is: `https://api.nimship.com/v1`

## Endpoints

### User Management

#### GET /users
Retrieves a list of users.

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "driver"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

#### POST /users
Creates a new user.

**Request Body:**
```json
{
  "username": "new_user",
  "email": "newuser@example.com",
  "password": "securepassword",
  "role": "driver"
}
```

**Response:**
```json
{
  "id": 2,
  "username": "new_user",
  "email": "newuser@example.com",
  "role": "driver"
}
```

#### PUT /users/{id}
Updates an existing user.

**Request Body:**
```json
{
  "email": "updated_email@example.com",
  "role": "admin"
}
```

**Response:**
```json
{
  "id": 2,
  "username": "new_user",
  "email": "updated_email@example.com",
  "role": "admin"
}
```

#### DELETE /users/{id}
Deletes a user.

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

### Driver Management

#### GET /drivers
Retrieves a list of drivers.

**Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `status` (optional): Filter by driver status ('active', 'inactive')

**Response:**
```json
{
  "drivers": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "status": "active",
      "vehicle_type": "sedan"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

#### POST /drivers
Creates a new driver.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1987654321",
  "vehicle_type": "suv"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1987654321",
  "status": "active",
  "vehicle_type": "suv"
}
```

#### PUT /drivers/{id}
Updates an existing driver.

**Request Body:**
```json
{
  "status": "inactive",
  "vehicle_type": "van"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1987654321",
  "status": "inactive",
  "vehicle_type": "van"
}
```

#### DELETE /drivers/{id}
Deletes a driver.

**Response:**
```json
{
  "message": "Driver deleted successfully"
}
```

## Error Handling
The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

- 2xx range indicate success
- 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, etc.)
- 5xx range indicate an error with our servers

All error responses will include a JSON object with an `error` key containing a human-readable error message:

```json
{
  "error": "Invalid or expired token"
}
```

## Rate Limiting
API requests are limited to 100 requests per minute per IP address. If you exceed this limit, you'll receive a 429 Too Many Requests response. The response will include a Retry-After header indicating how long to wait before making another request.

## Changelog

### v1.1.0 - 2023-05-25
- Added driver management endpoints
- Improved error responses

### v1.0.0 - 2023-05-01
- Initial API release
