import { RowsPerPage } from "./RowsPerPage";

type SearchbarProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  inputId?: string;
};

export const Searchbar = ({
  value = "",
  onChange,
  label = "Buscar:",
  placeholder = "Buscar evaluaciones...",
  inputId = "buscar-evaluaciones",
}: SearchbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <RowsPerPage />
      <div className="mb-4 flex w-[30%] items-center justify-end gap-2">
        <label htmlFor={inputId} className="whitespace-nowrap">
          {label}
        </label>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};
