import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
  KeyboardArrowRight
} from '@mui/icons-material';

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', pt: 8, pb: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Kurumsal */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Kurumsal
            </Typography>
            <Stack spacing={1}>
              {[
                { title: 'Hakkımızda', path: '/about' },
                { title: 'Ekibimiz', path: '/team' },
                { title: 'Belgelerimiz', path: '/certificates' },
                { title: 'Kariyer', path: '/career' }
              ].map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  startIcon={<KeyboardArrowRight />}
                  sx={{ 
                    color: 'white',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Grid>

          {/* Hizmetlerimiz */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Hizmetlerimiz
            </Typography>
            <Stack spacing={1}>
              {[
                { title: 'Yurt İçi Taşımacılık', path: '/services/domestic' },
                { title: 'Soğuk Zincir', path: '/services/cold-chain' },
                { title: 'Proje Taşımacılığı', path: '/services/project' },
                { title: 'Depolama', path: '/services/storage' }
              ].map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  startIcon={<KeyboardArrowRight />}
                  sx={{ 
                    color: 'white',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Grid>

          {/* İletişim */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              İletişim
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Örnek Mah. Örnek Cad. No:123 İstanbul
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1 }} />
                <MuiLink 
                  href="tel:+902123456789" 
                  color="inherit"
                  sx={{ 
                    textDecoration: 'none',
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  +90 212 345 67 89
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} />
                <MuiLink 
                  href="mailto:info@ciftcilertasimacilik.com"
                  color="inherit"
                  sx={{ 
                    textDecoration: 'none',
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  info@ciftcilertasimacilik.com
                </MuiLink>
              </Box>
            </Stack>
          </Grid>

          {/* Sosyal Medya */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Sosyal Medya
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: Facebook, url: 'https://facebook.com' },
                { icon: Twitter, url: 'https://twitter.com' },
                { icon: Instagram, url: 'https://instagram.com' },
                { icon: LinkedIn, url: 'https://linkedin.com' }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Alt Bilgi */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" align="center" sx={{ md: { textAlign: 'left' } }}>
              © {new Date().getFullYear()} Çiftçiler Taşımacılık. Tüm hakları saklıdır.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack 
              direction="row" 
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-end' }}
            >
              <MuiLink 
                component={Link} 
                to="/privacy" 
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                Gizlilik Politikası
              </MuiLink>
              <MuiLink 
                component={Link} 
                to="/terms" 
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                Kullanım Koşulları
              </MuiLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 