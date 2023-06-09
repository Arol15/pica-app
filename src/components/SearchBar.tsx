import { KeyboardEvent, useState} from 'react';

interface SearchBarProps {
  handleSearch(inputValue: string): Promise<void>;
}

function SearchBar({handleSearch}: SearchBarProps) {

  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) { 
    if(event.key === "Enter") {
      handleSearch(inputValue)
    }
  }
 
  return (
      <div className='search-container'>  
        <input 
            className='searchbox'
            placeholder="Search images..." 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            
         />
         <button onClick={() => handleSearch(inputValue)}>
          Search
         </button>
        </div>
  )
}

export default SearchBar; 