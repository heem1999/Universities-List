import { useHistory, useParams } from "react-router-dom";
import { UniversityContext } from "../contexts/UniversityContext";
import { useContext } from "react";

const UniversityDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data, dispatch } = useContext(UniversityContext);

  const handleBack = () => {
    history.push("/");
  };

  return (
    <div className="blog-details">
      {data.map((university) =>
        university.id == id ? (
          <div key={university.id}>
            <h2>{university.name}</h2>
            <p>Country: {university.country}</p>
            <div>
              {university.web_pages.map((web_page) => (
                <p>Web page: {web_page}</p>
              ))}
            </div>
            <button onClick={handleBack}>Back</button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default UniversityDetails;
