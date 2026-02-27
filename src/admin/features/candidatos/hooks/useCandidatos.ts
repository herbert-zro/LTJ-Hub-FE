import { useCallback, useMemo, useState } from "react";

import { CANDIDATOS_DATA } from "../mock/candidatos.mock";
import { filterCandidatos } from "../utils/filterCandidatos";

export const useCandidatosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  const filteredData = useMemo(
    () => filterCandidatos(CANDIDATOS_DATA, searchTerm),
    [searchTerm],
  );

  return {
    searchTerm,
    rowsPerPage,
    currentPage,
    filteredData,
    handleSearchChange,
    handleRowsPerPageChange,
    handlePageChange,
  };
};
