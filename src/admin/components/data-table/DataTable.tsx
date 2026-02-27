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
  const formatHeaderLabel = (header: React.ReactNode) => {
    if (typeof header !== "string") {
      return header;
    }

    const text = header.trim();

    if (!text) {
      return header;
    }

    const hasLetters = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(text);

    if (!hasLetters || text !== text.toUpperCase()) {
      return header;
    }

    return text
      .toLowerCase()
      .replace(
        /(^|[\s\-_/()])([\p{L}])/gu,
        (_match, separator: string, character: string) =>
          `${separator}${character.toUpperCase()}`,
      );
  };

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
          <div className="rounded-xl border border-corp-gray-200 bg-surface-page px-4 py-10 text-center text-corp-gray-500">
            {emptyMessage}
          </div>
        ) : (
          data.map((row, index) => {
            const rowKey = resolveRowKey(row, index);
            const isActionsOpen = openActionsFor === rowKey;

            return (
              <div
                key={String(rowKey)}
                className="rounded-xl border border-corp-gray-200 bg-surface-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    {cardColumns.map((col) => (
                      <div key={col.key} className="space-y-1">
                        <p className="text-brand-500 text-xs font-semibold tracking-wide">
                          {formatHeaderLabel(col.header)}
                        </p>
                        <div className="text-sm text-text-strong">
                          {col.cell(row)}
                        </div>
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
                        className="text-corp-gray-500 hover:bg-brand-100 hover:text-brand-500"
                        onClick={() =>
                          setOpenActionsFor(isActionsOpen ? null : rowKey)
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>

                      {isActionsOpen && (
                        <div className="absolute top-10 right-0 z-20 min-w-28 rounded-md border border-corp-gray-200 bg-surface-card p-1 shadow-md">
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

      <div className="mb-4 hidden rounded-xl border border-corp-gray-200 bg-surface-card md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-page hover:bg-corp-gray-100">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`${col.className ?? ""} border-b border-corp-gray-200 text-brand-500 font-semibold first:pl-5`}
                >
                  {formatHeaderLabel(col.header)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!hasData ? (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="py-10 text-center text-corp-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={String(resolveRowKey(row, index))}
                  className="border-corp-gray-200 hover:bg-surface-page"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={`${col.className ?? ""} text-text-strong first:pl-5`}
                    >
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
