import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper,
  Card,
  CardMedia,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade
} from '@mui/material';
import { 
  CheckCircle,
  Timeline as TimelineIcon,
  EmojiEvents,
  Handshake,
  LocalShipping,
  People,
  Speed,
  Security,
  Inventory
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { keyframes } from '@mui/system';

const historyEvents = [
  {
    year: '2003',
    title: 'Kuruluş',
    description: 'Çiftçiler Taşımacılık kuruldu.'
  },
  {
    year: '2008',
    title: 'Filo Genişlemesi',
    description: 'Araç filomuzu 20 araca çıkardık.'
  },
  {
    year: '2013',
    title: 'ISO Sertifikası',
    description: 'ISO 9001 kalite sertifikasını aldık.'
  },
  {
    year: '2018',
    title: 'Dijital Dönüşüm',
    description: 'Online takip sistemimizi devreye aldık.'
  },
  {
    year: '2023',
    title: 'Yeni Merkez',
    description: 'Yeni lojistik merkezimizi açtık.'
  }
];

const values = [
  {
    title: 'Güvenilirlik',
    description: 'Müşterilerimizin güvenini en değerli varlığımız olarak görüyoruz.'
  },
  {
    title: 'Kalite',
    description: 'Her işimizde en yüksek kalite standartlarını hedefliyoruz.'
  },
  {
    title: 'İnovasyon',
    description: 'Sürekli gelişim ve yenilikçi çözümler sunuyoruz.'
  }
];

const qualityPolicies = [
  {
    title: 'Müşteri Odaklılık',
    description: 'Müşteri memnuniyeti önceliğimizdir.'
  },
  {
    title: 'Sürdürülebilirlik',
    description: 'Çevreye duyarlı ve sürdürülebilir hizmetler sunuyoruz.'
  },
  {
    title: 'Sürekli İyileştirme',
    description: 'Hizmetlerimizi sürekli geliştiriyoruz.'
  }
];

// Animasyon tanımlamaları
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

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const achievements = [
  {
    title: "20+ Yıl",
    description: "Sektör Deneyimi",
    icon: TimelineIcon
  },
  {
    title: "1000+",
    description: "Başarılı Proje",
    icon: EmojiEvents
  },
  {
    title: "500+",
    description: "Mutlu Müşteri",
    icon: Handshake
  },
  {
    title: "81 İl",
    description: "Hizmet Ağı",
    icon: LocalShipping
  }
];

const strengths = [
  {
    title: "Uzman Ekip",
    description: "Deneyimli ve profesyonel kadro",
    icon: People
  },
  {
    title: "Hızlı Teslimat",
    description: "Zamanında ve güvenli sevkiyat",
    icon: Speed
  },
  {
    title: "Güvenli Taşıma",
    description: "Tam sigorta ve güvenlik önlemleri",
    icon: Security
  },
  {
    title: "Modern Filo",
    description: "Teknolojik araç filosu",
    icon: Inventory
  }
];

export const AboutPage: React.FC = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [achievementsRef, achievementsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [strengthsRef, strengthsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        ref={heroRef}
        sx={{ 
          height: '60vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: -1
          }
        }}
      >
        <Container>
          <Fade in={heroInView} timeout={1000}>
            <Box>
              <Typography 
                variant="h1" 
                color="white"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '4rem' }
                }}
              >
                Hakkımızda
              </Typography>
              <Typography 
                variant="h4" 
                color="white"
                sx={{ 
                  maxWidth: 600,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                20 yılı aşkın tecrübemizle lojistik sektörünün öncü firmalarından biriyiz.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Başarılarımız */}
      <Box 
        ref={achievementsRef}
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={3} 
                key={index}
                sx={{
                  opacity: 0,
                  animation: achievementsInView 
                    ? `${slideInUp} 1s forwards ${index * 0.2}s`
                    : 'none'
                }}
              >
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 2
                  }}
                >
                  <achievement.icon 
                    sx={{ 
                      fontSize: 60,
                      mb: 2,
                      color: 'secondary.main'
                    }}
                  />
                  <Typography variant="h3" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <Typography variant="h6">
                    {achievement.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Misyon & Vizyon */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{
              opacity: 0,
              animation: strengthsInView 
                ? `${slideInLeft} 1s forwards`
                : 'none'
            }}
          >
            <Paper 
              sx={{ 
                p: 4,
                height: '100%',
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                color: 'white'
              }}
            >
              <Typography variant="h4" gutterBottom>
                Misyonumuz
              </Typography>
              <Typography variant="body1" paragraph>
                Müşterilerimize en kaliteli ve güvenilir lojistik hizmetini sunmak.
                Modern teknolojiler ve uzman kadromuzla sektörde fark yaratmak.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Kaliteli Hizmet" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Müşteri Memnuniyeti" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Sürekli Gelişim" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{
              opacity: 0,
              animation: strengthsInView 
                ? `${slideInRight} 1s forwards`
                : 'none'
            }}
          >
            <Paper 
              sx={{ 
                p: 4,
                height: '100%',
                background: 'linear-gradient(45deg, #9c27b0, #1976d2)',
                color: 'white'
              }}
            >
              <Typography variant="h4" gutterBottom>
                Vizyonumuz
              </Typography>
              <Typography variant="body1" paragraph>
                Türkiye'nin lider lojistik şirketlerinden biri olmak ve
                global pazarda söz sahibi bir marka haline gelmek.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Sektör Liderliği" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Global Büyüme" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Teknolojik Yatırım" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Güçlü Yönlerimiz */}
      <Box 
        ref={strengthsRef}
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
            Güçlü Yönlerimiz
          </Typography>
          <Grid container spacing={4}>
            {strengths.map((strength, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={3} 
                key={index}
                sx={{
                  opacity: 0,
                  animation: strengthsInView 
                    ? `${slideInUp} 1s forwards ${index * 0.2}s`
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
                    <strength.icon 
                      sx={{ 
                        fontSize: 60,
                        color: 'primary.main',
                        mb: 2
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {strength.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {strength.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tarihçe */}
      <Box 
        ref={timelineRef}
        sx={{ 
          py: 8,
          opacity: 0,
          animation: timelineInView ? `${slideInUp} 1s forwards` : 'none'
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Tarihçemiz
          </Typography>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {historyEvents.map((event, index) => (
              <Paper 
                key={index}
                sx={{ 
                  p: 3, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 2,
                    borderRadius: 1,
                    minWidth: 100,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6">
                    {event.year}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {event.description}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}; 