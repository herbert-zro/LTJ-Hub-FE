import { RowsPerPage } from "./RowsPerPage";
import { Searchbar } from "./Searchbar";

type TableToolbarProps = {
  rowsPerPage?: number;
  onRowsPerPageChange?: (value: number) => void;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  inputId?: string;
};

export const TableToolbar = ({
  rowsPerPage = 25,
  onRowsPerPageChange,
  value,
  onChange,
  label,
  placeholder,
  inputId,
}: TableToolbarProps) => {
  const handleRowsPerPageChange =
    onRowsPerPageChange ??
    (() => {
      return;
    });

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-corp-gray-200 bg-surface-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <RowsPerPage value={rowsPerPage} onChange={handleRowsPerPageChange} />
      <Searchbar
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        inputId={inputId}
      />
    </div>
  );
};
