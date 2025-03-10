import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Select, 
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Grid,
  Chip
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './firebase.js'; // Adjust this import based on your Firebase setup
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    }
  },
});

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    text: '',
    type: 'tip',
  });
  const [scheduled, setScheduled] = useState(false);
  const [publishDate, setPublishDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      setNotification({
        open: true,
        message: 'Please enter content text',
        severity: 'error'
      });
      return;
    }
    
    if (scheduled && publishDate <= new Date()) {
      setNotification({
        open: true,
        message: 'Scheduled time must be in the future',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare document data
      const docData = {
        text: formData.text,
        type: formData.type,
        createdAt: serverTimestamp(),
      };
      
      // Add scheduling information if enabled
      if (scheduled) {
        docData.status = 'scheduled';
        docData.publishAt = Timestamp.fromDate(publishDate);
      } else {
        docData.status = 'published';
      }
      
      // Add document to Firestore
      await addDoc(collection(db, 'content'), docData);
      
      // Reset form
      setFormData({
        text: '',
        type: 'tip'
      });
      
      setNotification({
        open: true,
        message: scheduled ? 'Content scheduled successfully!' : 'Content published successfully!',
        severity: 'success'
      });
      
    } catch (error) {
      console.error('Error adding document: ', error);
      setNotification({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error'
      });
    }
    
    setLoading(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const toggleScheduled = () => {
    setScheduled(!scheduled);
    // Set default publish time to 1 hour from now if enabling scheduling
    if (!scheduled) {
      const oneHourLater = new Date();
      oneHourLater.setHours(oneHourLater.getHours() + 1);
      setPublishDate(oneHourLater);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 3,
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        width: '100vw', // Ensure full viewport width
      }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
         
         // Full height
          borderRadius: 2,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
              Content Management
            </Typography>
            <Chip 
              icon={scheduled ? <ScheduleIcon /> : <CheckCircleIcon />} 
              label={scheduled ? "Scheduled" : "Publish Now"}
              color={scheduled ? "primary" : "success"}
            />
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Content Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Content Type"
                  >
                    <MenuItem value="tip">Tip</MenuItem>
                    <MenuItem value="quote">Quote</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={scheduled} 
                      onChange={toggleScheduled} 
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ mr: 0.5, fontSize: 20 }} />
                      <Typography>Schedule for later</Typography>
                    </Box>
                  }
                />
              </Grid>
              
              {scheduled && (
                <Grid item xs={12}>
                  <DateTimePicker
                    label="Publish Date & Time"
                    value={publishDate}
                    onChange={(newValue) => setPublishDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    minDateTime={new Date()}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              )}
              
              <Grid item xs={12}>
                <TextField
                  label="Content Text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  placeholder={formData.type === 'tip' ? 
                    "Enter a health tip like: Eat a balanced diet with lots of fruits and vegetables." : 
                    "Enter an inspirational quote here..."
                  }
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button 
                type="button" 
                variant="outlined" 
                onClick={() => {
                  setFormData({ text: '', type: 'tip' });
                  setScheduled(false);
                }}
                disabled={loading}
              >
                Clear
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color={scheduled ? "primary" : "success"} 
                disabled={loading}
                startIcon={scheduled ? <ScheduleIcon /> : <CheckCircleIcon />}
                sx={{ px: 4 }}
              >
                {loading ? 'Saving...' : scheduled ? 'Schedule Content' : 'Publish Now'}
              </Button>
            </Box>
          </form>
          
          {/* Content Preview */}
          {formData.text && (
            <Paper elevation={1} sx={{ mt: 4, p: 3, bgcolor: '#f8f8f8', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Preview:
                </Typography>
                {scheduled && (
                  <Chip 
                    size="small" 
                    icon={<ScheduleIcon fontSize="small" />} 
                    label={`Scheduled: ${publishDate.toLocaleString()}`}
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'white', 
                borderLeft: '4px solid', 
                borderColor: formData.type === 'tip' ? 'primary.main' : 'secondary.main',
                borderRadius: 1
              }}>
                <Typography variant="body1">
                  {formData.text}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Type: {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
                </Typography>
              </Box>
            </Paper>
          )}
        </Paper>
        
        <Snackbar 
          open={notification.open} 
          autoHideDuration={6000} 
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  </ThemeProvider>
  );
};

export default AdminPanel;