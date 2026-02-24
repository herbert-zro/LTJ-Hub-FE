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
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
      <label htmlFor={inputId} className="whitespace-nowrap">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-4 py-2 sm:min-w-70"
      />
    </div>
  );
};
