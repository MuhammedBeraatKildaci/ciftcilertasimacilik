import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Virtuoso } from 'react-virtuoso';

interface Column<T> {
  key: string;
  header: string;
  width?: number;
  render?: (item: T) => React.ReactNode;
}

interface VirtualizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export const VirtualizedTable = <T extends { _id: string }>({
  data,
  columns,
}: VirtualizedTableProps<T>) => {
  return (
    <Paper sx={{ height: '70vh', width: '100%' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                style={{ width: column.width }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <Virtuoso
        style={{ height: 'calc(70vh - 56px)' }} // TableHead yüksekliğini çıkar
        data={data}
        itemContent={(index, item) => (
          <Table>
            <TableBody>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={`${item._id}-${column.key}`}
                    style={{ width: column.width }}
                  >
                    {column.render
                      ? column.render(item)
                      : (item as any)[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        )}
      />
    </Paper>
  );
}; 