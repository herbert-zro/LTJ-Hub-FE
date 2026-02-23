import { RowsPerPage } from "./RowsPerPage";

export const Searchbar = () => {
  return (
    <div className="flex items-center justify-between">
      <RowsPerPage />
      <div className="mb-4 flex w-[30%] items-center justify-end gap-2">
        <label htmlFor="buscar-evaluaciones" className="whitespace-nowrap">
          Buscar:
        </label>
        <input
          id="buscar-evaluaciones"
          type="text"
          placeholder="Buscar evaluaciones..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};
