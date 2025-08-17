# 🚀 Journal App Backend API

A robust, secure, and scalable backend API for the AI-Powered Daily Journal Application built with Node.js, Express, and MongoDB.

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token generation
- **Password hashing** using bcrypt with salt rounds
- **Input validation** with express-validator
- **Rate limiting** to prevent abuse
- **Helmet.js** for security headers
- **CORS configuration** for cross-origin requests

### 📝 Journal Management
- **CRUD operations** for journal entries
- **Pagination** for large datasets
- **Search functionality** across titles and content
- **Entry statistics** (word count, reading time)
- **Mood tracking** with predefined categories
- **Tags support** for better organization
- **Privacy controls** for entries

### 🛠️ Technical Features
- **MongoDB** with Mongoose ODM
- **Async/await** error handling
- **Express middleware** architecture
- **Environment-based configuration**
- **Comprehensive logging** with Morgan
- **Health check endpoints**
- **Graceful shutdown** handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/journal-app
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get User Profile
```http
GET /api/auth/user
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com",
  "currentPassword": "oldpass",
  "newPassword": "newpass"
}
```

### Journal Entries Endpoints

#### Get All Entries
```http
GET /api/entries?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Single Entry
```http
GET /api/entries/:id
Authorization: Bearer <token>
```

#### Create Entry
```http
POST /api/entries
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Journal Entry",
  "content": "Today was an amazing day...",
  "tags": ["gratitude", "reflection"],
  "mood": "happy",
  "isPrivate": false
}
```

#### Update Entry
```http
PUT /api/entries/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "tags": ["updated", "tags"],
  "mood": "excited"
}
```

#### Delete Entry
```http
DELETE /api/entries/:id
Authorization: Bearer <token>
```

#### Search Entries
```http
GET /api/entries/search?q=searchterm&page=1&limit=10
Authorization: Bearer <token>
```

### Health Check
```http
GET /health
```

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  avatar: String (optional),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Entry Model
```javascript
{
  user: ObjectId (required, ref: User),
  title: String (required, 1-200 chars),
  content: String (required, 1-10000 chars),
  date: Date (default: now),
  tags: [String] (optional),
  mood: String (enum, default: neutral),
  isPrivate: Boolean (default: false),
  wordCount: Number (auto-calculated),
  readingTime: Number (auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLIENT_URL`: Frontend URL for CORS

### Security Features
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation for all inputs
- **Password Requirements**: Minimum 6 chars with complexity
- **JWT Expiration**: 30 days with secure options
- **CORS**: Configured for specific origins

## 🛡️ Security Measures

### Authentication
- JWT tokens with 30-day expiration
- Secure password hashing (bcrypt, 12 salt rounds)
- Token-based session management
- Protected routes with middleware

### Input Validation
- Email format validation
- Username format validation (alphanumeric + underscore)
- Password complexity requirements
- Content length limits
- XSS protection

### Database Security
- MongoDB injection protection
- Input sanitization
- Proper indexing for performance
- Connection pooling

## 📊 Performance Features

### Database Optimization
- **Indexes** on frequently queried fields
- **Connection pooling** for better performance
- **Text search** capabilities
- **Aggregation pipelines** for statistics

### API Features
- **Pagination** for large datasets
- **Search functionality** with regex
- **Caching headers** for static content
- **Compression** for response bodies

## 🧪 Error Handling

### Global Error Handler
- Centralized error processing
- Consistent error response format
- Development vs production error details
- Unhandled promise rejection handling

### Validation Errors
- Detailed validation error messages
- Field-specific error reporting
- Custom validation rules
- Sanitization of inputs

## 📈 Monitoring & Logging

### Logging
- **Morgan** for HTTP request logging
- **Development** vs **production** logging levels
- **Error logging** with stack traces
- **Database connection** status logging

### Health Checks
- **Server status** endpoint
- **Database connectivity** checks
- **Environment information**
- **Timestamp** and uptime data

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure MongoDB Atlas or production DB
4. Set up proper CORS origins
5. Enable rate limiting
6. Use HTTPS in production

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ and lots of ☕ coffee**
