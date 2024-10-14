import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 4, py: 2, textAlign: 'center' }}>
      <Typography variant="body2">© {new Date().getFullYear()} My Blog</Typography>
    </Box>
  );
};

export default Footer;
