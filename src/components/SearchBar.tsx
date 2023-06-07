import {useState} from 'react';

interface SearchBarProps {
  handleSearch: any;
}

function SearchBar({handleSearch}: SearchBarProps) {

  const [inputValue, setInputValue] = useState('');

  return (
      <>  
        <input placeholder="Search images..." 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
         />
         <button onClick={() => handleSearch(inputValue)}>Search</button>
        </>
  )
}

export default SearchBar; 