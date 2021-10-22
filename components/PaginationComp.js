import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';

function PaginationComp({ pageCount, page, setPage }) {
  
  const handleChange = (e, value) => {
    e.preventDefault()
    setPage(value);
  };
  return (
    <div className='pagination-wrap'>
      <Pagination
        boundaryCount={1}
        siblingCount={1}
        count={pageCount}
        variant='outlined'
        shape='rounded'
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}

export default PaginationComp;
