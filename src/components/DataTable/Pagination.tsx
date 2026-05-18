import { clsx } from "clsx";

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export const Pagination = ({
  totalPages,
  setPage,
  page,
}: {
  totalPages: number;
  setPage: (page: number) => void;
  page: number;
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page > totalPages - 3) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages.map((p, idx) => {
      if (p === "...") {
        return (
          <span key={idx} className="px-1 py-1 text-gray-500 font-bold">
            ...
          </span>
        );
      }
      return (
        <button
          key={idx}
          onClick={() => handlePageChange(p as number)}
          className={clsx(
            "min-w-[32px] h-[32px] px-1.5 flex items-center justify-center rounded-[10px] text-sm font-bold transition-colors",
            page === p
              ? "bg-[#FDAF08] text-white"
              : "bg-transparent text-gray-700 hover:bg-gray-100"
          )}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center gap-1 w-fit rounded-[10px]">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="min-w-[32px] h-[32px] flex items-center justify-center rounded-[10px] text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft />
      </button>
      
      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="min-w-[32px] h-[32px] flex items-center justify-center rounded-[10px] text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
