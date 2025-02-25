import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { Driver } from '../../types';

interface DriverDetailModalProps {
  open: boolean;
  onClose: () => void;
  driver: Driver;
}

export const DriverDetailModal: React.FC<DriverDetailModalProps> = ({
  open,
  onClose,
  driver,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Sürücü Detayı - {driver.firstName} {driver.lastName}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Durum</Typography>
              <Chip label={driver.status} color="primary" />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Kişisel Bilgiler
            </Typography>
            <Typography variant="body1">
              <strong>Ad Soyad:</strong> {driver.firstName} {driver.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Telefon:</strong> {driver.phoneNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Ehliyet Bilgileri
            </Typography>
            <Typography variant="body1">
              <strong>Ehliyet No:</strong> {driver.licenseNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Ehliyet Sınıfı:</strong> {driver.licenseType}
            </Typography>
          </Grid>

          {driver.currentLocation && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Konum Bilgisi
              </Typography>
              <Typography variant="body1">
                Enlem: {driver.currentLocation.coordinates[0]}
              </Typography>
              <Typography variant="body1">
                Boylam: {driver.currentLocation.coordinates[1]}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
}; 