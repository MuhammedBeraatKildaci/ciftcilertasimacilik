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
import { Vehicle } from '../../types';

interface VehicleDetailModalProps {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  open,
  onClose,
  vehicle,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Araç Detayı - {vehicle.plateNumber}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Durum</Typography>
              <Chip label={vehicle.status} color="primary" />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Araç Bilgileri
            </Typography>
            <Typography variant="body1">
              <strong>Plaka:</strong> {vehicle.plateNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Araç Tipi:</strong> {vehicle.vehicleType}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Kapasite Bilgileri
            </Typography>
            <Typography variant="body1">
              <strong>Ağırlık Kapasitesi:</strong> {vehicle.capacity.weight} kg
            </Typography>
            <Typography variant="body1">
              <strong>Hacim Kapasitesi:</strong> {vehicle.capacity.volume} m³
            </Typography>
          </Grid>

          {vehicle.lastMaintenance && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Son Bakım Bilgileri
              </Typography>
              <Typography variant="body1">
                <strong>Tarih:</strong>{' '}
                {new Date(vehicle.lastMaintenance.date).toLocaleDateString('tr-TR')}
              </Typography>
              <Typography variant="body1">
                <strong>Açıklama:</strong> {vehicle.lastMaintenance.description}
              </Typography>
            </Grid>
          )}

          {vehicle.currentDriver && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Mevcut Sürücü
              </Typography>
              <Typography variant="body1">
                <strong>Sürücü ID:</strong> {vehicle.currentDriver}
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