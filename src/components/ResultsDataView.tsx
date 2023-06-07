import {Image} from '../App';

interface ResultsDataViewProps {
  searchResult: Image[]
}

function ResultsDataView({searchResult}: ResultsDataViewProps) {
  return (
    <div className='images-container'>
      {searchResult?.map(result => (
        <div className='grid-image'key={result.id}> 
          <img src={result.previewURL} alt='temp image'/> 
        </div>
      ))}
    </div>
  )
}

export default ResultsDataView;