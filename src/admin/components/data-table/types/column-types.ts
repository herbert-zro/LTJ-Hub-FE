import React from "react";

export type ColumnDefinition<T> = {
  key: string; // id único por columna
  header: React.ReactNode; // título del header
  className?: string; // w-[120px], text-right, etc.
  cell: (row: T) => React.ReactNode; // render celda
};
