const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

// Route Imports
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/authRoutes');

// Middleware Imports
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to the database
// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});


// Initialize express app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(cors());

// Use morgan for logging HTTP requests in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Swagger API documentation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Blog Routes
app.use('/api/blogs', blogRoutes);

// User Routes for login and signup
app.use('/api/users', userRoutes);

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Log app start
app.listen(process.env.PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});

module.exports = app;
