import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const MAX_VISIBLE_PAGES = 5;

  const getVisiblePages = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Show current page + surrounding
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);
    
    for (let i = left; i <= right; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    // Sort and unique
    return pages.filter((page, index, self) => 
      index === self.indexOf(page)
    ).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border-2 border-white/40 shadow-2xl">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 w-12 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* First inside arrows */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-w-[3rem]"
          >
            First
          </button>

          {/* Visible Pages */}
          {visiblePages.map((page, index) => {
            // Check if there's a gap between this page and the previous one
            const prevPage = visiblePages[index - 1];
            const isGap = prevPage && page - prevPage > 1;

            return (
              <div key={page} className="flex items-center gap-1 sm:gap-2">
                {isGap && (
                  <span className="px-1 text-white/80 font-bold tracking-widest">...</span>
                )}
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 font-bold rounded-xl shadow-lg transition-all text-sm min-w-[2.5rem] ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 border-2 border-yellow-300 scale-105 font-black'
                      : 'bg-white/20 hover:bg-white/40 border border-white/40 hover:border-white/60 text-white'
                  }`}
                >
                  {page}
                </button>
              </div>
            );
          })}

          {/* Last button */}
          {totalPages > 1 && (
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-w-[3rem] text-sm"
            >
              Last
            </button>
          )}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 w-12 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

