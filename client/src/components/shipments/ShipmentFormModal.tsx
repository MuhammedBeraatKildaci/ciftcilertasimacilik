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
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shipmentAPI } from '../../services/api';
import { Shipment } from '../../types';

interface ShipmentFormModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  pickup: Yup.object({
    address: Yup.string().required('Alış adresi gereklidir'),
    date: Yup.string().required('Alış tarihi gereklidir'),
    coordinates: Yup.tuple([
      Yup.number().required('Enlem gereklidir'),
      Yup.number().required('Boylam gereklidir'),
    ]),
  }),
  delivery: Yup.object({
    address: Yup.string().required('Teslimat adresi gereklidir'),
    expectedDate: Yup.string().required('Tahmini teslimat tarihi gereklidir'),
    coordinates: Yup.tuple([
      Yup.number().required('Enlem gereklidir'),
      Yup.number().required('Boylam gereklidir'),
    ]),
  }),
  cargo: Yup.object({
    type: Yup.string().required('Kargo tipi gereklidir'),
    weight: Yup.number().required('Ağırlık gereklidir').positive(),
    volume: Yup.number().required('Hacim gereklidir').positive(),
    description: Yup.string(),
  }),
  price: Yup.object({
    amount: Yup.number().required('Tutar gereklidir').positive(),
    currency: Yup.string().oneOf(['TRY', 'USD', 'EUR']).required('Para birimi gereklidir'),
  }),
});

interface FormValues {
  pickup: {
    address: string;
    date: string;
    coordinates: [number, number];
  };
  delivery: {
    address: string;
    expectedDate: string;
    coordinates: [number, number];
  };
  cargo: {
    type: string;
    weight: number;
    volume: number;
    description: string;
  };
  price: {
    amount: number;
    currency: 'TRY' | 'USD' | 'EUR';
  };
}

export const ShipmentFormModal: React.FC<ShipmentFormModalProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationFn: (shipmentData: Partial<Shipment>) => shipmentAPI.create(shipmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      onClose();
      formik.resetForm();
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      pickup: {
        address: '',
        date: '',
        coordinates: [0, 0],
      },
      delivery: {
        address: '',
        expectedDate: '',
        coordinates: [0, 0],
      },
      cargo: {
        type: '',
        weight: 0,
        volume: 0,
        description: '',
      },
      price: {
        amount: 0,
        currency: 'TRY',
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const shipmentData: Partial<Shipment> = {
        ...values,
        pickup: {
          ...values.pickup,
          coordinates: values.pickup.coordinates as [number, number],
        },
        delivery: {
          ...values.delivery,
          coordinates: values.delivery.coordinates as [number, number],
        },
      };
      mutate(shipmentData);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Sevkiyat Ekle</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Alış Bilgileri */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Alış Bilgileri
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Alış Adresi"
                name="pickup.address"
                value={formik.values.pickup.address}
                onChange={formik.handleChange}
                error={formik.touched.pickup?.address && Boolean(formik.errors.pickup?.address)}
                helperText={formik.touched.pickup?.address && formik.errors.pickup?.address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Alış Tarihi"
                name="pickup.date"
                value={formik.values.pickup.date}
                onChange={formik.handleChange}
                error={formik.touched.pickup?.date && Boolean(formik.errors.pickup?.date)}
                helperText={formik.touched.pickup?.date && formik.errors.pickup?.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Teslimat Bilgileri */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Teslimat Bilgileri
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teslimat Adresi"
                name="delivery.address"
                value={formik.values.delivery.address}
                onChange={formik.handleChange}
                error={formik.touched.delivery?.address && Boolean(formik.errors.delivery?.address)}
                helperText={formik.touched.delivery?.address && formik.errors.delivery?.address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Tahmini Teslimat Tarihi"
                name="delivery.expectedDate"
                value={formik.values.delivery.expectedDate}
                onChange={formik.handleChange}
                error={formik.touched.delivery?.expectedDate && Boolean(formik.errors.delivery?.expectedDate)}
                helperText={formik.touched.delivery?.expectedDate && formik.errors.delivery?.expectedDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Kargo Bilgileri */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Kargo Bilgileri
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Kargo Tipi"
                name="cargo.type"
                value={formik.values.cargo.type}
                onChange={formik.handleChange}
                error={formik.touched.cargo?.type && Boolean(formik.errors.cargo?.type)}
                helperText={formik.touched.cargo?.type && formik.errors.cargo?.type}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Ağırlık (kg)"
                name="cargo.weight"
                value={formik.values.cargo.weight}
                onChange={formik.handleChange}
                error={formik.touched.cargo?.weight && Boolean(formik.errors.cargo?.weight)}
                helperText={formik.touched.cargo?.weight && formik.errors.cargo?.weight}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Hacim (m³)"
                name="cargo.volume"
                value={formik.values.cargo.volume}
                onChange={formik.handleChange}
                error={formik.touched.cargo?.volume && Boolean(formik.errors.cargo?.volume)}
                helperText={formik.touched.cargo?.volume && formik.errors.cargo?.volume}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Kargo Açıklaması"
                name="cargo.description"
                value={formik.values.cargo.description}
                onChange={formik.handleChange}
              />
            </Grid>

            {/* Fiyat Bilgileri */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Fiyat Bilgileri
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Tutar"
                name="price.amount"
                value={formik.values.price.amount}
                onChange={formik.handleChange}
                error={formik.touched.price?.amount && Boolean(formik.errors.price?.amount)}
                helperText={formik.touched.price?.amount && formik.errors.price?.amount}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Para Birimi"
                name="price.currency"
                value={formik.values.price.currency}
                onChange={formik.handleChange}
              >
                <MenuItem value="TRY">TRY</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </TextField>
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