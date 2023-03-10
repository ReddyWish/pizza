import React from 'react';
import styles from './pagination.module.scss'
import _ from "lodash"

type PaginationProps = {itemsCount: number, pageSize: number, onPageChange: (page: number) => void, currentPage: number }

const Pagination:React.FC<PaginationProps> = ({itemsCount, pageSize, onPageChange, currentPage}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null
  const pages: [number] = _.range(1, pageCount + 1)
  return (
    <ul className={styles.pagination}>
      {
        pages.map(page => <li key={page} onClick={() => onPageChange(page)} className={currentPage === page ? styles.active : ''}>{page}</li>)
      }
    </ul>
  );
}

export default Pagination;