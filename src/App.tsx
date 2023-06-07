import { useEffect, useState } from "react";

const API_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`;

interface Image {
  id: number; 
  previewURL: string;
}

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

  const debouncedQuery = useDebounceValue(searchQuery);

  useEffect(() => {

    const getImages = async () => {
      setSearchResult([]);
      if (debouncedQuery.length > 0) {
        const response = await fetch(`${API_URL}&q=${debouncedQuery}`);
        const data = await response.json();
        setSearchResult(data.hits);
      }
    }
    getImages();
  }, [debouncedQuery]);

  return (
    <div>
      <h1>Find your awesome image!</h1>
      <input placeholder="Search images..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>Search</button>
      <div>
        {searchResult.length > 0 && searchResult.map(result => (
          <div key={result.id}> 
            <img src={result.previewURL} alt={`${searchQuery} images`}/> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
