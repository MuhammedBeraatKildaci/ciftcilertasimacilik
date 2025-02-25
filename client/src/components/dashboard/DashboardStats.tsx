import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  LocalShipping,
  Person,
  DirectionsCar,
  Timeline,
} from '@mui/icons-material';
import { Shipment, Driver, Vehicle } from '../../types';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

interface DashboardStatsProps {
  shipments: Shipment[];
  drivers: Driver[];
  vehicles: Vehicle[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  shipments,
  drivers,
  vehicles,
}) => {
  const activeShipments = shipments.filter(
    (s) => s.status === 'Yolda' || s.status === 'Onaylandı'
  ).length;

  const availableDrivers = drivers.filter((d) => d.status === 'Müsait').length;
  const availableVehicles = vehicles.filter((v) => v.status === 'Müsait').length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <StatCard
          title="Aktif Sevkiyatlar"
          value={activeShipments}
          icon={<LocalShipping color="primary" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard
          title="Müsait Sürücüler"
          value={availableDrivers}
          icon={<Person color="primary" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard
          title="Müsait Araçlar"
          value={availableVehicles}
          icon={<DirectionsCar color="primary" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <StatCard
          title="Toplam Sevkiyat"
          value={shipments.length}
          icon={<Timeline color="primary" />}
        />
      </Grid>
    </Grid>
  );
}; 