import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ShipmentsPage from '../pages/shipments/ShipmentsPage';
import DriversPage from '../pages/drivers/DriversPage';
import VehiclesPage from '../pages/vehicles/VehiclesPage';
import ReportsPage from '../pages/reports/ReportsPage';
import { useAuth, hasPermission } from '../contexts/AuthContext';
import { PublicLayout } from '../components/Layout/PublicLayout';
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { ServicesPage } from '../pages/public/ServicesPage';
import { TeamPage } from '../pages/public/TeamPage';
import { ContactPage } from '../pages/public/ContactPage';

const PrivateRoute: React.FC<{ 
  children: React.ReactNode;
  requiredPermission?: 'admin' | 'user';
}> = ({ children, requiredPermission = 'user' }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!hasPermission(user, requiredPermission)) {
    return <Navigate to="/shipments" />;
  }

  return <>{children}</>;
};

export const AppRouter = () => {
  const { user } = useAuth();

  // Giriş yapmış kullanıcı varsa
  if (user) {
    return (
      <BrowserRouter>
        <Routes>
          {/* Admin sayfaları */}
          {user.role === 'admin' && (
            <>
              <Route
                path="/"
                element={
                  <PrivateRoute requiredPermission="admin">
                    <MainLayout>
                      <DashboardPage />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/drivers"
                element={
                  <PrivateRoute requiredPermission="admin">
                    <MainLayout>
                      <DriversPage />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/vehicles"
                element={
                  <PrivateRoute requiredPermission="admin">
                    <MainLayout>
                      <VehiclesPage />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <PrivateRoute requiredPermission="admin">
                    <MainLayout>
                      <ReportsPage />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
            </>
          )}

          {/* Normal kullanıcı sayfaları */}
          <Route
            path="/shipments"
            element={
              <PrivateRoute>
                <MainLayout>
                  <ShipmentsPage />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Varsayılan yönlendirme */}
          <Route
            path="*"
            element={
              <Navigate
                to={user.role === 'admin' ? '/' : '/shipments'}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  // Giriş yapmamış kullanıcılar için
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Public sayfalar */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <ServicesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/team"
          element={
            <PublicLayout>
              <TeamPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />

        {/* Varsayılan yönlendirme */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}; 