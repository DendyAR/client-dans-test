import React from 'react';

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize);
  
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  
    return (
      <div>
      <ul className="inline-flex -space-x-px">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage ? `text-gray-700 font-extrabold text-base bg-blue-600` : `text-gray-500 font-normal text-base`
            }
          >
            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
    );
  };
  
  export default Pagination;
