import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { driverAPI } from '../../services/api';
import { Driver, DriverStatus } from '../../types';

// Ehliyet tipleri için sabit tanımlama
const LICENSE_TYPES = ['B', 'C', 'D', 'E'] as const;

// Form değerleri için interface
interface FormValues {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseType: typeof LICENSE_TYPES[number];
  phoneNumber: string;
  status: DriverStatus;
}

const validationSchema = yup.object({
  firstName: yup.string().required('Ad gereklidir'),
  lastName: yup.string().required('Soyad gereklidir'),
  licenseNumber: yup.string().required('Ehliyet numarası gereklidir'),
  licenseType: yup.string()
    .oneOf(LICENSE_TYPES, 'Geçerli bir ehliyet sınıfı seçin')
    .required('Ehliyet sınıfı gereklidir'),
  phoneNumber: yup.string().required('Telefon numarası gereklidir'),
});

interface DriverFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const DriverFormModal: React.FC<DriverFormModalProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (driverData: Partial<Driver>) => driverAPI.create(driverData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      onClose();
      formik.resetForm();
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      licenseNumber: '',
      licenseType: 'B',
      phoneNumber: '',
      status: 'Müsait',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values); // FormValues tipi Driver tipiyle uyumlu olduğu için dönüştürmeye gerek yok
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Sürücü Ekle</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="firstName"
                label="Ad"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Soyad"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="licenseNumber"
                label="Ehliyet Numarası"
                value={formik.values.licenseNumber}
                onChange={formik.handleChange}
                error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
                helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="licenseType"
                label="Ehliyet Sınıfı"
                value={formik.values.licenseType}
                onChange={formik.handleChange}
                error={formik.touched.licenseType && Boolean(formik.errors.licenseType)}
                helperText={formik.touched.licenseType && formik.errors.licenseType}
              >
                {LICENSE_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Telefon Numarası"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button type="submit" variant="contained" color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 