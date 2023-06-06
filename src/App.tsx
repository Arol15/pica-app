import { useEffect, useState } from "react";

const API_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`;

interface Image {
  id: number; 
  previewURL: string;
}

function App() {

  const [searchResult, setSearchResult] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    const getImages = async () => {
      const response = await fetch(`${API_URL}&q=${searchQuery}`);
      const data = await response.json();
      setSearchResult(data.hits)
    }
    getImages();
  }, [searchQuery]);

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
            <img src={result.previewURL} /> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
