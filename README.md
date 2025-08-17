# 📝 AI-Powered Daily Journal Application

A modern, full-stack journaling application that combines the therapeutic benefits of daily writing with AI-powered insights and conversation capabilities. Built with React, Node.js, and MongoDB.

![Journal App](https://img.shields.io/badge/React-19.1.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure authentication system with JWT tokens
- **Password Encryption**: Bcrypt hashing for secure password storage
- **Protected Routes**: Client-side route protection for authenticated users
- **Rate Limiting**: API rate limiting to prevent abuse

### 📖 Journal Management
- **Create Entries**: Rich text journal entries with timestamps
- **View History**: Browse and search through past journal entries
- **Edit & Delete**: Modify or remove existing entries
- **Responsive Design**: Beautiful, mobile-friendly interface

### 🤖 AI Integration
- **AI Chatbot**: Interactive AI assistant for journal-related conversations
- **Smart Insights**: AI-powered analysis of your journal entries
- **Conversational Interface**: Natural language interaction with the AI

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes for comfortable writing
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile

## 🏗️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/B-Kaushik21/AI-Powered-Daily-Journal-App.git
   cd ai-powered-journal-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/journal-app
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start the development servers**

   **Terminal 1 - Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
AI-Powered Daily Journal Application/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── assets/        # Images and other assets
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── package.json
│   └── server.js
└── README.md
```

## 🔧 Available Scripts

### Server Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (placeholder)
```

### Client Scripts
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Journal Entries
- `GET /api/entries` - Get all entries for authenticated user
- `POST /api/entries` - Create a new journal entry
- `PUT /api/entries/:id` - Update an existing entry
- `DELETE /api/entries/:id` - Delete an entry

### AI Features
- `POST /api/ai/chat` - AI chatbot conversation
- `POST /api/ai/analyze` - AI analysis of journal entries

## 🎯 Key Features in Detail

### AI Chatbot
The application includes an intelligent AI chatbot that can:
- Answer questions about journaling
- Provide writing prompts
- Analyze mood patterns
- Offer mental health insights
- Engage in meaningful conversations

### Theme System
- **Light Theme**: Clean, bright interface for daytime use
- **Dark Theme**: Easy on the eyes for evening writing
- **Automatic Toggle**: Switch between themes seamlessly

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for user passwords
- **Rate Limiting**: Protection against API abuse
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: Additional security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for the beautiful styling framework
- **Framer Motion** for smooth animations

## 📞 Support

If you have any questions or need help with the application, please:

1. Check the [Issues](https://github.com/B-Kaushik21/AI-Powered-Daily-Journal-App/issues) page
2. Create a new issue if your problem isn't already addressed
3. Contact the maintainers for urgent issues

---

**Happy Journaling! 📖✨**
