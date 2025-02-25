import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { shipmentAPI } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Shipment } from '../../types';

interface StatusStats {
  [key: string]: number;
}

interface MonthlyStats {
  [key: string]: number;
}

interface ChartData {
  status: string;
  count: number;
}

const ReportsPage: React.FC = () => {
  const { data: shipments = [], isLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: () => shipmentAPI.getAll(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Sevkiyat durumlarına göre istatistikler
  const statusStats = (shipments as Shipment[]).reduce((acc: StatusStats, shipment: Shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {} as StatusStats);

  const chartData: ChartData[] = Object.entries(statusStats).map(([status, count]) => ({
    status,
    count,
  }));

  // Aylık sevkiyat sayıları
  const monthlyStats = (shipments as Shipment[]).reduce((acc: MonthlyStats, shipment: Shipment) => {
    const month = new Date(shipment.pickup.date).toLocaleString('tr-TR', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as MonthlyStats);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Raporlar
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sevkiyat Durumları
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Aylık Sevkiyat Sayıları
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ay</TableCell>
                    <TableCell align="right">Sevkiyat Sayısı</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(monthlyStats).map(([month, count]) => (
                    <TableRow key={month}>
                      <TableCell>{month}</TableCell>
                      <TableCell align="right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage; 