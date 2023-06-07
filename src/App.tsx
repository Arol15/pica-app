import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";

const API_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`;

interface Image {
  id: number; 
  previewURL: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';
 
function useDebounceValue(value: string, delay = 500) {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
}

function App() {

  const [searchResult, setSearchResult] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounceValue(searchQuery);

  useEffect(() => {
    setError(null);

    const getImages = async () => {
      setStatus('idle')
      setSearchResult([]);
      if (debouncedQuery.length > 0) {
        setStatus('loading')
        const response = await fetch(`${API_URL}&q=${debouncedQuery}`)

        if (!response.ok) {
          setStatus('error')
        }

        const data = await response.json();
        setSearchResult(data.hits);
        setStatus('success')
      }
    }
    getImages();

  }, [debouncedQuery, error]);

  return (
    <div>
      <h1>Find your awesome image!</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        {status === 'error' && (
          <p>Sorry, something went wrong :/</p>
        )}
        {status === 'loading' && <p>Hold tight, your images are loading...</p>}
        {searchResult.length === 0 && status === 'success' && <p>No images. Try new search!</p>}

        {searchResult?.map(result => (
          <div key={result.id}> 
            <img src={result.previewURL} alt={`${searchQuery} images`}/> 
          </div>
        ))}
    </div>
  )
}

export default App;
