import { RowsPerPage } from "./RowsPerPage";
import { Searchbar } from "./Searchbar";

type TableToolbarProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  inputId?: string;
};

export const TableToolbar = ({
  value,
  onChange,
  label,
  placeholder,
  inputId,
}: TableToolbarProps) => {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-corp-gray-200 bg-surface-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <RowsPerPage />
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
