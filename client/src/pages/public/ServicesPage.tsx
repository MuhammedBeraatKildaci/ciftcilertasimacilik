import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  Button,
  Collapse,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Modal,
  Fade
} from '@mui/material';
import { 
  LocalShipping, 
  AcUnit, 
  Engineering,
  CheckCircle,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  Speed,
  Security,
  Inventory
} from '@mui/icons-material';
import { serviceImages, icons } from '../../assets/images';
import { useInView } from 'react-intersection-observer';
import { keyframes } from '@mui/system';

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

const services = [
  {
    title: "Yurt İçi Taşımacılık",
    description: "Türkiye'nin her noktasına güvenilir ve hızlı taşımacılık hizmeti.",
    mainImage: serviceImages.domestic.main,
    gallery: serviceImages.domestic.gallery,
    features: ["81 ile hizmet", "Zamanında teslimat", "Güvenilir taşıma"],
    icon: LocalShipping,
    benefits: [
      { icon: Speed, text: "24 saat içinde teslimat" },
      { icon: Security, text: "Yük sigortası" },
      { icon: Inventory, text: "Online takip sistemi" }
    ],
    stats: {
      cities: 81,
      vehicles: 50,
      deliveries: "1000+"
    }
  },
  {
    title: "Soğuk Zincir Taşımacılığı",
    description: "Özel donanımlı araçlarla soğuk zincir taşımacılığı.",
    mainImage: serviceImages.coldChain.main,
    gallery: serviceImages.coldChain.gallery,
    features: ["Sıcaklık kontrolü", "Özel donanımlı araçlar", "Kesintisiz izleme"],
    icon: AcUnit,
    benefits: [
      { icon: Speed, text: "Kesintisiz soğuk zincir" },
      { icon: Security, text: "Sıcaklık takip sistemi" },
      { icon: Inventory, text: "Özel soğutmalı araçlar" }
    ],
    stats: {
      temperature: "-20°C",
      vehicles: 30,
      monitoring: "7/24"
    }
  },
  {
    title: "Proje Taşımacılığı",
    description: "Özel projeler için özel çözümler.",
    mainImage: serviceImages.project.main,
    gallery: serviceImages.project.gallery,
    features: ["Proje planlaması", "Özel ekipman", "Uzman ekip"],
    icon: Engineering,
    benefits: [
      { icon: Speed, text: "Proje bazlı çözümler" },
      { icon: Security, text: "Özel ekipman filosu" },
      { icon: Inventory, text: "Uzman proje ekibi" }
    ],
    stats: {
      projects: "100+",
      experts: 20,
      equipment: "50+"
    }
  }
];

export const ServicesPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: 6,
            fontWeight: 'bold',
            color: 'primary.main',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 4,
              bgcolor: 'secondary.main'
            }
          }}
        >
          Hizmetlerimiz
        </Typography>

        <Grid container spacing={4} ref={ref}>
          {services.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={index}
              sx={{
                opacity: 0,
                animation: inView ? `${slideInUp} 1s forwards ${index * 0.2}s` : 'none'
              }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={service.mainImage}
                  alt={service.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <service.icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5" component="div">
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Özellikler:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {service.features.map((feature, idx) => (
                      <Chip 
                        key={idx}
                        icon={<CheckCircle />}
                        label={feature}
                        sx={{ mr: 1, mb: 1 }}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #9c27b0, #1976d2)',
                      }
                    }}
                    onClick={() => setExpandedId(expandedId === index ? null : index)}
                  >
                    Detaylar
                  </Button>

                  <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Avantajlar:
                      </Typography>
                      <List>
                        {service.benefits.map((benefit, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <benefit.icon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={benefit.text} />
                          </ListItem>
                        ))}
                      </List>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle1" gutterBottom>
                        İstatistikler:
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(service.stats).map(([key, value]) => (
                          <Grid item xs={4} key={key}>
                            <Typography variant="h6" align="center" color="primary">
                              {value}
                            </Typography>
                            <Typography variant="body2" align="center" color="text.secondary">
                              {key}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle1" gutterBottom>
                        Galeri:
                      </Typography>
                      <Grid container spacing={1}>
                        {service.gallery.map((img, idx) => (
                          <Grid item xs={4} key={idx}>
                            <img 
                              src={img} 
                              alt="" 
                              style={{ 
                                width: '100%', 
                                height: 80, 
                                objectFit: 'cover',
                                cursor: 'pointer',
                                borderRadius: 4,
                                transition: 'transform 0.3s ease-in-out',
                              }}
                              onClick={() => setSelectedImage(img)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        closeAfterTransition
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              maxHeight: '90vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 1,
              borderRadius: 2,
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)',
                }
              }}
              onClick={() => setSelectedImage(null)}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={selectedImage!}
              alt=""
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}; 