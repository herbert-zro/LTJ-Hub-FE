import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { EMPRESAS_DATA } from "../mock/empresas.mock";
import { filterEmpresas } from "../utils/filterEmpresas.ts";

export const useEmpresas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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

  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const handleViewDetails = useCallback(
    (id: number) => {
      navigate(`/admin/empresas/${id}`);
    },
    [navigate],
  );

  const handleDelete = useCallback((id: number) => {
    setDeleteTargetId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTargetId === null) {
      return;
    }

    console.log("delete", deleteTargetId);
    setDeleteTargetId(null);
  }, [deleteTargetId]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteTargetId(null);
  }, []);

  const filteredData = useMemo(
    () => filterEmpresas(EMPRESAS_DATA, searchTerm),
    [searchTerm],
  );

  return {
    searchTerm,
    rowsPerPage,
    currentPage,
    deleteTargetId,
    filteredData,
    handleSearchChange,
    handleRowsPerPageChange,
    handlePageChange,
    handleViewDetails,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCloseDeleteModal,
  };
};
