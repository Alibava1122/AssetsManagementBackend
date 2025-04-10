# Asset Management Backend

Backend API for the Asset Management mobile application.

## Features

- User Authentication (JWT)
- Dashboard Tiles Management
- Community Posts with Comments and Likes
- AI Chat Integration
- File Uploads (Cloudinary)
- Rate Limiting
- Security Best Practices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary Account
- OpenAI API Key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   OPENAI_API_KEY=your_openai_api_key
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Tiles

- `GET /api/tiles` - Get all tiles for current user
- `GET /api/tiles/:id` - Get single tile
- `PUT /api/tiles/:id/position` - Update tile position

### Posts

- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts/:id/like` - Like a post
- `DELETE /api/posts/:id/like` - Unlike a post
- `POST /api/posts/:id/comments` - Add comment to post
- `DELETE /api/posts/:id/comments/:commentId` - Remove comment from post

### Chat

- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/history` - Get chat history

## Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- CORS Protection
- Helmet Security Headers
- Input Validation
- Error Handling

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Rate Limiting

- Chat API is rate-limited to prevent abuse
- Default: 100 requests per 15 minutes per IP

## File Upload

- Supports image uploads via Cloudinary
- Maximum file size: 5MB
- Supported formats: jpg, jpeg, png, gif

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Start production server
npm start
```

## License

ISC 