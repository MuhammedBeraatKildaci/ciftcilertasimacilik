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
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Shipment } from '../../types';
import { LocationMap } from '../map/LocationMap';

interface ShipmentDetailModalProps {
  open: boolean;
  onClose: () => void;
  shipment: Shipment;
}

export const ShipmentDetailModal: React.FC<ShipmentDetailModalProps> = ({
  open,
  onClose,
  shipment,
}) => {
  const locations = [
    {
      coordinates: shipment.pickup.coordinates,
      title: 'Alış Noktası',
      description: shipment.pickup.address,
    },
    {
      coordinates: shipment.delivery.coordinates,
      title: 'Teslimat Noktası',
      description: shipment.delivery.address,
    },
  ];

  const center: [number, number] = [
    (shipment.pickup.coordinates[0] + shipment.delivery.coordinates[0]) / 2,
    (shipment.pickup.coordinates[1] + shipment.delivery.coordinates[1]) / 2,
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Sevkiyat Detayı - {shipment.shipmentNumber}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Durum</Typography>
              <Chip label={shipment.status} color="primary" />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Alış Bilgileri
            </Typography>
            <Typography variant="body1">{shipment.pickup.address}</Typography>
            <Typography variant="body2" color="textSecondary">
              {format(new Date(shipment.pickup.date), 'dd MMMM yyyy HH:mm', { locale: tr })}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Teslimat Bilgileri
            </Typography>
            <Typography variant="body1">{shipment.delivery.address}</Typography>
            <Typography variant="body2" color="textSecondary">
              Beklenen: {format(new Date(shipment.delivery.expectedDate), 'dd MMMM yyyy HH:mm', { locale: tr })}
            </Typography>
            {shipment.delivery.actualDate && (
              <Typography variant="body2" color="textSecondary">
                Gerçekleşen: {format(new Date(shipment.delivery.actualDate), 'dd MMMM yyyy HH:mm', { locale: tr })}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Kargo Bilgileri
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="textSecondary">
                  Tip
                </Typography>
                <Typography variant="body1">{shipment.cargo.type}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="textSecondary">
                  Ağırlık
                </Typography>
                <Typography variant="body1">{shipment.cargo.weight} kg</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="textSecondary">
                  Hacim
                </Typography>
                <Typography variant="body1">{shipment.cargo.volume} m³</Typography>
              </Grid>
            </Grid>
            {shipment.cargo.description && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {shipment.cargo.description}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Fiyat Bilgileri
            </Typography>
            <Typography variant="h6">
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: shipment.price.currency
              }).format(shipment.price.amount)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Rota Haritası
            </Typography>
            <LocationMap
              locations={locations}
              center={center}
              zoom={12}
              height={400}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
}; 