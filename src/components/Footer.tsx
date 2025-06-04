import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor:"#090642", color: 'white', textAlign: 'center', py: 2,  bottom:0, position:"fixed", width:"100%"}}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Shop App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
