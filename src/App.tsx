import { useState } from "react";
import SearchBar from "./components/SearchBar";

const API_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`;

interface Image {
  id: number; 
  previewURL: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

function App() {

  const [searchResult, setSearchResult] = useState<Image[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSearch(inputValue: string) {
    setStatus('idle');
    try{
      setStatus('loading')
      const response = await fetch(`${API_URL}&q=${inputValue}`);
      const data = await response.json();
      setSearchResult(data.hits);
      setStatus('success')

    } catch (error: any) {
      setStatus('error')
      console.log("Error occured while fetching images data", error.message)
    }
  }

  return (
    <div>
      <h1>Find your awesome image!</h1>
      <SearchBar handleSearch={handleSearch}/>
        {status === 'error' && (
          <p>Sorry, something went wrong :/</p>
        )}
        {status === 'loading' && <p>Hold tight, your images are loading...</p>}
        {searchResult.length === 0 && status === 'success' && <p>No images. Please try another search term.</p>}

        {searchResult?.map(result => (
          <div key={result.id}> 
            <img src={result.previewURL} alt='temp image'/> 
          </div>
        ))}
    </div>
  )
}

export default App;
