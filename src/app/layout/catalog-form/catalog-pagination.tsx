import React, { FC, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { classNames, getArrayWithPaginationNumber, IPageCounter } from '../../models';

interface Props {
  pageCounter: IPageCounter;
  setPageCounter: React.Dispatch<React.SetStateAction<IPageCounter>>;
}

const CatalogPagination: FC<Props> = ({ pageCounter, setPageCounter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const totalPageCount = Math.ceil(pageCounter.totalProducts / pageCounter.itemsPerPage);
    setTotalPages(totalPageCount);

    setPaginationPageNumbers(getArrayWithPaginationNumber(currentPage, totalPageCount));
  }, [pageCounter.totalProducts, currentPage]);

  useEffect(() => {
    setPageCounter((prev) => {
      return {
        ...prev,
        offset: (currentPage - 1) * pageCounter.itemsPerPage,
      };
    });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(pageCounter.offset / pageCounter.itemsPerPage + 1);
  }, [pageCounter.offset]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* small screen pagination */}
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-300"
        >
          Previous
        </button>
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{(currentPage - 1) * pageCounter.itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * pageCounter.itemsPerPage, pageCounter.totalProducts)}
            </span>{' '}
            of <span className="font-medium">{pageCounter.totalProducts}</span>
          </p>
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      {/* large screen pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageCounter.itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * pageCounter.itemsPerPage, pageCounter.totalProducts)}
            </span>{' '}
            <span className="font-medium">{pageCounter.totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-300"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {paginationPageNumbers.map((pageNumber, i) => {
              if (pageNumber === 0)
                return (
                  <div
                    key={Math.random().toString().slice(2, 7)}
                    className="relative inline-flex items-center px-2.5 cursor-default select-none py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </div>
                );
              return (
                <button
                  key={pageNumber + i}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-green-600 focus:z-20 focus:outline-offset-0',
                    currentPage === pageNumber
                      ? 'bg-green-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500'
                      : ''
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-300"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CatalogPagination;
