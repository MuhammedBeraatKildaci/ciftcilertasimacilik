import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShipmentsPage } from '../ShipmentsPage';
import { mockShipments } from '../../../mocks/mockData';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('ShipmentsPage', () => {
  it('renders loading state initially', () => {
    render(<ShipmentsPage />, { wrapper });
    expect(screen.getByText(/yükleniyor/i)).toBeInTheDocument();
  });

  it('renders shipments after loading', async () => {
    render(<ShipmentsPage />, { wrapper });
    
    await waitFor(() => {
      expect(screen.getByText(mockShipments[0].shipmentNumber)).toBeInTheDocument();
    });
  });

  it('filters shipments when searching', async () => {
    render(<ShipmentsPage />, { wrapper });
    
    const searchInput = screen.getByLabelText(/sevkiyat ara/i);
    fireEvent.change(searchInput, { target: { value: 'istanbul' } });
    
    await waitFor(() => {
      expect(screen.getByText('İstanbul, Kadıköy')).toBeInTheDocument();
    });
  });

  it('opens detail modal when clicking detail button', async () => {
    render(<ShipmentsPage />, { wrapper });
    
    await waitFor(() => {
      const detailButton = screen.getAllByText(/detay/i)[0];
      fireEvent.click(detailButton);
    });
    
    expect(screen.getByText(/sevkiyat detayı/i)).toBeInTheDocument();
  });
}); 