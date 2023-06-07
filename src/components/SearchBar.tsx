interface SearchBarProps {
  searchQuery: string; 
  setSearchQuery: (value: string) => void; 
}

function SearchBar({searchQuery, setSearchQuery}: SearchBarProps) {
  return (
      <>  
        <input placeholder="Search images..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
         <button>Search</button>
        </>
  )
}

export default SearchBar; 