import {Image} from '../App';

interface ResultsDataViewProps {
  searchResult: Image[]
}

function ResultsDataView({searchResult}: ResultsDataViewProps) {
  return (
    <div>
      {searchResult?.map(result => (
        <div key={result.id}> 
          <img src={result.previewURL} alt='temp image'/> 
        </div>
      ))}
    </div>
  )
}

export default ResultsDataView;