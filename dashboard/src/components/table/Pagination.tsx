import { useState, useEffect } from 'react';

type PaginationProps = {
  pageChangeHandler: (currentPage: number) => void;
  totalRows: number;
  rowsPerPage: number;
};


const Pagination: React.FC<PaginationProps> = ({ pageChangeHandler, totalRows, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const noOfPages = Math.ceil(totalRows / rowsPerPage);
  const pagesArr = [...new Array(noOfPages)];

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo: number) => setCurrentPage(pageNo);

  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  useEffect(() => {
    const skipFactor = (currentPage - 1) * rowsPerPage;
    pageChangeHandler(currentPage);
  }, [currentPage]);


  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={!canGoBack} className="pagination-btn">Previous</button>
      {pagesArr.map((num, index) => (
        <button
          key={index}
          onClick={() => onPageSelect(index + 1)}
          className={`pagination-btn ${index === currentPage - 1 && 'pagination-btn--active'}`}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={onNextPage} disabled={!canGoNext} className="pagination-btn">Next</button>
    </div>
  );
};

export default Pagination;