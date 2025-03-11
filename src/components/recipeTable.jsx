import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import Colors from "../color.js";

const AdminRecipeTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const recipesCollection = collection(db, "Recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecipes(recipesList);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = () => {
    navigate("/recipes/newrecipe");
  };

  const handleEditRecipe = (recipeId) => {
    navigate(`/recipes/edit/${recipeId}`);
  };

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!recipeToDelete) return;
    
    try {
      await deleteDoc(doc(db, "Recipes", recipeToDelete.id));
      setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete.id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      setDeleteDialogOpen(false);
      setRecipeToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRecipeToDelete(null);
  };

  return (
    <Box >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Recipe Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRecipe}
          style={{ backgroundColor: Colors.buttonBg }}
        >
          Add Recipe
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead style={{ backgroundColor: Colors.secondaryBg }}>
              <TableRow>
                <TableCell width="40%"><Typography fontWeight="bold">Recipe Name</Typography></TableCell>
                <TableCell width="20%"><Typography fontWeight="bold">Trending</Typography></TableCell>
                <TableCell width="20%"><Typography fontWeight="bold">Created At</Typography></TableCell>
                <TableCell width="20%" align="center"><Typography fontWeight="bold">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography py={3} color="text.secondary">
                      No recipes found. Click 'Add Recipe' to create one.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                recipes.map((recipe) => (
                  <TableRow key={recipe.id} hover>
                    <TableCell>{recipe.recipeName}</TableCell>
                    <TableCell>
                      {recipe.trendingNow ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {recipe.createdAt ? new Date(recipe.createdAt.toDate()).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEditRecipe(recipe.id)}
                        title="Edit Recipe"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick(recipe)}
                        title="Delete Recipe"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{recipeToDelete?.recipeName}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminRecipeTable;