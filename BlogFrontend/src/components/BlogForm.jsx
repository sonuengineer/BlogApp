import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../api/api';

const BlogForm = ({ existingBlog , onSubmitSuccess }) => {
  const [title, setTitle] = useState(existingBlog?.title || '');
  const [content, setContent] = useState(existingBlog?.content || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, content };
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage during login

    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Attach token to Authorization header
      }
    };
    try {
        debugger 
      if (existingBlog._id) {
        // Update existing blog
        await api.put(`/blogs/${existingBlog._id}`, blogData,config);
      } else {
        // Create new blog
        await api.post('/blogs', blogData,config);
      }
    //  await api.post('/blogs', blogData,config);
      onSubmitSuccess();
      // Reset form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
      {existingBlog._id ? 'Update Blog' : 'Add Blog'}
      </Button>
    </Box>
  );
};

export default BlogForm;
