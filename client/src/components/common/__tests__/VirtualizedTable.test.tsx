import React from 'react';
import { render, screen } from '@testing-library/react';
import { VirtualizedTable } from '../VirtualizedTable';

const mockData = [
  { id: 1, name: 'Test 1', status: 'Active' },
  { id: 2, name: 'Test 2', status: 'Inactive' },
];

const mockColumns = [
  { key: 'name', header: 'İsim' },
  { key: 'status', header: 'Durum' },
  {
    key: 'actions',
    header: 'İşlemler',
    render: () => <button>Detay</button>,
  },
];

describe('VirtualizedTable', () => {
  it('renders headers correctly', () => {
    render(<VirtualizedTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('İsim')).toBeInTheDocument();
    expect(screen.getByText('Durum')).toBeInTheDocument();
    expect(screen.getByText('İşlemler')).toBeInTheDocument();
  });

  it('renders data rows correctly', () => {
    render(<VirtualizedTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getAllByText('Detay')).toHaveLength(2);
  });

  it('renders custom cell content using render prop', () => {
    const customColumns = [
      {
        key: 'status',
        header: 'Durum',
        render: (item: typeof mockData[0]) => (
          <span data-testid="custom-cell">{item.status}</span>
        ),
      },
    ];

    render(<VirtualizedTable data={mockData} columns={customColumns} />);
    
    expect(screen.getAllByTestId('custom-cell')).toHaveLength(2);
  });
}); 