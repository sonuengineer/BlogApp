import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import api from '../api/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('token'); // Get token from localStorage
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null; // Decode JWT to get user role

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
  

    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Attach token to Authorization header
      }
    };

  const deleteBlog = async (blogId) => {
    debugger 
    try {
      const response = await api.delete(`/blogs/${blogId}`,config);
      console.log('Blog deleted successfully:', response.data);
      // Do something after successful deletion
    } catch (error) {
      console.error('Failed to delete blog:', error.response?.data || error);
    }
  };
  

  return (
    <Box>
      {blogs.map(blog => (
        <Box key={blog._id} sx={{ mb: 3, p: 2, border: '1px solid #ccc' }}>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="body1">{blog.content}</Typography>

          {userRole === 'admin' && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.href = `/edit/${blog._id}`}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteBlog(blog._id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default BlogList;
