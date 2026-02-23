import type React from "react";

export type ColumnDefinition = {
  key: string; // id único por columna
  header: React.ReactNode; // título del header
  className?: string; // w-[120px], text-right, etc.
  cell: (row: any) => React.ReactNode; // render celda
};
