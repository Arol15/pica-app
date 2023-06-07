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
      <div className='search-container'>  
        <input 
            className='searchbox'
            placeholder="Search images..." 
            required={true}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            
         />
         <button onClick={() => handleSearch(inputValue)}>
         <svg className="svg-icon" aria-hidden="true" viewBox="0 0 26 26" fill="black">
          <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
           />
         </svg>
         </button>
        </div>
  )
}

export default SearchBar; 