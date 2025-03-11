import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { message } from 'antd';  // Import message from Ant Design

export default function ChallengesManagement() {
  const [challenges, setChallenges] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [challengeName, setChallengeName] = useState('');

  // Fetch Challenges from Firestore
  const fetchChallenges = async () => {
    const snapshot = await getDocs(collection(db, 'Challenges'));
    const challengeList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChallenges(challengeList);
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // Open Dialog for Add/Edit
  const openAddDialog = () => {
    setEditingChallenge(null);
    setChallengeName('');
    setOpenDialog(true);
  };

  const openEditDialog = (challenge) => {
    setEditingChallenge(challenge);
    setChallengeName(challenge.name);
    setOpenDialog(true);
  };

  // Handle Save (Create or Update)
  const handleSaveChallenge = async () => {
    if (!challengeName.trim()) {
      message.error('Challenge name is required');
      return;
    }

    try {
      if (editingChallenge) {
        const challengeRef = doc(db, 'Challenges', editingChallenge.id);
        await updateDoc(challengeRef, { name: challengeName });
        message.success('Challenge updated successfully!');
      } else {
        await addDoc(collection(db, 'Challenges'), {
          name: challengeName,
          createdAt: serverTimestamp(),
          participantsCount: 0,
        });
        message.success('Challenge created successfully!');
      }

      setOpenDialog(false);
      fetchChallenges();
    } catch (error) {
      console.error('Error saving challenge:', error);
      message.error('Failed to save challenge.');
    }
  };

  // Handle Delete
  const handleDeleteChallenge = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await deleteDoc(doc(db, 'Challenges', id));
        message.success('Challenge deleted successfully!');
        fetchChallenges();
      } catch (error) {
        console.error('Error deleting challenge:', error);
        message.error('Failed to delete challenge.');
      }
    }
  };

  return (
    <div className="container mx-auto p-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Challenges</h1>
        <Button variant="contained" color="primary" onClick={openAddDialog}>
          Add New Challenge
        </Button>
      </div>

      {/* Challenges Table */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell><strong>Challenge Name</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell><strong>Participants</strong></TableCell>
              <TableCell><strong>Edit/Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challenges.map((challenge) => (
              <TableRow key={challenge.id}>
                <TableCell>{challenge.name}</TableCell>
                <TableCell>
                  {challenge.createdAt?.toDate().toLocaleString() || 'N/A'}
                </TableCell>
                <TableCell>{challenge.participantsCount || 0}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => openEditDialog(challenge)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteChallenge(challenge.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {challenges.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Challenges Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Challenge Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            label="Challenge Name"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveChallenge} variant="contained">
            {editingChallenge ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
