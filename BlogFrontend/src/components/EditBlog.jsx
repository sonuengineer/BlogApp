import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the blog id from the URL
import BlogForm from './BlogForm';
import api from '../api/api';

const EditBlog = () => {
  const { id } = useParams(); // Get blog id from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${id}`);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmitSuccess = () => {
    window.location.href = '/'; // Redirect to the blog list after successful update
  };

  return blog ? (
    <BlogForm existingBlog={blog} onSubmitSuccess={handleSubmitSuccess} />
  ) : (
    <div>Loading...</div>
  );
};

export default EditBlog;
