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
import { driverAPI } from '../../services/api';
import { Driver, DriverStatus } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { DriverFormModal } from '../../components/drivers/DriverFormModal';
import { DriverDetailModal } from '../../components/drivers/DriverDetailModal';

const statusColors: Record<DriverStatus, 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  'Müsait': 'success',
  'Görevde': 'warning',
  'İzinli': 'primary',
  'Hasta': 'error',
};

const DriversPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState<Driver | null>(null);

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => driverAPI.getAll(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sürücüler</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Yeni Sürücü
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Ehliyet No</TableCell>
              <TableCell>Ehliyet Sınıfı</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver: Driver) => (
              <TableRow key={driver._id}>
                <TableCell>
                  {driver.firstName} {driver.lastName}
                </TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>{driver.licenseType}</TableCell>
                <TableCell>{driver.phoneNumber}</TableCell>
                <TableCell>
                  <Chip
                    label={driver.status}
                    color={statusColors[driver.status as DriverStatus]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => setSelectedDriver(driver)}
                  >
                    Detay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DriverFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {selectedDriver && (
        <DriverDetailModal
          open={Boolean(selectedDriver)}
          onClose={() => setSelectedDriver(null)}
          driver={selectedDriver}
        />
      )}
    </Box>
  );
};

export default DriversPage; 