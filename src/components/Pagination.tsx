interface PaginationProps {
  currentPage: number; 
  paginate: (page: number) => void; 
  totalImages: number; 
  imagesPerPage: number; 
  previousPage: () => void; 
  nextPage: () => void; 
}

function Pagination({currentPage, paginate, totalImages, imagesPerPage, previousPage, nextPage}: PaginationProps) {

  const pages = []; 

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pages.push(i); 
  }

  return (
    <div className='pagination-container'>
      <button className='page-number' onClick={previousPage}>Prev</button>
      {pages.map(page => (
        <button
        key={page}
        onClick={() => paginate(page)}
        className={`page-number ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      <button className='page-number' onClick={nextPage}>Next</button>
    </div>
  )
}

export default Pagination; 