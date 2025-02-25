import React, { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  IconButton,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { teamImages } from '../../assets/images';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { keyframes } from '@mui/system';
import { useInView } from 'react-intersection-observer';

const team = [
  {
    name: 'Ahmet Yılmaz',
    position: 'Genel Müdür',
    image: teamImages.ceo.profile,
    actionImage: teamImages.ceo.action,
    description: '15 yıllık lojistik sektörü deneyimi',
    linkedin: 'https://linkedin.com',
    email: 'ahmet@example.com'
  },
  {
    name: 'Ayşe Demir',
    position: 'Operasyon Müdürü',
    image: teamImages.operations.profile,
    actionImage: teamImages.operations.action,
    description: '10 yıllık operasyon yönetimi deneyimi',
    linkedin: 'https://linkedin.com',
    email: 'ayse@example.com'
  },
  {
    name: 'Mehmet Kaya',
    position: 'Lojistik Direktörü',
    image: teamImages.logistics.profile,
    actionImage: teamImages.logistics.action,
    description: '12 yıllık tedarik zinciri deneyimi',
    linkedin: 'https://linkedin.com',
    email: 'mehmet@example.com'
  }
];

const departments = [
  {
    name: "Operasyon Departmanı",
    description: "Sevkiyat operasyonlarının planlanması ve yönetimi",
    responsibilities: [
      "Rota optimizasyonu",
      "Filo yönetimi",
      "Sevkiyat takibi"
    ],
    icon: GroupsIcon
  },
  {
    name: "Müşteri İlişkileri",
    description: "Müşteri memnuniyeti ve iletişim yönetimi",
    responsibilities: [
      "Müşteri desteği",
      "Talep yönetimi",
      "Raporlama"
    ],
    icon: GroupsIcon
  },
  {
    name: "Teknoloji Departmanı",
    description: "Dijital altyapı ve yazılım geliştirme",
    responsibilities: [
      "Sistem geliştirme",
      "Teknik destek",
      "İnovasyon projeleri"
    ],
    icon: GroupsIcon
  }
];

const careerOpportunities = [
  {
    position: "Operasyon Uzmanı",
    location: "İstanbul",
    type: "Tam Zamanlı",
    requirements: [
      "Minimum 3 yıl lojistik deneyimi",
      "İyi derecede İngilizce",
      "MS Office hakimiyeti"
    ]
  },
  {
    position: "Yazılım Geliştirici",
    location: "Ankara",
    type: "Tam Zamanlı",
    requirements: [
      "React ve TypeScript deneyimi",
      "Backend teknolojilerine hakimiyet",
      "Agile metodolojiler bilgisi"
    ]
  },
  {
    position: "Müşteri İlişkileri Yöneticisi",
    location: "İzmir",
    type: "Tam Zamanlı",
    requirements: [
      "Minimum 5 yıl deneyim",
      "Güçlü iletişim becerileri",
      "CRM sistemleri deneyimi"
    ]
  }
];

const successStories = [
  {
    name: "Ahmet Yıldız",
    title: "Operasyon Uzmanından Direktörlüğe",
    story: "2015 yılında operasyon uzmanı olarak başladığım kariyerimde, şirketimizin sunduğu gelişim fırsatları sayesinde bugün Operasyon Direktörü olarak görev yapıyorum.",
    image: teamImages.success.success1
  },
  {
    name: "Ayşe Kaya",
    title: "Stajyerlikten Yöneticiliğe",
    story: "Üniversite stajımı yaptığım Çiftçiler Taşımacılık'ta, 7 yıllık süreçte kariyer basamaklarını tırmanarak Müşteri İlişkileri Yöneticisi pozisyonuna yükseldim.",
    image: teamImages.success.success2
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

export const TeamPage: React.FC = () => {
  // IntersectionObserver hooks
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [deptRef, deptInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [careerRef, careerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [storyRef, storyInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Box>
      <Box 
        ref={teamRef}
        sx={{ 
          bgcolor: 'background.default', 
          py: 6,
          opacity: 0,
          animation: teamInView ? `${slideInUp} 1s forwards` : 'none'
        }}
      >
        <Container>
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Ekibimiz
          </Typography>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <CardMedia
                    component="img"
                    height="300"
                    image={member.image}
                    alt={member.name}
                    sx={{ 
                      objectFit: 'cover',
                      filter: 'brightness(0.9)'
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary.main"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {member.position}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      paragraph
                    >
                      {member.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        color="primary" 
                        href={member.linkedin}
                        target="_blank"
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton 
                        color="primary"
                        href={`mailto:${member.email}`}
                      >
                        <EmailIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Departmanlar */}
      <Box 
        ref={deptRef}
        sx={{ 
          bgcolor: 'grey.100', 
          py: 8,
          opacity: 0,
          animation: deptInView ? `${slideInLeft} 1s forwards` : 'none'
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Departmanlarımız
          </Typography>
          <Grid container spacing={4}>
            {departments.map((dept, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6
                    },
                    opacity: 0,
                    animation: deptInView 
                      ? `${slideInRight} 1s forwards ${index * 0.2}s`
                      : 'none'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <dept.icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                      <Typography variant="h5">
                        {dept.name}
                      </Typography>
                    </Box>
                    <Typography paragraph color="text.secondary">
                      {dept.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Sorumluluklar:
                    </Typography>
                    {dept.responsibilities.map((resp, idx) => (
                      <Chip 
                        key={idx} 
                        label={resp} 
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                      />
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Kariyer Fırsatları */}
      <Container 
        ref={careerRef}
        sx={{ 
          py: 8,
          opacity: 0,
          animation: careerInView ? `${slideInUp} 1s forwards` : 'none'
        }}
      >
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Kariyer Fırsatları
        </Typography>
        <Grid container spacing={4}>
          {careerOpportunities.map((career, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  opacity: 0,
                  animation: careerInView 
                    ? `${slideInUp} 1s forwards ${index * 0.2}s`
                    : 'none',
                  // ... mevcut stiller
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WorkIcon sx={{ fontSize: 30, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5">
                      {career.position}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Chip label={career.location} sx={{ mr: 1 }} />
                    <Chip label={career.type} color="primary" />
                  </Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Gereksinimler:
                  </Typography>
                  {career.requirements.map((req, idx) => (
                    <Typography 
                      key={idx} 
                      variant="body2" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 1,
                        '&:before': {
                          content: '"•"',
                          mr: 1,
                          color: 'primary.main'
                        }
                      }}
                    >
                      {req}
                    </Typography>
                  ))}
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                  >
                    Başvur
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Başarı Hikayeleri */}
      <Box 
        ref={storyRef}
        sx={{ 
          bgcolor: 'grey.100', 
          py: 8,
          opacity: 0,
          animation: storyInView ? `${slideInRight} 1s forwards` : 'none'
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Başarı Hikayeleri
          </Typography>
          <Grid container spacing={4}>
            {successStories.map((story, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    height: '100%',
                    opacity: 0,
                    animation: storyInView 
                      ? `${slideInLeft} 1s forwards ${index * 0.3}s`
                      : 'none'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', md: 200 },
                      height: { xs: 200, md: 'auto' },
                      objectFit: 'cover'
                    }}
                    image={story.image}
                    alt={story.name}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {story.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary.main" 
                      gutterBottom
                    >
                      {story.title}
                    </Typography>
                    <Typography variant="body1">
                      {story.story}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}; 