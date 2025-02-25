import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Rating,
  Avatar,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { heroImages, icons } from '../../assets/images';
import { 
  LocalShipping,
  Speed,
  Security,
  Inventory,
  ArrowForward,
  Star,
  LocationOn,
  Phone,
  Email
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const features = [
  {
    icon: LocalShipping,
    title: "Modern Filo",
    description: "Son teknoloji araçlarla güvenli taşımacılık"
  },
  {
    icon: Speed,
    title: "Hızlı Teslimat",
    description: "Zamanında ve güvenilir teslimat hizmeti"
  },
  {
    icon: Security,
    title: "Güvenli Taşıma",
    description: "Tam sigortalı ve güvenli sevkiyat"
  },
  {
    icon: Inventory,
    title: "Online Takip",
    description: "7/24 online sevkiyat takip sistemi"
  }
];

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    company: "ABC Gıda Ltd. Şti.",
    comment: "Çiftçiler Taşımacılık ile çalışmaya başladığımızdan beri lojistik süreçlerimiz çok daha verimli hale geldi.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Ayşe Kaya",
    company: "XYZ Tekstil A.Ş.",
    comment: "Profesyonel ekipleri ve modern araç filosu ile sektörün en iyisi.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    name: "Mehmet Demir",
    company: "123 Market Zinciri",
    comment: "Soğuk zincir taşımacılığında kendilerini kanıtlamış bir firma.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        ref={heroRef}
        sx={{ 
          height: '90vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${heroImages.main})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: heroInView ? 'zoomIn 20s ease-in-out infinite alternate' : 'none',
            filter: 'brightness(0.5)',
            zIndex: -1,
            '@keyframes zoomIn': {
              from: { transform: 'scale(1)' },
              to: { transform: 'scale(1.1)' }
            }
          }
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                opacity: 0,
                animation: heroInView ? `${slideInLeft} 1s forwards` : 'none'
              }}
            >
              <Typography 
                variant="h1" 
                color="white"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '4rem' }
                }}
              >
                Güvenilir Lojistik Çözümler
              </Typography>
              <Typography 
                variant="h4" 
                color="white"
                sx={{ mb: 4 }}
              >
                20 yıllık tecrübemizle Türkiye'nin her noktasına hizmet veriyoruz
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/contact')}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #9c27b0, #1976d2)',
                  }
                }}
              >
                Teklif Alın
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* İstatistikler */}
      <Box 
        ref={statsRef}
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          transform: 'translateY(-50px)',
          borderRadius: '20px 20px 0 0'
        }}
      >
        <Container>
          <Grid container spacing={4} textAlign="center">
            <Grid 
              item 
              xs={12} 
              md={3}
              sx={{
                opacity: 0,
                animation: statsInView ? `${fadeIn} 1s forwards 0.2s` : 'none'
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                20+
              </Typography>
              <Typography variant="h6">Yıllık Tecrübe</Typography>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={3}
              sx={{
                opacity: 0,
                animation: statsInView ? `${fadeIn} 1s forwards 0.4s` : 'none'
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                1000+
              </Typography>
              <Typography variant="h6">Mutlu Müşteri</Typography>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={3}
              sx={{
                opacity: 0,
                animation: statsInView ? `${fadeIn} 1s forwards 0.6s` : 'none'
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                50+
              </Typography>
              <Typography variant="h6">Modern Araç</Typography>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={3}
              sx={{
                opacity: 0,
                animation: statsInView ? `${fadeIn} 1s forwards 0.8s` : 'none'
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                81
              </Typography>
              <Typography variant="h6">Hizmet Verilen İl</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Özellikler */}
      <Box 
        ref={featuresRef}
        sx={{ 
          py: 8,
          bgcolor: 'background.default'
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Neden Bizi Seçmelisiniz?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid 
                item 
                xs={12} 
                md={3} 
                key={index}
                sx={{
                  opacity: 0,
                  animation: featuresInView 
                    ? `${fadeIn} 1s forwards ${index * 0.2}s`
                    : 'none'
                }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <feature.icon 
                      sx={{ 
                        fontSize: 60,
                        color: 'primary.main',
                        mb: 2
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Müşteri Yorumları */}
      <Box 
        ref={testimonialsRef}
        sx={{ 
          bgcolor: 'grey.100',
          py: 8
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Müşterilerimiz Ne Diyor?
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index}
                sx={{
                  opacity: 0,
                  animation: testimonialsInView 
                    ? `${fadeIn} 1s forwards ${index * 0.2}s`
                    : 'none'
                }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    '&::before': {
                      content: '"""',
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      fontSize: '4rem',
                      color: 'primary.main',
                      opacity: 0.2
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ pt: 4, pb: 2 }}>
                      <Typography variant="body1" paragraph>
                        {testimonial.comment}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={testimonial.avatar}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.company}
                        </Typography>
                        <Rating 
                          value={testimonial.rating} 
                          readOnly 
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* İletişim Bilgileri */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Hemen İletişime Geçin
              </Typography>
              <Typography variant="h6" paragraph>
                Size en uygun lojistik çözümü için hazırız
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
                onClick={() => navigate('/contact')}
              >
                İletişim
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 2 }} />
                    <Typography>
                      Örnek Mah. Örnek Cad. No:123 İstanbul
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 2 }} />
                    <Typography>
                      +90 212 345 67 89
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 2 }} />
                    <Typography>
                      info@ciftcilertasimacilik.com
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}; 