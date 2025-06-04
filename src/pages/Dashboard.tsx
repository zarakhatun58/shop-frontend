import React, { useEffect, useState } from 'react';
import {
  Container, Typography, IconButton, Menu, MenuItem, Box, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ProfileResponse {
  shops: string[];
   shopSlugs: string[];
}

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shops, setShops] = useState<string[]>([]);
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get<ProfileResponse>(
          `${import.meta.env.VITE_API_URL}/profile`,
          { withCredentials: true }
        );
        setShops(res.data.shops);
        setSlugs(res.data.shopSlugs);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate('/dashboard');
        } else {
          console.error('Error fetching profile:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
    navigate('/');
  };

  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'localhost:5173';
  const protocol = window.location.protocol;
 
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="h5">Dashboard</Typography>
        <IconButton
          onClick={handleMenu}
          size="large"
          aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        >
          <AccountCircleIcon fontSize="inherit" />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {shops.map((shop, idx) => {
             return (
            <MenuItem
              key={idx}
            //  onClick={() => window.open(`${protocol}//${shop}.${baseDomain}`, '_blank')}
            onClick={() => window.open(`${protocol}//${slugs[idx]}.${baseDomain}`, '_blank')}
            >
              {shop}
            </MenuItem>
             )}
          )}
          <MenuItem onClick={() => setOpenLogout(true)}>Logout</MenuItem>
        </Menu>
      </Box>

      <Dialog open={openLogout} onClose={() => setOpenLogout(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogout(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="primary">Logout</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
