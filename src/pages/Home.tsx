import { Box, Grid, Typography } from '@mui/material';

import ShopPage from './ShopPage';

const Home = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <div>
          <Typography variant="h3" gutterBottom>
            Welcome to My shop App
          </Typography>
          <Typography variant="h6" gutterBottom>
            Build shops, secure user access, and more.
          </Typography>
          <ShopPage/>
        </div>
        
      </Grid>
    </Box>
  );
};

export default Home;
