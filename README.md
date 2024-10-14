# BlogApp

#Folder Stucture For Backend
backend/
│
├── config/                # Environment variables, DB config
│   └── db.js              # MongoDB connection
├── controllers/           # Controllers for handling business logic
│   └── authController.js  # Auth-related logic (login/signup)
│   └── blogController.js  # Blog management logic (CRUD)
├── models/                # Models for database schemas
│   └── user.js            # User schema
│   └── blog.js            # Blog schema
├── routes/                # Route handlers for different endpoints
│   └── authRoutes.js      # Auth routes
│   └── blogRoutes.js      # Blog routes
├── middleware/            # Middleware for authentication, logging
│   └── authMiddleware.js  # JWT authentication check
│   └── logger.js          # Logger middleware
├── services/              # Services for handling reusable logic
│   └── authService.js     # User auth service
│   └── blogService.js     # Blog service (CRUD)
├── swagger/               # Swagger documentation setup
│   └── swagger.json       # API docs configuration
├── utils/                 # Utility functions like error handling, etc.
│   └── logger.js          # Logger setup (e.g., Winston)
├── app.js                 # Express app setup
├── server.js              # Server entry point
└── .env                   # Environment variables
