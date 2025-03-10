import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import colors from '../color.js';
const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [validUntilDate, setValidUntilDate] = useState(new Date());
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'Users');
        const snapshot = await getDocs(usersCollection);
        const usersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch single user when selected
  const handleUserSelect = async (user) => {
    try {
      const docRef = doc(db, 'Users', user.id);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        setSelectedUser({ id: userDoc.id, ...userDoc.data() });
        fetchSubscriptions(userDoc.id);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch subscriptions for the selected user
  const fetchSubscriptions = async (userId) => {
    try {
      const subscriptionsCollection = collection(db, `Users/${userId}/subscriptions`);
      const snapshot = await getDocs(subscriptionsCollection);
      const subscriptionsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscriptions(subscriptionsList);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };
  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  // Add subscription
  const handleAddSubscription = async () => {
    try {
      const subscriptionData = {
        payment: 45.5,
        startfrom: startDate,
        status: true,
        subscribedfrom: "adminuid",
        timestamp: new Date(),
        validuntil: validUntilDate
      };

      await addDoc(collection(db, `Users/${selectedUser.id}/subscriptions`), subscriptionData);
      fetchSubscriptions(selectedUser.id);
      setIsDialogOpen(false);
      message.success("Subscription added successfully!");
    } catch (error) {
      console.error("Error adding subscription:", error);
      message.error("Failed to add subscription.");
    }
  };

  // Open edit dialog for a subscription
  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setStartDate(subscription.startfrom.toDate());
    setValidUntilDate(subscription.validuntil.toDate());
    setIsEditDialogOpen(true);
  };

  // Update subscription
  const handleUpdateSubscription = async () => {
    try {
      const subscriptionData = {
        ...editingSubscription,
        startfrom: startDate,
        validuntil: validUntilDate
      };

      const subscriptionRef = doc(db, `Users/${selectedUser.id}/subscriptions`, editingSubscription.id);
      await updateDoc(subscriptionRef, subscriptionData);
      fetchSubscriptions(selectedUser.id);
      setIsEditDialogOpen(false);
      message.success("Subscription updated successfully!");
    } catch (error) {
      console.error("Error updating subscription:", error);
      message.error("Failed to update subscription.");
    }
  };

  return (
    <div className="container mx-auto p-4" >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="border border-gray-300 rounded-md px-3 py-2 w-64"
        />
      </div>

      <div className={`flex ${selectedUser ? 'space-x-4' : ''}`}>
        {/* Users List */}
        <div className={`${selectedUser ? 'w-1/3' : 'w-full'} transition-all duration-300`}>
          <div className={`${selectedUser ? 'flex flex-col space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  onClick={() => handleUserSelect(user)}
                  className="cursor-pointer border border-gray-300 rounded-lg p-4 hover:shadow-md hover:border-blue-500 transition"
                >
                  {/* Card Content */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{user.name}</h2>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {/* Status Flags */}
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" checked={user.isPremium} readOnly className="mr-1" />
                      Premium
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" checked={user.isBlocked} readOnly className="mr-1" />
                      Blocked
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                No users found
              </div>
            )}
          </div>
        </div>

        {/* User Details (if selected) */}
        {selectedUser && (
          <div className="w-2/3 border rounded-lg p-6 overflow-y-auto h-screen"style={{ backgroundColor: colors.userBg }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedUser.name}'s Profile</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                -
              </button>
            </div>

            <div className="flex space-x-6 mb-6">
              <img
                src={selectedUser.photoUrl || 'https://via.placeholder.com/150'}
                alt={selectedUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1 space-y-1">
                <p><strong>Gender:</strong> {selectedUser.gender}</p>
                <p><strong>Goal:</strong> {selectedUser.goal}</p>
                <p><strong>Height:</strong> {selectedUser.height} {selectedUser.isFt ? 'ft' : 'cm'}</p>
                <p><strong>Weight:</strong> {selectedUser.weight} {selectedUser.isLb ? 'lb' : 'kg'}</p>
                <p><strong>Phone Number:</strong> {selectedUser.phoneNumber || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Account Settings</h3>
                <p><strong>Profile Completed:</strong> {selectedUser.isProfileCompleted ? 'Yes' : 'No'}</p>
                <p><strong>Test User:</strong> {selectedUser.testUser ? 'Yes' : 'No'}</p>
              </div>

              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p><strong>General Notifications:</strong> {selectedUser.notificationEnabled ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Meal Reminder:</strong> {selectedUser.mealReminder ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Water Reminder:</strong> {selectedUser.waterReminder ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Weekly Reminder:</strong> {selectedUser.weeklyReminder ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Subscriptions</h3>
              <button
                onClick={() => setIsDialogOpen(true)}
                className=" text-white px-4 py-2 cursor-pointer rounded mb-4"style={{ backgroundColor: colors.usersButtonBg, color: colors.buttonText }}
              >
                Add Subscription
              </button>
              {subscriptions.map(subscription => (
                <div key={subscription.id} className="border p-4 rounded-lg mb-4">
                  <p><strong>Start Date:</strong> {subscription.startfrom.toDate().toLocaleString()}</p>
                  <p><strong>Valid Until:</strong> {subscription.validuntil.toDate().toLocaleString()}</p>
                  <p><strong>Status:</strong> {subscription.status ? 'Active' : 'Inactive'}</p>
                  <button
                    onClick={() => handleEditSubscription(subscription)}
                    className=" text-white px-3 cursor-pointer py-1 rounded mt-2"style={{ backgroundColor: colors.usersButtonBg, color: colors.buttonText }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Subscription Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add Subscription</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Valid Until</label>
              <DatePicker
                selected={validUntilDate}
                onChange={date => setValidUntilDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="border rounded-md p-2 w-full"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubscription} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Subscription Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Subscription</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Valid Until</label>
              <DatePicker
                selected={validUntilDate}
                onChange={date => setValidUntilDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="border rounded-md p-2 w-full"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateSubscription} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersManagement;