import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePagination } from '../../hooks/usePagination';
import styles from './DataTable.module.css';

// React.memo to prevent unnecessary re-renders of the DataTable
export const DataTable = React.memo(function DataTable({
  columns,
  data,
  totalItems,
  pageSize = 10,
  currentPage,
  onPageChange,
  sortConfig,
  onSort,
  loading,
  emptyMessage = "No records found"
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount: totalItems,
    siblingCount: 1,
    pageSize
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.pulseSkeleton} />
        <div className={styles.pulseSkeleton} />
        <div className={styles.pulseSkeleton} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className={styles.emptyState}>{emptyMessage}</div>;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`${styles.th} ${col.sortable ? styles.sortable : ''}`}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  <div className={styles.thContent}>
                    {col.label}
                    {col.sortable && sortConfig?.key === col.key && (
                      <span className={styles.sortIcon}>
                        {sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} row={row} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>

      {paginationRange.length > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          
          {paginationRange.map((pageNumber, idx) => {
            if (pageNumber === '...') {
              return <span key={idx} className={styles.dots}>&#8230;</span>;
            }

            return (
              <button
                key={idx}
                className={`${styles.pageButton} ${currentPage === pageNumber ? styles.active : ''}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
});

// React.memo for rows to optimize performance when data updates
const TableRow = React.memo(function TableRow({ row, columns }) {
  return (
    <tr className={styles.tr}>
      {columns.map((col, index) => (
        <td key={index} className={styles.td}>
          {col.render ? col.render(row) : row[col.key]}
        </td>
      ))}
    </tr>
  );
});
