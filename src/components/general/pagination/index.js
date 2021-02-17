import React from 'react';
import { ContainerPagination } from './styles';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({
  totalRecords = null,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged,
  pageCurrent = 1,
}) => {
  const pagesLimit = typeof pageLimit === 'number' ? pageLimit : 30;
  const totalsRecords = typeof totalRecords === 'number' ? totalRecords : 0;
  const pagesNeighbours =
    typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
  const totalPages = Math.ceil(totalsRecords / pagesLimit);
  const [currentPage, setCurrentPage] = React.useState(pageCurrent);

  const [startCount, setStartCount] = React.useState(currentPage * pageLimit - pageLimit + 1);
  const [endCount, setEndCount] = React.useState(currentPage * pageLimit - pageLimit + pageLimit);

  React.useEffect(() => {
    gotoPage(pageCurrent);
  }, []);

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    setStartCount(currentPage * pageLimit - pageLimit + 1);
    setEndCount(currentPage * pageLimit - pageLimit + pageLimit);

    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pagesLimit,
      totalRecords: totalsRecords,
    };

    setCurrentPage(currentPage);
    if (onPageChanged) onPageChanged(paginationData);
  };

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pagesNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pagesNeighbours * 2 + 1);
  };

  const handleMoveStepLeft = (evt) => {
    evt.preventDefault();
    if (currentPage > 1) gotoPage(currentPage - 1);
  };

  const handleMoveStepRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + 1);
  };

  const fetchPageNumbers = () => {
    // const totalPages = totalPages;
    // const currentPage = currentPage;
    const pageNeighbours = pagesNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pagesNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalsRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <ContainerPagination className={''}>
      <div className="px-4 py-3 flex items-center justify-between sm:px-6">
        <div className="flex-1 flex flex-col justify-between w-full sm:hidden">
          <div className="flex justify-center mb-5">
            <p className="text-sm text-gray-700 space-x-1 font-medium">
              <span className="font-medium">{startCount}</span>
              <span>-</span>
              <span className="font-medium">{endCount}</span>
              <span>of</span>
              <span className="font-medium">{totalsRecords}</span>
              <span>results</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-custom-secondary"
              onClick={(e) => handleMoveStepLeft(e)}
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-custom-secondary"
              onClick={(e) => handleMoveStepRight(e)}
            >
              Next
            </a>
          </div>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 space-x-1 font-medium">
              <span className="font-medium">{startCount}</span>
              <span>-</span>
              <span className="font-medium">{endCount}</span>
              <span>of</span>
              <span className="font-medium">{totalsRecords}</span>
              <span>results</span>
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex space-x-1" aria-label="Pagination">
              {pages.map((page, index) => {
                if (page === LEFT_PAGE)
                  return (
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={(e) => handleMoveLeft(e)}
                      key={index}
                    >
                      <span className="">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  );

                if (page === RIGHT_PAGE)
                  return (
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      onClick={(e) => handleMoveRight(e)}
                      key={index}
                    >
                      <span className="">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  );

                return (
                  <a
                    href="#"
                    className={`${
                      currentPage === page
                        ? 'text-white bg-custom-secondary'
                        : 'text-gray-700 bg-white'
                    } relative inline-flex items-center px-4 py-2 rounded-md  text-sm font-medium  hover:text-white hover:bg-custom-secondary`}
                    onClick={(e) => handleClick(page, e)}
                    key={index}
                  >
                    {page}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </ContainerPagination>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
