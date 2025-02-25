import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { shipmentAPI, driverAPI, vehicleAPI } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { DashboardStats } from '../../components/dashboard/DashboardStats';
import { ShipmentStatusChart } from '../../components/dashboard/ShipmentStatusChart';
import { RecentShipments } from '../../components/dashboard/RecentShipments';

const DashboardPage: React.FC = () => {
  const { data: shipments = [], isLoading: isLoadingShipments } = useQuery({
    queryKey: ['shipments'],
    queryFn: () => shipmentAPI.getAll(),
  });

  const { data: drivers = [], isLoading: isLoadingDrivers } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => driverAPI.getAll(),
  });

  const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleAPI.getAll(),
  });

  if (isLoadingShipments || isLoadingDrivers || isLoadingVehicles) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardStats
            shipments={shipments}
            drivers={drivers}
            vehicles={vehicles}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <ShipmentStatusChart shipments={shipments} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <RecentShipments shipments={shipments.slice(0, 5)} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 