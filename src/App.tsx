import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsDataView from "./components/ResultsDataView";
import Pagination from "./components/Pagination";

const API_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`;

export interface Image {
  id: number; 
  previewURL: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const IMAGES_PER_REQUEST = 200; 
const IMAGES_PER_PAGE = 20; 

function App() {

  const [searchResult, setSearchResult] = useState<Image[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits] = useState(0);

  const indexOfLastImage = currentPage * IMAGES_PER_PAGE; 
  const indexOfFirstPost = indexOfLastImage - IMAGES_PER_PAGE; 
  const currentImages = searchResult.slice(indexOfFirstPost, indexOfLastImage);

  async function handleSearch(inputValue: string) {
    if(inputValue.length === 0) return;
    setStatus('idle');
    try{
      setStatus('loading')
      const response = await fetch(`${API_URL}&q=${inputValue}&per_page=${IMAGES_PER_REQUEST}`);
      const data = await response.json();
      setSearchResult(data.hits);
      setStatus('success')

    } catch (error: any) {
      setStatus('error')
      console.log("Error occured while fetching images data", error.message)
    }
  }

  function paginate(page: number) {
    setCurrentPage(page); 
  }

  return (
    <div className="wrapper">
      <header className="header">
        <div className='logo'> 
        <span role='img'>📸 </span>
        <h1>Pica App</h1>
        </div>
        <SearchBar handleSearch={handleSearch}/>
        {searchResult.length > 0 && <p className="num-results">Found {searchResult.length} results</p>}
      </header>

        {status === 'error' && (
          <p className="status-message">Sorry, something went wrong.</p>
        )}

        {status === 'loading' && <p className="status-message">Loading...</p>}
        {searchResult.length === 0 && status === 'success' && <p className="status-message">No images. Please try another search term.</p>}
      <ResultsDataView searchResult={currentImages}/>
      {searchResult.length > 0 && <Pagination currentPage={currentPage} paginate={paginate} totalImages={IMAGES_PER_REQUEST} imagesPerPage={IMAGES_PER_PAGE} />}
    </div>
  )
}

export default App;
