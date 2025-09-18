# User Management API

Backend module for user authentication and management.  
Built with Express.js and PostgreSQL.

## Features

- User registration with email verification
- Login with JWT and refresh tokens
- Password reset flow
- OpenAPI spec included

## OpenAPI Spec

## API Docs

See `openapi.yaml` for endpoints and request/response details.

---

## Design Patterns

### Modular Architecture
The primary features of this project is built modularly for defined separation of business concerns.

### Domain Driven Design
The application layers and functionalities are anchored upon well defined entities that encapsulate their
own behavior and defines the way how they can be used.

### Layered Approach
Multiple layers for separate concerns and responsibilities.

1. Routes define the API paths and directs to the appropriate controller.
2. Controllers extract and validate query data from the HTTP request and sends back appropriate response.
3. Middleware does validations and checks before the request is sent to the business logic.
4. Services implement the business logic for each kind of request.
5. Entities defines the respective main data objects and the methods applicable for them.
6. Repositories handle the data storage.
7. Schemas provide data validation from user input.

#### Input validation

Input is being validated at the route level using validation middleware.

#### Error handling

Errors are being handled depending upon the type of error.

Custom error types are defined as follows:
- Validation Errors: Handled by the controller using validation middleware
- Business Errors: Handled by the service
- Domain Errors: Handled by the entity
