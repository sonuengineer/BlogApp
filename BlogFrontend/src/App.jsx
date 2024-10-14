import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EditBlog from './components/EditBlog';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import BlogForm from './components/BlogForm'; // For adding a new blog

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/edit/:id" element={<EditBlog />} /> {/* Route for editing blog */}
        <Route path="/add" element={<BlogForm />} /> {/* Route for adding new blog */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


