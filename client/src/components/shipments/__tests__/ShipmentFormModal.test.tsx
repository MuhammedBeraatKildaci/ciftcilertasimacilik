import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShipmentFormModal } from '../ShipmentFormModal';

const queryClient = new QueryClient();
const mockOnClose = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('ShipmentFormModal', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders form fields correctly', () => {
    render(
      <ShipmentFormModal open={true} onClose={mockOnClose} />,
      { wrapper }
    );

    expect(screen.getByLabelText(/alış adresi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teslimat adresi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kargo tipi/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <ShipmentFormModal open={true} onClose={mockOnClose} />,
      { wrapper }
    );

    const submitButton = screen.getByText(/kaydet/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/alış adresi gereklidir/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(
      <ShipmentFormModal open={true} onClose={mockOnClose} />,
      { wrapper }
    );

    fireEvent.change(screen.getByLabelText(/alış adresi/i), {
      target: { value: 'Test Adres 1' },
    });
    fireEvent.change(screen.getByLabelText(/teslimat adresi/i), {
      target: { value: 'Test Adres 2' },
    });
    // Diğer form alanlarını doldur...

    const submitButton = screen.getByText(/kaydet/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
}); 