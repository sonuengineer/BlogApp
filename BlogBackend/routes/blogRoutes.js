const express = require('express');
const { getBlogs, getBlog, addBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware'); // Middleware for role-based access
const router = express.Router();

// Public Routes
router.get('/', getBlogs);            // Get all blogs
router.get('/:id', getBlog);          // Get a single blog by ID

// Admin Routes (Protected)
router.post('/', protect, restrictTo('admin'), addBlog);     // Add a new blog (admin only)
router.put('/:id', protect, restrictTo('admin'), updateBlog); // Update a blog (admin only)
router.delete('/:id', protect, restrictTo('admin'), deleteBlog); // Delete a blog (admin only)

module.exports = router;
