import {useState} from 'react';

interface SearchBarProps {
  handleSearch: any;
}

function SearchBar({handleSearch}: SearchBarProps) {

  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(event: any) { //todo update type
    if(event.key === "Enter") {
      handleSearch(inputValue)
    }
  }
 
  return (
      <div>  
        <input placeholder="Search images..." 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
         />
         <button onClick={() => handleSearch(inputValue)}>Search</button>
        </div>
  )
}

export default SearchBar; 