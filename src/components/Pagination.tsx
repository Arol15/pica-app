interface PaginationProps {
  currentPage: number; 
  paginate: any; 
  totalImages: number; 
  imagesPerPage: number; 
}

function Pagination({currentPage, paginate, totalImages, imagesPerPage}: PaginationProps) {

  const pages = []; 

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pages.push(i); 
  }

  return (
    <div>
      {pages.map(page => (
        <button>
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination; 