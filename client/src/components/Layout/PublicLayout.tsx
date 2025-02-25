import React from 'react';
import { AppBar, Toolbar, Container, Box, Button, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
            }}
          >
            Çiftçiler Taşımacılık
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/about">
              Hakkımızda
            </Button>
            <Button color="inherit" component={RouterLink} to="/services">
              Hizmetler
            </Button>
            <Button color="inherit" component={RouterLink} to="/team">
              Ekibimiz
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              İletişim
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/login')}
            >
              Giriş Yap
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} Çiftçiler Taşımacılık. Tüm hakları saklıdır.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}; 