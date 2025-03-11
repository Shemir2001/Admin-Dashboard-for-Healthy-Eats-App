import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Divider,
  InputAdornment
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from './firebase'; // Make sure to create this file

const FoodDatabase = () => {
  // State variables
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // New food item form state
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    category: 'other',
    serving_size: '',
    serving_unit: 'g'
  });
  
  // List of food categories
  const categories = [
    'fruits', 'vegetables', 'grains', 'protein', 'dairy', 
    'snacks', 'beverages', 'condiments', 'desserts', 'other'
  ];

  // Fetch foods from Firebase on component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  // Update filtered foods when foods or filters change
  useEffect(() => {
    filterFoods();
  }, [foods, searchTerm, categoryFilter]);

  // Fetch foods from Firebase
  const fetchFoods = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "foods"));
      const foodsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFoods(foodsList);
    } catch (error) {
      console.error("Error fetching foods: ", error);
      showSnackbar("Error loading food database", "error");
    }
  };

  // Filter foods based on search term and category
  const filterFoods = () => {
    let filtered = [...foods];
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(food => food.category === categoryFilter);
    }
    
    setFilteredFoods(filtered);
  };

  // Add a new food to Firebase
  const addFood = async () => {
    // Convert string values to numbers
    const foodToAdd = {
      ...newFood,
      calories: Number(newFood.calories),
      protein: Number(newFood.protein),
      carbs: Number(newFood.carbs),
      fat: Number(newFood.fat),
      serving_size: Number(newFood.serving_size),
      created_at: new Date()
    };
    
    try {
      await addDoc(collection(db, "foods"), foodToAdd);
      fetchFoods();
      showSnackbar(`${newFood.name} added successfully`);
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding food: ", error);
      showSnackbar("Error adding food item", "error");
    }
  };

  // Update a food in Firebase
  const updateFood = async () => {
    // Convert string values to numbers
    const foodToUpdate = {
      ...currentFood,
      calories: Number(currentFood.calories),
      protein: Number(currentFood.protein),
      carbs: Number(currentFood.carbs),
      fat: Number(currentFood.fat),
      serving_size: Number(currentFood.serving_size),
      updated_at: new Date()
    };
    
    try {
      const foodRef = doc(db, "foods", currentFood.id);
      await updateDoc(foodRef, foodToUpdate);
      fetchFoods();
      showSnackbar(`${currentFood.name} updated successfully`);
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating food: ", error);
      showSnackbar("Error updating food item", "error");
    }
  };

  // Delete a food from Firebase
  const deleteFood = async () => {
    try {
      await deleteDoc(doc(db, "foods", currentFood.id));
      fetchFoods();
      showSnackbar(`${currentFood.name} deleted successfully`);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting food: ", error);
      showSnackbar("Error deleting food item", "error");
    }
  };

  // Snackbar message handler
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Dialog handlers
  const handleOpenAddDialog = () => {
    setNewFood({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      category: 'other',
      serving_size: '',
      serving_unit: 'g'
    });
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (food) => {
    setCurrentFood(food);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentFood(null);
  };

  const handleOpenDeleteDialog = (food) => {
    setCurrentFood(food);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentFood(null);
  };

  // Form change handlers
  const handleNewFoodChange = (e) => {
    const { name, value } = e.target;
    setNewFood({
      ...newFood,
      [name]: value
    });
  };

  const handleEditFoodChange = (e) => {
    const { name, value } = e.target;
    setCurrentFood({
      ...currentFood,
      [name]: value
    });
  };

  // Handle search and filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
  };

  // Validate form before submission
  const validateForm = (food) => {
    return (
      food.name.trim() !== '' &&
      !isNaN(food.calories) && 
      !isNaN(food.protein) && 
      !isNaN(food.carbs) && 
      !isNaN(food.fat) &&
      !isNaN(food.serving_size) &&
      food.serving_size > 0
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Food Database
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {/* Search and Filter */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Search foods"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                label="Category"
                onChange={handleCategoryFilterChange}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
              fullWidth
            >
              Add Food
            </Button>
          </Grid>
        </Grid>
        
        {/* Foods Table */}
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="food database table">
            <TableHead>
              <TableRow>
                <TableCell>Food Name</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein (g)</TableCell>
                <TableCell align="right">Carbs (g)</TableCell>
                <TableCell align="right">Fat (g)</TableCell>
                <TableCell align="right">Serving</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell component="th" scope="row">
                      {food.name}
                    </TableCell>
                    <TableCell align="right">{food.calories}</TableCell>
                    <TableCell align="right">{food.protein}</TableCell>
                    <TableCell align="right">{food.carbs}</TableCell>
                    <TableCell align="right">{food.fat}</TableCell>
                    <TableCell align="right">{food.serving_size} {food.serving_unit}</TableCell>
                    <TableCell align="center">
                      {food.category.charAt(0).toUpperCase() + food.category.slice(1)}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton 
                          color="primary" 
                          size="small"
                          onClick={() => handleOpenEditDialog(food)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          color="error" 
                          size="small"
                          onClick={() => handleOpenDeleteDialog(food)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    {foods.length === 0 ? (
                      <Typography>No foods in database. Add your first food item!</Typography>
                    ) : (
                      <Typography>No foods match your search criteria.</Typography>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">
            Total items: {filteredFoods.length} {filteredFoods.length !== foods.length && `(filtered from ${foods.length})`}
          </Typography>
        </Box>
      </Paper>
      
      {/* Add Food Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Food Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Food Name"
                variant="outlined"
                fullWidth
                required
                value={newFood.name}
                onChange={handleNewFoodChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="calories"
                label="Calories"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={newFood.calories}
                onChange={handleNewFoodChange}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="protein"
                label="Protein (g)"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={newFood.protein}
                onChange={handleNewFoodChange}
                InputProps={{
                  inputProps: { min: 0, step: 0.1 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="carbs"
                label="Carbs (g)"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={newFood.carbs}
                onChange={handleNewFoodChange}
                InputProps={{
                  inputProps: { min: 0, step: 0.1 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="fat"
                label="Fat (g)"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={newFood.fat}
                onChange={handleNewFoodChange}
                InputProps={{
                  inputProps: { min: 0, step: 0.1 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="serving_size"
                label="Serving Size"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={newFood.serving_size}
                onChange={handleNewFoodChange}
                InputProps={{
                  inputProps: { min: 0, step: 0.1 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="serving-unit-label">Serving Unit</InputLabel>
                <Select
                  labelId="serving-unit-label"
                  name="serving_unit"
                  value={newFood.serving_unit}
                  label="Serving Unit"
                  onChange={handleNewFoodChange}
                >
                  <MenuItem value="g">Grams (g)</MenuItem>
                  <MenuItem value="ml">Milliliters (ml)</MenuItem>
                  <MenuItem value="oz">Ounces (oz)</MenuItem>
                  <MenuItem value="cup">Cup</MenuItem>
                  <MenuItem value="tbsp">Tablespoon</MenuItem>
                  <MenuItem value="tsp">Teaspoon</MenuItem>
                  <MenuItem value="piece">Piece</MenuItem>
                  <MenuItem value="serving">Serving</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={newFood.category}
                  label="Category"
                  onChange={handleNewFoodChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button 
            onClick={addFood} 
            variant="contained" 
            color="primary"
            disabled={!validateForm(newFood)}
          >
            Add Food
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Food Dialog */}
      {currentFood && (
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
          <DialogTitle>Edit Food Item</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Food Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={currentFood.name}
                  onChange={handleEditFoodChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="calories"
                  label="Calories"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={currentFood.calories}
                  onChange={handleEditFoodChange}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="protein"
                  label="Protein (g)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={currentFood.protein}
                  onChange={handleEditFoodChange}
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="carbs"
                  label="Carbs (g)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={currentFood.carbs}
                  onChange={handleEditFoodChange}
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="fat"
                  label="Fat (g)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={currentFood.fat}
                  onChange={handleEditFoodChange}
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="serving_size"
                  label="Serving Size"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={currentFood.serving_size}
                  onChange={handleEditFoodChange}
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="edit-serving-unit-label">Serving Unit</InputLabel>
                  <Select
                    labelId="edit-serving-unit-label"
                    name="serving_unit"
                    value={currentFood.serving_unit}
                    label="Serving Unit"
                    onChange={handleEditFoodChange}
                  >
                    <MenuItem value="g">Grams (g)</MenuItem>
                    <MenuItem value="ml">Milliliters (ml)</MenuItem>
                    <MenuItem value="oz">Ounces (oz)</MenuItem>
                    <MenuItem value="cup">Cup</MenuItem>
                    <MenuItem value="tbsp">Tablespoon</MenuItem>
                    <MenuItem value="tsp">Teaspoon</MenuItem>
                    <MenuItem value="piece">Piece</MenuItem>
                    <MenuItem value="serving">Serving</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="edit-category-label">Category</InputLabel>
                  <Select
                    labelId="edit-category-label"
                    name="category"
                    value={currentFood.category}
                    label="Category"
                    onChange={handleEditFoodChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button 
              onClick={updateFood} 
              variant="contained" 
              color="primary"
              disabled={!validateForm(currentFood)}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      {currentFood && (
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Food Item</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete <strong>{currentFood.name}</strong>?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={deleteFood} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({...snackbar, open: false})} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FoodDatabase;