import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
}

export const CustomPagination = ({
  totalPages,
  currentPage = 1,
  onPageChange,
  maxVisiblePages = 4,
}: Props) => {
  const handlePageChange =
    onPageChange ??
    (() => {
      return;
    });

  const page = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const visiblePagesCount = Math.min(Math.max(maxVisiblePages, 1), totalPages);

  let startPage = Math.max(1, page - Math.floor(visiblePagesCount / 2));
  let endPage = startPage + visiblePagesCount - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePagesCount + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-corp-gray-200 bg-surface-page p-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {startPage > 1 && (
        <span className="px-1 text-corp-gray-500" aria-hidden="true">
          ...
        </span>
      )}

      {visiblePages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={page === pageNumber ? "default" : "outline"}
          size="sm"
          className={
            page === pageNumber
              ? "border border-brand-500 bg-brand-500 text-white font-semibold hover:bg-brand-600"
              : "border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
          }
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      {endPage < totalPages && (
        <span className="px-1 text-corp-gray-500" aria-hidden="true">
          ...
        </span>
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
