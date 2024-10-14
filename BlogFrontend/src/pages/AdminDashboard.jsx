import React, { useState } from 'react';
import BlogForm from '../components/BlogForm';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSignUpSuccess = () => {
    setIsSignUp(false);
    // You may want to redirect or log in the user automatically
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Admin Dashboard</h1>
          <BlogForm existingBlog={blogToEdit} onSubmitSuccess={() => setBlogToEdit(null)} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : isSignUp ? (
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      <button onClick={toggleSignUp}>
        {isSignUp ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
};

export default AdminDashboard;
