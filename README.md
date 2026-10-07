# URL Shortener

A simple and fast RESTful API that allows users to shorten long URLs and track their usage with built-in statistics.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: SQLite with Drizzle ORM
- **Validation**: Joi
- **Security**: Helmet
- **Logger**: Pino
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm (>= 11.18.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Kazuya-Labs/url-shortener
cd url-shortener
```

2. Install dependencies:

```bash
pnpm install
```

3. Generate database schema:

```bash
pnpm run db:generate
```

4. Run migrations:

```bash
pnpm run db:migrate
```

### Running the Server

**Development mode** (with auto-reload):

```bash
pnpm run dev
```

**Build for production**:

```bash
pnpm run build
```

**Start production server**:

```bash
pnpm run start
```

The server runs on **http://localhost:3000** by default.

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### 1. Create a Short URL

**Request**:

```http
POST /api/v1/shorten
Content-Type: application/json

{
  "url": "https://www.example.com/some/long/url"
}
```

**Success Response** (201 Created):

```json
{
  "success": true,
  "message": "newly created short URL",
  "data": {
    "id": 1,
    "url": "https://www.example.com/some/long/url",
    "code": "abc123def",
    "createdAt": "2024-10-07T10:30:00.000Z",
    "updatedAt": "2024-10-07T10:30:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):

```json
{
  "success": false,
  "message": "Invalid URL format"
}
```

---

### 2. Retrieve Original URL

**Request**:

```http
GET /api/v1/shorten/abc123def
```

**Success Response** (200 OK):

```json
{
  "success": true,
  "message": "success get details",
  "data": {
    "id": 1,
    "url": "https://www.example.com/some/long/url",
    "code": "abc123def",
    "createdAt": "2024-10-07T10:30:00.000Z",
    "updatedAt": "2024-10-07T10:35:00.000Z"
  }
}
```

**Error Response** (404 Not Found):

```json
{
  "success": false,
  "message": "abc123def was not found"
}
```

> **Note**: Each time you retrieve a short URL, the view count is automatically incremented by 1.

---

### 3. Update Short URL

**Request**:

```http
PUT /api/v1/shorten/abc123def
Content-Type: application/json

{
  "url": "https://www.example.com/some/updated/url"
}
```

**Success Response** (200 OK):

```json
{
  "success": true,
  "message": "success update abc123def",
  "data": {
    "id": 1,
    "url": "https://www.example.com/some/updated/url",
    "code": "abc123def",
    "createdAt": "2024-10-07T10:30:00.000Z",
    "updatedAt": "2024-10-07T10:40:00.000Z"
  }
}
```

**Error Responses**:

- **400 Bad Request** - Invalid request body
- **404 Not Found** - Short code does not exist

---

### 4. Delete Short URL

**Request**:

```http
DELETE /api/v1/shorten/abc123def
```

**Success Response** (203 Non-Authoritative Information):

Empty response body with status 203

**Error Response** (404 Not Found):

```json
{
  "success": false,
  "message": "abc123def was not found"
}
```

---

### 5. Get URL Statistics

**Request**:

```http
GET /api/v1/shorten/abc123def/stats
```

**Success Response** (200 OK):

```json
{
  "success": true,
  "message": "Succes get details abc123def",
  "data": {
    "id": 1,
    "url": "https://www.example.com/some/long/url",
    "code": "abc123def",
    "views": 15,
    "createdAt": "2024-10-07T10:30:00.000Z",
    "updatedAt": "2024-10-07T11:00:00.000Z"
  }
}
```

**Error Response** (404 Not Found):

```json
{
  "success": false,
  "message": "abc123def was not found"
}
```

---

## Database Schema

The application uses SQLite with the following table structure:

```sql
Table: data_url
├── id (INTEGER, PRIMARY KEY, AUTO INCREMENT)
├── url (TEXT, NOT NULL)
├── code (TEXT, NOT NULL, UNIQUE)
├── views (INTEGER, DEFAULT 0)
├── createdAt (TIMESTAMP)
└── updatedAt (TIMESTAMP)
```

- **id**: Unique identifier for each short URL record
- **url**: The original long URL
- **code**: The unique short code (e.g., "abc123def")
- **views**: Number of times this short URL has been accessed
- **createdAt**: Timestamp when the short URL was created
- **updatedAt**: Timestamp of the last modification or access

---

## Project Structure

```
url-shortener/
├── src/
│   ├── index.ts                          # Main application entry point
│   ├── controler/
│   │   └── shorten/
│   │       ├── shorten.ts               # Route handlers
│   │       └── shorten.service.ts       # Business logic & database operations
│   ├── database/
│   │   ├── db.ts                        # Database connection
│   │   └── schema/
│   │       └── urls.ts                  # Drizzle ORM schema
│   ├── middleware/
│   │   └── validateBody.ts              # Request body validation
│   └── lib/
│       └── serialisasi.ts               # Response formatting utility
├── test/
│   ├── dev.http                         # HTTP test requests (REST client)
│   └── shorten.ts                       # Unit tests
├── drizzle/                             # Generated SQL migrations
├── drizzle.config.ts                    # Drizzle ORM configuration
├── tsconfig.json                        # TypeScript configuration
└── package.json                         # Project dependencies & scripts
```

---

## Key Features

✅ **Fast URL Shortening** - Generate unique short codes using cryptographic randomness  
✅ **View Tracking** - Automatic increment of view count on each retrieval  
✅ **CRUD Operations** - Full support for Create, Read, Update, Delete operations  
✅ **Input Validation** - Request body validation using Joi  
✅ **Security** - Helmet middleware for HTTP security headers  
✅ **Unique Codes** - Automatic retry mechanism to ensure unique short codes  
✅ **Type Safety** - Full TypeScript support for better development experience  
✅ **JSON Response** - Consistent response format for all endpoints  

---

## Development

### Available Scripts

```bash
pnpm run dev          # Start development server with auto-reload
pnpm run build        # Compile TypeScript to JavaScript
pnpm run start        # Run compiled production server
pnpm run test         # Run tests
pnpm run db:generate  # Generate database migrations from schema
pnpm run db:migrate   # Apply pending migrations to database
```

### Testing API Endpoints

Use the included HTTP client file at `test/dev.http` to test endpoints in VS Code with the REST Client extension.

---

## Configuration

### Environment Variables

Create a `.env` file if needed (currently uses SQLite with local file: `./sqlite.db`)

### Security Notes

- Helmet is enabled for security headers
- Request body size is limited to 1KB
- URL parameter limit set to 100
- All URLs are validated using URI format validation

---

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- **200 OK** - Successful GET/PUT request
- **201 Created** - Successful POST request (new short URL created)
- **203 Non-Authoritative Information** - Successful DELETE request
- **400 Bad Request** - Invalid request body or parameters
- **404 Not Found** - Short code does not exist

---

## Performance Considerations

- **Short Codes**: Generated using 5 random bytes converted to hex (10 character strings)
- **Retry Logic**: Up to 3 attempts to generate a unique code
- **Database**: SQLite is optimized for read-heavy workloads (perfect for URL redirection)
- **Request Limits**: 1KB max body size prevents abuse

---

## Future Enhancements

- [ ] Custom short codes (user-defined instead of random)
- [ ] URL expiration/TTL support
- [ ] Rate limiting per IP address
- [ ] Analytics dashboard
- [ ] QR code generation for short URLs
- [ ] Batch shortening API
- [ ] PostgreSQL support

---

## Project Origin

This project is based on the [URL Shortening Service](https://roadmap.sh/projects/url-shortening-service) from [roadmap.sh](https://roadmap.sh).

---

## License

ISC

---

## Support

For issues or feature requests, please create an issue on the GitHub repository.
