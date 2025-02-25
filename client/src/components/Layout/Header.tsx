import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  Button, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide,
  Fade,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  KeyboardArrowDown,
  LocationOn,
  AccessTime
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { title: 'Ana Sayfa', path: '/' },
  { 
    title: 'Hizmetlerimiz', 
    path: '/services',
    subItems: [
      { title: 'Yurt İçi Taşımacılık', path: '/services/domestic' },
      { title: 'Soğuk Zincir', path: '/services/cold-chain' },
      { title: 'Proje Taşımacılığı', path: '/services/project' }
    ]
  },
  { title: 'Hakkımızda', path: '/about' },
  { title: 'Ekibimiz', path: '/team' },
  { title: 'İletişim', path: '/contact' }
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Üst Bilgi Çubuğu */}
      <Box 
        sx={{ 
          bgcolor: 'primary.dark',
          color: 'white',
          py: 1,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Container maxWidth="xl">
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
          >
            <Stack direction="row" spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2">
                  Örnek Mah. Örnek Cad. No:123 İstanbul
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2">
                  Pzt-Cmt: 09:00-18:00
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                startIcon={<PhoneIcon />}
                href="tel:+902123456789"
                sx={{ 
                  color: 'white',
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                +90 212 345 67 89
              </Button>
              <Button
                size="small"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/902123456789"
                target="_blank"
                sx={{ 
                  color: '#25D366',
                  '&:hover': { color: '#128C7E' }
                }}
              >
                WhatsApp
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Ana Menü */}
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar 
          position="sticky" 
          sx={{ 
            bgcolor: 'white',
            boxShadow: isScrolled ? 2 : 0,
            borderBottom: isScrolled ? 'none' : '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ height: 80 }}>
              {/* Logo */}
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 800,
                  letterSpacing: 1,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                ÇİFTÇİLER
                <Typography 
                  component="span" 
                  variant="h5" 
                  sx={{ 
                    color: 'secondary.main',
                    fontWeight: 800,
                    ml: 1
                  }}
                >
                  TAŞIMACILIK
                </Typography>
              </Typography>

              {/* Desktop Menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {navItems.map((item) => (
                  <Box
                    key={item.title}
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    sx={{ position: 'relative' }}
                  >
                    <Button
                      component={Link}
                      to={item.path}
                      sx={{
                        mx: 1,
                        px: 2,
                        py: 3,
                        color: 'text.primary',
                        fontWeight: 500,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: 3,
                          bgcolor: 'primary.main',
                          transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 0.3s ease-in-out',
                          transformOrigin: 'center'
                        },
                        '&:hover::after': {
                          transform: 'scaleX(1)'
                        }
                      }}
                      endIcon={item.subItems && <KeyboardArrowDown />}
                    >
                      {item.title}
                    </Button>
                    {item.subItems && (
                      <Paper
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          minWidth: 220,
                          display: activeDropdown === item.title ? 'block' : 'none',
                          boxShadow: 3,
                          borderRadius: '0 0 4px 4px',
                          overflow: 'hidden'
                        }}
                      >
                        {item.subItems.map((subItem) => (
                          <Button
                            key={subItem.title}
                            component={Link}
                            to={subItem.path}
                            fullWidth
                            sx={{
                              py: 1.5,
                              px: 3,
                              justifyContent: 'flex-start',
                              color: 'text.primary',
                              borderBottom: '1px solid',
                              borderColor: 'grey.100',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white'
                              }
                            }}
                          >
                            {subItem.title}
                          </Button>
                        ))}
                      </Paper>
                    )}
                  </Box>
                ))}
              </Box>

              {/* Contact Button */}
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/contact"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  px: 4,
                  py: 1,
                  borderRadius: 30,
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #9c27b0, #1976d2)',
                  }
                }}
              >
                Teklif Al
              </Button>

              {/* Mobile Menu Button */}
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280 
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            ÇİFTÇİLER TAŞIMACILIK
          </Typography>
          <List>
            {navItems.map((item) => (
              <React.Fragment key={item.title}>
                <ListItem 
                  button 
                  component={Link} 
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
                {item.subItems?.map((subItem) => (
                  <ListItem 
                    key={subItem.title}
                    button 
                    component={Link} 
                    to={subItem.path}
                    onClick={() => setMobileOpen(false)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={subItem.title} />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </List>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PhoneIcon />}
              href="tel:+902123456789"
            >
              Bizi Arayın
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/902123456789"
              target="_blank"
              sx={{
                bgcolor: '#25D366',
                '&:hover': {
                  bgcolor: '#128C7E'
                }
              }}
            >
              WhatsApp
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}; 