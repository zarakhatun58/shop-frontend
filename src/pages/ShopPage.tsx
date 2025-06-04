import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography } from '@mui/material';

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const subdomain = window.location.hostname.split('.')[0];
  console.log(subdomain, 'subdomain');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          withCredentials: true,
        });
      } catch (err: any) {
        console.error('Authentication failed:', err?.response?.data || err.message);
        // optionally redirect or just warn
      } finally {
        setLoading(false); // ensure loading finishes
      }
    };
    verifyToken();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h4">
        This is {subdomain} shop
      </Typography>
    </Box>
  );
};

export default ShopPage;
