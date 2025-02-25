import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { AppRouter } from './routes';
import { NotificationProvider } from './contexts/NotificationContext';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { theme } from './theme';

// React Query istemcisi
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Route bazlı code splitting
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const ShipmentsPage = React.lazy(() => import('./pages/shipments/ShipmentsPage'));
const DriversPage = React.lazy(() => import('./pages/drivers/DriversPage'));
const VehiclesPage = React.lazy(() => import('./pages/vehicles/VehiclesPage'));
const ReportsPage = React.lazy(() => import('./pages/reports/ReportsPage'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <AppRouter />
            </Suspense>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 