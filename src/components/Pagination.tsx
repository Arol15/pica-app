interface PaginationProps {
  currentPage: number; 
  paginate: any; 
  totalImages: number; 
  imagesPerPage: number; 
  previousPage: any; 
  nextPage: any; 
}

function Pagination({currentPage, paginate, totalImages, imagesPerPage, previousPage, nextPage}: PaginationProps) {

  const pages = []; 

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pages.push(i); 
  }

  return (
    <div>
      <button onClick={previousPage}>Prev</button>
      {pages.map(page => (
        <button
        key={page}
        onClick={() => paginate(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={nextPage}>Next</button>
    </div>
  )
}

export default Pagination; 