const API_URL = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}`

function App() {

  console.log(API_URL)

  return (
    <div>
      <h1>Find your awesome image!</h1>
      <input placeholder="Search for images "></input>
      <button>Search</button>
      <div>
        result images go here...
      </div>
    </div>
  )
}

export default App;
