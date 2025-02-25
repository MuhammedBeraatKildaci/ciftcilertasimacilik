import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleAPI } from '../../services/api';
import { Vehicle, VehicleStatus, VEHICLE_TYPES, VehicleType } from '../../types';

interface VehicleFormModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  plateNumber: string;
  vehicleType: VehicleType;
  capacity: {
    weight: number;
    volume: number;
  };
  status: VehicleStatus;
}

const validationSchema = Yup.object({
  plateNumber: Yup.string().required('Plaka numarası gereklidir'),
  vehicleType: Yup.string()
    .oneOf(VEHICLE_TYPES, 'Geçerli bir araç tipi seçin')
    .required('Araç tipi gereklidir'),
  capacity: Yup.object({
    weight: Yup.number().required('Ağırlık kapasitesi gereklidir').positive(),
    volume: Yup.number().required('Hacim kapasitesi gereklidir').positive(),
  }),
});

export const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationFn: (vehicleData: Partial<Vehicle>) => vehicleAPI.create(vehicleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      onClose();
      formik.resetForm();
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      plateNumber: '',
      vehicleType: VEHICLE_TYPES[0],
      capacity: {
        weight: 0,
        volume: 0,
      },
      status: 'Müsait',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values); // FormValues tipi Vehicle tipiyle uyumlu
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Araç Ekle</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plaka"
                name="plateNumber"
                value={formik.values.plateNumber}
                onChange={formik.handleChange}
                error={formik.touched.plateNumber && Boolean(formik.errors.plateNumber)}
                helperText={formik.touched.plateNumber && formik.errors.plateNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Araç Tipi"
                name="vehicleType"
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
                helperText={formik.touched.vehicleType && formik.errors.vehicleType}
              >
                {VEHICLE_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Ağırlık Kapasitesi (kg)"
                name="capacity.weight"
                value={formik.values.capacity.weight}
                onChange={formik.handleChange}
                error={formik.touched.capacity?.weight && Boolean(formik.errors.capacity?.weight)}
                helperText={formik.touched.capacity?.weight && formik.errors.capacity?.weight}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Hacim Kapasitesi (m³)"
                name="capacity.volume"
                value={formik.values.capacity.volume}
                onChange={formik.handleChange}
                error={formik.touched.capacity?.volume && Boolean(formik.errors.capacity?.volume)}
                helperText={formik.touched.capacity?.volume && formik.errors.capacity?.volume}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!formik.isValid}
          >
            Kaydet
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 