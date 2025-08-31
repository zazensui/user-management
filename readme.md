# User Management API

Backend module for user authentication and management.  
Built with Express.js and PostgreSQL.

## Features

- User registration with email verification
- Login with JWT and refresh tokens
- Password reset flow
- OpenAPI spec included

## OpenAPI Spec

### Standard Response Codes
### Success Responses

- `200 OK` - Standard success response for GET, PUT, PATCH operations
- `201 Created` - Success for new user registration or resource creation
- `204 No Content` - Success for logout, DELETE operations, or updates without content

### Client Error Responses

- `400 Bad Request` - Invalid input data, malformed request body, or validation errors
- `401 Unauthorized` - Missing JWT token, expired token, or invalid credentials
- `403 Forbidden` - User lacks permissions for requested operation
- `404 Not Found` - User, profile, or requested resource not found
- `409 Conflict` - Email already registered or resource conflict
- `422 Unprocessable Entity` - Valid syntax but semantic errors (e.g. weak password)
- `429 Too Many Requests` - Rate limit exceeded for login attempts

### Server Error Responses

- `500 Internal Server Error` - Unexpected server errors
- `502 Bad Gateway` - Database connection errors
- `503 Service Unavailable` - System maintenance or temporary overload



## API Docs

See `openapi.yaml` for endpoints and request/response details.

---