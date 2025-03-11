import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Settings, Newspaper, Calendar } from 'lucide-react';
import { CircularProgress } from '@mui/material';
import {auth } from './firebase.js'
import { signOut } from 'firebase/auth';
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract last part of the route for breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPath = pathParts[pathParts.length - 1] || 'Home';

  // Profile dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const [loading, setLoading] = useState(false); // Loading state for sign-out
  const handleSignOut = async () => {
    setLoading(true); // Set loading to true
    handleMenuClose(); // Close the dropdown menu

    try {
      await signOut(auth); // Sign out the user using Firebase
      console.log('User signed out successfully');
      navigate('/signin'); // Redirect to the sign-in page
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };


  return (
    <header className="z-0 px-6 py-1 bg-[#fcf8f6] shadow">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center">
          <span className="text-lg font-semibold">Welcome to</span>
          <span className="ml-2 text-sm text-gray-500">Healthy Eats Management</span>
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center space-x-4">
          {/* Icon Buttons */}
          <IconButton onClick={() => navigate('/settings')}>
            <Settings size={20} className="text-gray-500" />
          </IconButton>
          <IconButton onClick={() => navigate('/news')}>
            <Newspaper size={20} className="text-gray-500" />
          </IconButton>
          <IconButton onClick={() => navigate('/calendar')}>
            <Calendar size={20} className="text-gray-500" />
          </IconButton>

          {/* Profile Section with Dropdown */}
          <div>
            <IconButton onClick={handleMenuOpen}>
              <Avatar src="https://via.placeholder.com/32" alt="Profile" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
              <MenuItem onClick={handleSignOut} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Logout'}
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center mt-0 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        {pathParts.map((part, index) => (
          <React.Fragment key={index}>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 capitalize">{part.replace('-', ' ')}</span>
          </React.Fragment>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
