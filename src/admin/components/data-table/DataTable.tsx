import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import type { ColumnDefinition } from "./types/column-types";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  getRowId?: (row: T, index: number) => string | number;
  emptyMessage?: React.ReactNode;
};

export const DataTable = <T,>({
  data,
  columns,
  getRowId,
  emptyMessage = "Sin datos disponibles",
}: DataTableProps<T>) => {
  const hasData = data.length > 0;
  const columnCount = Math.max(columns.length, 1);

  const resolveRowKey = (row: T, index: number) => {
    const rowId = getRowId?.(row, index);
    return rowId ?? `row-${index}`;
  };

  return (
    <div className="rounded-xl border bg-white mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {!hasData ? (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                className="py-10 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={String(resolveRowKey(row, index))}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
