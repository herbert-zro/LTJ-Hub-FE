import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [openActionsFor, setOpenActionsFor] = React.useState<
    string | number | null
  >(null);

  const actionsColumn = columns.find((column) => column.key === "actions");
  const cardColumns = columns.filter((column) => column.key !== "actions");

  const resolveRowKey = (row: T, index: number) => {
    const rowId = getRowId?.(row, index);
    return rowId ?? `row-${index}`;
  };

  return (
    <>
      <div className="mb-4 space-y-3 md:hidden">
        {!hasData ? (
          <div className="rounded-xl border bg-white px-4 py-10 text-center text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          data.map((row, index) => {
            const rowKey = resolveRowKey(row, index);
            const isActionsOpen = openActionsFor === rowKey;

            return (
              <div
                key={String(rowKey)}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    {cardColumns.map((col) => (
                      <div key={col.key} className="space-y-1">
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                          {col.header}
                        </p>
                        <div className="text-sm">{col.cell(row)}</div>
                      </div>
                    ))}
                  </div>

                  {actionsColumn && (
                    <div className="relative shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Abrir acciones"
                        onClick={() =>
                          setOpenActionsFor(isActionsOpen ? null : rowKey)
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>

                      {isActionsOpen && (
                        <div className="bg-background absolute top-10 right-0 z-20 min-w-28 rounded-md border p-1 shadow-md">
                          {actionsColumn.cell(row)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mb-4 hidden rounded-xl border bg-white md:block">
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
    </>
  );
};
