import { Image } from "../App";

interface ResultsDataViewProps {
  searchResult: Image[];
}

function ResultsDataView({ searchResult }: ResultsDataViewProps) {
  return (
    <div className="images-container">
      {searchResult?.map((result) => (
        <div className="image-card" key={result.id}>
          <img
            className="result-image"
            src={result.webformatURL}
            alt="searched image"
          />
          <div className="image-details">
            <p className="username">By: {result.user || "None"}</p>
            <p className="views">Views: {result.views || "0"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsDataView;
