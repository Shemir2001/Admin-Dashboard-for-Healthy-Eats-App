import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Image, Newspaper, Users, Calendar, DollarSign, BarChart2, HelpCircle, Settings } from 'lucide-react';

function Sidebar({ sidebarOpen, toggleSidebar }) {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/users', name: 'Users', icon: <Image size={20} /> },
    { path: '/add-blog', name: 'Blog', icon: <Newspaper size={20} /> },
    { path: '/blog-table', name: 'Blogtable', icon: <Users size={20} /> },
    { path: '/recipe', name: 'Add Recipe', icon: <Calendar size={20} /> },
    { path: '/daily-inspiration', name: 'Daily Inspiration', icon: <Calendar size={20} /> },
    { path: '/challenges', name: 'Challenges', icon: <DollarSign size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart2 size={20} /> },
    { path: '/about-us', name: 'About Us', icon: <HelpCircle size={20} /> },
    { path: '/settings', name: 'Setting', icon: <Settings size={20} /> },
  ];
  
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-gray-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-yellow-500 text-white">
        {sidebarOpen ? (
          <>
            <span className="text-sm font-bold">Healthy Eats</span>
            <button onClick={toggleSidebar} className="p-1 focus:outline-none">
              <ChevronLeft size={20} />
            </button>
          </>
        ) : (
          <button onClick={toggleSidebar} className="p-1 mx-auto focus:outline-none">
            <ChevronRight size={20} />
          </button>
        )}
      </div>
      
      {/* Sidebar Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mt-1 transition-colors duration-200 rounded-md ${
                location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
