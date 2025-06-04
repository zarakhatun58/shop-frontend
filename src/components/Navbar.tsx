import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#090642', height: '50px' }}>
        <Toolbar style={{ minHeight: '50px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop
          </Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/signup">Sign up</Button>
              <Button color="inherit" component={RouterLink} to="/signin">Login</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
