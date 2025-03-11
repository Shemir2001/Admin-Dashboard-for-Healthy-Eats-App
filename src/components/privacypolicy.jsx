import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import UpdateIcon from '@mui/icons-material/Update';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const PrivacyPolicy = () => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const returnBack=()=>{
    window.location.href = "/"
  }
  
  const handlePrint = () => {
    window.print();
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container maxWidth={false} sx={{ py: 6 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header with Background Design */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
            opacity: 0.8,
            zIndex: 0
          }}
        />
        
        <Box position="relative" zIndex="1" pt={10}>
          {/* Logo and Title */}
          <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
            <FoodBankIcon sx={{ fontSize: 40, color: '#4CAF50', mr: 2 }} />
            <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
              Privacy Policy
            </Typography>
          </Box>
          
          <Typography variant="h5" align="center" gutterBottom color="text.secondary">
            Healthy Eats and Nutrition
          </Typography>
          
          <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
            Last Updated: {currentDate}
          </Typography>
          
          <Box my={4}>
            <Typography variant="body1" paragraph>
              Welcome to <strong>Healthy Eats and Nutrition</strong>! This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our mobile application and services. By using our app, you agree to the terms outlined in this policy.
            </Typography>
          </Box>
          
          {/* Action Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mb: 4,
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            <Button 
              startIcon={<PrintIcon />} 
              variant="outlined" 
              color="primary" 
              onClick={handlePrint}
              size={isMobile ? "small" : "medium"}
            >
              Print
            </Button>
            <Button 
              startIcon={<DownloadIcon />} 
              variant="outlined" 
              color="primary"
              size={isMobile ? "small" : "medium"}
            >
              Download PDF
            </Button>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          {/* Policy Sections using Accordions */}
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ 
                bgcolor: expanded === 'panel1' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <PersonIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">1. Information We Collect</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                We collect the following types of information to provide and improve our services:
              </Typography>
              
              <Box sx={{ pl: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  1.1 Personal Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="body2"><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="body2"><strong>Subscription Information:</strong> If you purchase a subscription, we collect payment information (processed securely by third-party payment processors).</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="body2"><strong>Health and Fitness Data:</strong> We collect personal information such as age, weight, height, fitness goals, and dietary preferences to provide personalized recommendations.</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="body2"><strong>User-Generated Content:</strong> This includes meal logs, photos, recipes, grocery lists, and habit-tracking data.</Typography>}
                    />
                  </ListItem>
                </List>
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  1.2 Usage Data
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="body2"><strong>App Activity:</strong> We collect data on how you interact with the app, such as features used, challenges completed, and progress tracked.</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="body2"><strong>Device Information:</strong> We may collect device-specific information (e.g., device type, operating system, IP address) for analytics and troubleshooting.</Typography>}
                    />
                  </ListItem>
                </List>
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  1.3 Nutrition Database
                </Typography>
                <Typography variant="body2" paragraph>
                  For foods logged manually or selected from our nutrition database, we calculate nutritional information (e.g., calories, macros) based on the data provided.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{ 
                bgcolor: expanded === 'panel2' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <DataUsageIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">2. How We Use Your Information</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                We use your information for the following purposes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>To Provide Services:</strong> Deliver personalized health tools, meal logging, challenges, recipes, and progress tracking.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>To Improve the App:</strong> Analyze usage data to enhance features, fix bugs, and optimize performance.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>To Communicate with You:</strong> Send notifications, reminders, and weekly progress summaries.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>To Process Payments:</strong> Manage subscriptions and in-app purchases.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>To Personalize Content:</strong> Offer tailored recommendations, recipes, and challenges based on your preferences and goals.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>To Gamify Your Experience:</strong> Award badges, points, and rewards for completing tasks and challenges.</Typography>}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
              sx={{ 
                bgcolor: expanded === 'panel3' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <ShareIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">3. How We Share Your Information</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                We do not sell your personal information. However, we may share it in the following circumstances:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>With Your Consent:</strong> If you choose to share progress or achievements on social media.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>With Service Providers:</strong> Third-party vendors who assist with payment processing, analytics, and database management.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>For Legal Reasons:</strong> To comply with legal obligations or protect our rights and safety.</Typography>}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
              sx={{ 
                bgcolor: expanded === 'panel4' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <LockIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">4. Data Security</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                We take reasonable measures to protect your data, including encryption, secure servers, and access controls. However, no method of transmission over the internet or electronic storage is 100% secure.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
              sx={{ 
                bgcolor: expanded === 'panel5' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <EmojiPeopleIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">5. Your Rights and Choices</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                You have the following rights regarding your data:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>Access and Update:</strong> You can review and edit your account information in the app settings.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>Delete Data:</strong> You can delete your account and associated data at any time.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>Opt-Out of Notifications:</strong> Adjust notification preferences in the app settings.</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2"><strong>Subscription Management:</strong> Cancel or modify your subscription through your device's app store.</Typography>}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6a-content"
              id="panel6a-header"
              sx={{ 
                bgcolor: expanded === 'panel6' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <ChildCareIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">6. Children's Privacy</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Our app is not intended for users under the age of 13. We do not knowingly collect personal information from children. If we become aware of such data, we will delete it immediately.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel7a-content"
              id="panel7a-header"
              sx={{ 
                bgcolor: expanded === 'panel7' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <UpdateIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">7. Changes to This Privacy Policy</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or via email.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel8a-content"
              id="panel8a-header"
              sx={{ 
                bgcolor: expanded === 'panel8' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Box display="flex" alignItems="center">
                <ContactMailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">8. Contact Us</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="body2"><strong>Email:</strong> support@healthyeatsapp.com</Typography>
                <Typography variant="body2"><strong>Address:</strong> 123 Nutrition Street, Wellness City, CA 94123</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          {/* Footer with Action Buttons */}
          <Box mt={6} display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={returnBack} startIcon={<ArrowBackIcon />} variant="text">
              Return to App
            </Button>
            <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
              Accept Policy
            </Button>
          </Box>
          
          {/* Copyright Footer */}
          <Box mt={4} textAlign="center">
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Healthy Eats and Nutrition. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;