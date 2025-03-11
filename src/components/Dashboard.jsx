import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { auth } from './firebase';
import { Spin, message } from 'antd';
import Userlist from './userLists.jsx';
import Addblog from './addBlog.jsx';
import Blogtable from './blogTable.jsx';
import Login from './login.jsx';
import Recipe from './recipe.jsx';
import Passwordreset from './passwordreset.jsx';
import DailyInspiration from './dailyInspiration.jsx';
import Challenges from './challenges.jsx';
import Recipetable from './recipeTable.jsx';
import Pagenotfound from './pageNotFound.jsx';
import Adminaccount from './adminaccount.jsx';
import Foodmanagement from './foodmanagement.jsx';
import Privacypolicy from './privacypolicy.jsx';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        message.error('You are not logged in! Please sign in to continue.');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Spin className="w-16 h-16" />
        </div>
      );
    }
    return user ? children : <Navigate to="/signin" />;
  };

  const Layout = () => (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden  bg-gray-100 p-2">
          <Outlet />  
        </main>
      </div>
    </div>
  );

  return (
    
      <Routes>
        <Route path="/signin" element={<Login setUser={setUser} />} />
        <Route path="/passwordreset" element={<Passwordreset />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Recipe />} />
          <Route path="users" element={<Userlist />} />
          <Route path="add-blog" element={<Addblog />} />
          <Route path="blog-table" element={<Blogtable />} />
        
          <Route path="daily-inspiration" element={<DailyInspiration />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="recipe" element={<Recipetable />} />
          <Route path="recipes/edit/:id" element={<Recipe />} />
          <Route path="recipes/newrecipe" element={<Recipe />} />
          <Route path="pagenotfound" element={<Pagenotfound />} />
          <Route path="adminaccounts" element={<Adminaccount />} />
          <Route path="foodmanagement" element={<Foodmanagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/pagenotfound" />} />
      </Routes>
  
  );
}

export default App;
