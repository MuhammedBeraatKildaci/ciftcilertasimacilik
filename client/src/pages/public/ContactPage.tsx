import React from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "Sevkiyat takibi nasıl yapılır?",
    answer: "Web sitemiz üzerinden kargo takip numaranızı girerek sevkiyatınızı 7/24 takip edebilirsiniz."
  },
  {
    question: "Fiyat teklifi nasıl alabilirim?",
    answer: "İletişim formunu doldurarak veya doğrudan telefon numaramızı arayarak hızlıca fiyat teklifi alabilirsiniz."
  },
  {
    question: "Hangi bölgelere hizmet veriyorsunuz?",
    answer: "Türkiye'nin 81 iline hizmet vermekteyiz. Ayrıca uluslararası taşımacılık hizmetimiz de bulunmaktadır."
  }
];

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi
  };

  return (
    <Box>
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          İletişim
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                İletişim Bilgileri
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography>Adres:</Typography>
                <Typography color="textSecondary">
                  Örnek Mah. Örnek Cad. No:123 İstanbul
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography>Telefon:</Typography>
                <Typography color="textSecondary">+90 212 345 67 89</Typography>
              </Box>
              <Box>
                <Typography>E-posta:</Typography>
                <Typography color="textSecondary">info@ciftcilertasimacilik.com</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                İletişim Formu
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Ad Soyad"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="E-posta"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mesaj"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Gönder
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* SSS Bölümü */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
            Sıkça Sorulan Sorular
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index}
              sx={{ 
                mb: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: 1
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <Typography variant="h6">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Harita Bölümü */}
      <Box sx={{ height: 400, width: '100%' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900450736!2d29.006013015845794!3d41.04590497929736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a24975fe5d%3A0x4f0f0a9c83141f2!2sBeşiktaş%2C%20İstanbul!5e0!3m2!1str!2str!4v1635000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        />
      </Box>

      {/* Şubelerimiz */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Şubelerimiz
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                İstanbul Merkez
              </Typography>
              <Typography paragraph>
                Örnek Mah. Örnek Cad. No:123
                Beşiktaş/İstanbul
              </Typography>
              <Typography color="primary">
                +90 212 345 67 89
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                Ankara Şube
              </Typography>
              <Typography paragraph>
                Örnek Mah. Örnek Cad. No:456
                Çankaya/Ankara
              </Typography>
              <Typography color="primary">
                +90 312 345 67 89
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                İzmir Şube
              </Typography>
              <Typography paragraph>
                Örnek Mah. Örnek Cad. No:789
                Konak/İzmir
              </Typography>
              <Typography color="primary">
                +90 232 345 67 89
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 