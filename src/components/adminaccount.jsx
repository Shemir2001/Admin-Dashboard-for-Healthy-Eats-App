import React, { useState, useEffect } from 'react';

import {auth } from './firebase';
import { db } from './firebase';
import { 
  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 

  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { PlusCircle, Trash2, Edit, Save, X, User, ChevronDown } from 'lucide-react';

// Your Firebase configuration
// Replace with your actual Firebase config


// Initialize Firebase

const AdminAccountManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '', name: '', role: 'admin' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Available roles (for future scope)
  const roles = [
    { id: 'admin', name: 'Admin', permissions: ['read', 'write', 'delete', 'manage_users'] },
    { id: 'editor', name: 'Editor', permissions: ['read', 'write'] },
    { id: 'viewer', name: 'Viewer', permissions: ['read'] },
  ];

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchAdmins();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "admins"));
      const adminsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdmins(adminsList);
    } catch (error) {
      setError('Failed to fetch admin accounts');
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleRoleChange = (role) => {
    setNewAdmin({ ...newAdmin, role: role });
    setIsRoleDropdownOpen(false);
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        newAdmin.email, 
        newAdmin.password
      );
      
      // Add user data to Firestore
      await addDoc(collection(db, "admins"), {
        uid: userCredential.user.uid,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
        createdAt: new Date().toISOString(),
        createdBy: currentUser ? currentUser.email : 'system'
      });

      setSuccess('Admin account created successfully');
      setNewAdmin({ email: '', password: '', name: '', role: 'admin' });
      setIsAddModalOpen(false);
      fetchAdmins();
    } catch (error) {
      setError(error.message);
      console.error("Error adding admin:", error);
    }
  };

  const startEditAdmin = (admin) => {
    setEditingAdmin({
      ...admin,
      password: '' // Don't include the password in the edit form
    });
  };

  const cancelEdit = () => {
    setEditingAdmin(null);
  };

  const updateAdmin = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      const adminRef = doc(db, "admins", editingAdmin.id);
      const updateData = {
        name: editingAdmin.name,
        role: editingAdmin.role,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser ? currentUser.email : 'system'
      };
      
      await updateDoc(adminRef, updateData);
      
      setSuccess('Admin account updated successfully');
      setEditingAdmin(null);
      fetchAdmins();
    } catch (error) {
      setError(error.message);
      console.error("Error updating admin:", error);
    }
  };

  const deleteAdmin = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin account?')) {
      clearMessages();
      
      try {
        await deleteDoc(doc(db, "admins", adminId));
        // Note: This doesn't delete the user from Firebase Auth
        // For security, that would typically be done via Cloud Functions
        
        setSuccess('Admin account deleted successfully');
        fetchAdmins();
      } catch (error) {
        setError(error.message);
        console.error("Error deleting admin:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Account Management</h1>
        <p className="text-gray-600 mt-2">Manage administrator accounts and permissions</p>
      </header>

      {/* Error and Success Messages */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Success</p>
              <p className="text-sm">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Administrator Accounts</h2>
          <p className="text-sm text-gray-500">{admins.length} accounts found</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Admin
        </button>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  {editingAdmin && editingAdmin.id === admin.id ? (
                    // Edit mode
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="name"
                          value={editingAdmin.name}
                          onChange={(e) => setEditingAdmin({...editingAdmin, name: e.target.value})}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {admin.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            type="button"
                            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                          >
                            {roles.find(r => r.id === editingAdmin.role)?.name || editingAdmin.role}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </button>

                          {isRoleDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {roles.map((role) => (
                                  <button
                                    key={role.id}
                                    onClick={() => {
                                      setEditingAdmin({...editingAdmin, role: role.id});
                                      setIsRoleDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    {role.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(admin.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button 
                          onClick={updateAdmin}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Save className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </>
                  ) : (
                    // View mode
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${admin.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                            admin.role === 'editor' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {roles.find(r => r.id === admin.role)?.name || admin.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(admin.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => startEditAdmin(admin)} 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => deleteAdmin(admin.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No admin accounts found. Click "Add New Admin" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Admin Account</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={addAdmin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAdmin.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newAdmin.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter password"
                  required
                  minLength="6"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  >
                    {roles.find(r => r.id === newAdmin.role)?.name || newAdmin.role}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>

                  {isRoleDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {roles.map((role) => (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => handleRoleChange(role.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {role.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">Role-based permissions are in future scope</p>
              </div>
              
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccountManagement;