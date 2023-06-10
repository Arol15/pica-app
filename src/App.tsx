import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsDataView from "./components/ResultsDataView";
import Pagination from "./components/Pagination";

const API_URL = `https://pixabay.com/api/?key=${
  import.meta.env.VITE_PIXABAY_API_KEY
}`;
const IMAGES_PER_REQUEST = 200;
const IMAGES_PER_PAGE = 20;

export interface Image {
  id: number;
  webformatURL: string;
  user: string;
  views: number;
}

type Status = "idle" | "loading" | "success" | "error";

function App() {
  const [searchResult, setSearchResult] = useState<Image[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const indexOfLastImage = currentPage * IMAGES_PER_PAGE;
  const indexOfFirstPost = indexOfLastImage - IMAGES_PER_PAGE;
  const currentImages = searchResult?.slice(indexOfFirstPost, indexOfLastImage);

  async function handleSearch(inputValue: string) {
    if (inputValue.length === 0) return;
    setStatus("idle");
    setCurrentPage(1);
    try {
      setStatus("loading");
      const response = await fetch(
        `${API_URL}&q=${inputValue}&per_page=${IMAGES_PER_REQUEST}`
      );
      const data = await response.json();
      setSearchResult(data.hits);
      setTotalHits(data.totalHits);
      setStatus("success");
    } catch (error: any) {
      setStatus("error");
      console.log("Error occured while fetching images data", error.message);
    }
  }

  function paginate(page: number) {
    setCurrentPage(page);
  }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== Math.ceil(searchResult.length / IMAGES_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="wrapper">
      <header className="header">
        <div className="logo">
          <span role="img">📸 </span>
          <h1>Pica App</h1>
        </div>
        <div className="search-details">
          <SearchBar handleSearch={handleSearch} />
          {searchResult.length > 0 && (
            <p className="num-results">Found {searchResult.length} results</p>
          )}
        </div>
      </header>
      {status === "error" && (
        <p className="status-message">Sorry, something went wrong.</p>
      )}
      {status === "loading" && <p className="status-message">Loading...</p>}
      {totalHits === 0 && status === "success" && (
        <p className="status-message">
          No images. Please try another search term.
        </p>
      )}
      <ResultsDataView searchResult={currentImages} />
      {searchResult.length > 0 && (
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          totalImages={
            totalHits < IMAGES_PER_REQUEST ? totalHits : IMAGES_PER_REQUEST
          }
          imagesPerPage={IMAGES_PER_PAGE}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
}

export default App;
