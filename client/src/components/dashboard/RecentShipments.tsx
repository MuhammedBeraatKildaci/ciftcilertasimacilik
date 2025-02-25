import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { Shipment } from '../../types';

const statusColors: Record<Shipment['status'], 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  'Beklemede': 'default',
  'Onaylandı': 'primary',
  'Yolda': 'warning',
  'Teslim Edildi': 'success',
  'İptal': 'error',
};

interface RecentShipmentsProps {
  shipments: Shipment[];
}

export const RecentShipments: React.FC<RecentShipmentsProps> = ({ shipments }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Son Sevkiyatlar
      </Typography>
      <List>
        {shipments.map((shipment) => (
          <ListItem
            key={shipment._id}
            divider
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
              <Typography variant="subtitle2">
                {shipment.shipmentNumber}
              </Typography>
              <Chip
                label={shipment.status}
                color={statusColors[shipment.status]}
                size="small"
              />
            </Box>
            <ListItemText
              primary={`${shipment.pickup.address} → ${shipment.delivery.address}`}
              secondary={new Date(shipment.pickup.date).toLocaleDateString('tr-TR')}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}; 