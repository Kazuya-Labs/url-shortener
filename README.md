# url-shortener

simple RESTful API that allows users to shorten long URLs

### HOW TO RUN

```sh
git clone https://github.com/Kazuya-Labs/url-shortener
```

---

Open directory

```sh
cd url-shortener
```

---

Install module

```sh
pnpm i
```

---

Migrate database

```sh
pnpm run db:migrate
```

---

Generate database

```sh
pnpm run db:generate
```

---

## Create Short URL

Create a new short URL using the POST method

```http
POST /shorten
{
  "url": "https://www.example.com/some/long/url"
}
```

Response
The endpoint should validate the request body and return a `201` Created status code with the newly created short URL i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "code": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

---

### Retrieve Original URL

```http
GET /shorten/abc123
```

Response
The endpoint should return a `200` OK status code with the original URL i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "code": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

or a `404` Not Found status code if the short URL was not found. Your frontend should be responsible for retrieving the original URL using the short URL and redirecting the user to the original URL.

```json
{
  "success": false,
  "message ": "abc123 not found"
}
```

---

### Update Short URL

Update an existing short URL using the PUT method

```http
PUT /shorten/abc123
{
  "url": "https://www.example.com/some/updated/url"
}
```

The endpoint should validate the request body and return a `200` OK status code with the updated short URL i.e.

```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "code": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

or a 400 Bad Request status code with error messages in case of validation errors. It should return a 404 Not Found status code if the short URL was not found.

---

### Delete Short URL

Delete an existing short URL using the DELETE method

```http
DELETE /shorten/abc123
```

The endpoint should return a 204 No Content status code if the short URL was successfully deleted or a 404 Not Found status code if the short URL was not found.

---

### Get URL Statistics

Get statistics for a short URL using the GET method

```http
GET /shorten/abc123/stats
```

The endpoint should return a `200` OK status code with the statistics i.e.

```json
{
  "id": "1",
  "views": 10,
  "url": "https://www.example.com/some/long/url",
  "code": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

---

Projects Idea By [roadmap.sh]("https://roadmap.sh/projects/url-shortening-service")

---
