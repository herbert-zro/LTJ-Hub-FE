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
      <label
        htmlFor={inputId}
        className="whitespace-nowrap text-sm font-semibold text-text-strong"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-corp-gray-200 bg-surface-card px-4 py-2 text-text-strong placeholder:text-corp-gray-400 transition-colors hover:border-corp-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100/70 focus:outline-none sm:min-w-70"
      />
    </div>
  );
};
