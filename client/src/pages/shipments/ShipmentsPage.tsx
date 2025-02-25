import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { shipmentAPI } from '../../services/api';
import { Shipment, ShipmentStatus } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ShipmentFormModal } from '../../components/shipments/ShipmentFormModal';
import { ShipmentDetailModal } from '../../components/shipments/ShipmentDetailModal';
import { VirtualizedTable } from '../../components/common/VirtualizedTable';
import { useDebounce } from '../../hooks/useDebounce';

const statusColors: Record<ShipmentStatus, 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  'Beklemede': 'default',
  'Onaylandı': 'primary',
  'Yolda': 'warning',
  'Teslim Edildi': 'success',
  'İptal': 'error',
};

const ShipmentsPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: shipments = [], isLoading } = useQuery({
    queryKey: ['shipments', debouncedSearchTerm],
    queryFn: () => shipmentAPI.getAll(debouncedSearchTerm),
  });

  const columns = useMemo(
    () => [
      { 
        key: 'shipmentNumber', 
        header: 'Sevkiyat No', 
        width: 150 
      },
      { 
        key: 'pickup.address', 
        header: 'Alış Adresi',
        render: (shipment: Shipment) => shipment.pickup.address 
      },
      { 
        key: 'delivery.address', 
        header: 'Teslimat Adresi',
        render: (shipment: Shipment) => shipment.delivery.address 
      },
      {
        key: 'status',
        header: 'Durum',
        width: 120,
        render: (shipment: Shipment) => (
          <Chip
            label={shipment.status}
            color={statusColors[shipment.status as ShipmentStatus]}
            size="small"
          />
        ),
      },
      {
        key: 'actions',
        header: 'İşlemler',
        width: 100,
        render: (shipment: Shipment) => (
          <Button
            size="small"
            onClick={() => setSelectedShipment(shipment)}
          >
            Detay
          </Button>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sevkiyatlar</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Yeni Sevkiyat
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Sevkiyat Ara"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <VirtualizedTable<Shipment>
        data={shipments as Shipment[]}
        columns={columns}
      />

      <ShipmentFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {selectedShipment && (
        <ShipmentDetailModal
          open={Boolean(selectedShipment)}
          onClose={() => setSelectedShipment(null)}
          shipment={selectedShipment}
        />
      )}
    </Box>
  );
};

export default ShipmentsPage; 