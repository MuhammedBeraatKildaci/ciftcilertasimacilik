import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { vehicleAPI } from '../../services/api';
import { Vehicle, VehicleStatus } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { VehicleFormModal } from '../../components/vehicles/VehicleFormModal';
import { VehicleDetailModal } from '../../components/vehicles/VehicleDetailModal';

const statusColors: Record<VehicleStatus, 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  'Müsait': 'success',
  'Yolda': 'warning',
  'Bakımda': 'primary',
  'Arızalı': 'error',
};

const VehiclesPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleAPI.getAll(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Araçlar</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Yeni Araç
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plaka</TableCell>
              <TableCell>Araç Tipi</TableCell>
              <TableCell>Kapasite</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Son Bakım</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(vehicles as Vehicle[]).map((vehicle: Vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.plateNumber}</TableCell>
                <TableCell>{vehicle.vehicleType}</TableCell>
                <TableCell>
                  {vehicle.capacity.weight} kg / {vehicle.capacity.volume} m³
                </TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status}
                    color={statusColors[vehicle.status as VehicleStatus]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {vehicle.lastMaintenance?.date
                    ? new Date(vehicle.lastMaintenance.date).toLocaleDateString('tr-TR')
                    : '-'}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    Detay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <VehicleFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {selectedVehicle && (
        <VehicleDetailModal
          open={Boolean(selectedVehicle)}
          onClose={() => setSelectedVehicle(null)}
          vehicle={selectedVehicle}
        />
      )}
    </Box>
  );
};

export default VehiclesPage; 