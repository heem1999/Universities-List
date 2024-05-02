import { useContext } from "react";
import { Link } from "react-router-dom";
import { UniversityContext } from "../contexts/UniversityContext";

const UniversitiesList = ({ universities }) => {
  const { dispatch } = useContext(UniversityContext);

  return (
    <div className="blog-list">
      {universities.map((university) => (
        <div className="blog-preview" key={university.id}>
          <Link to={`/universities/${university.id}`}>
            <h2>{university.name}</h2>
            <p>Country: {university.country}</p>
          </Link>
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_University", id: university.id })
            }
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UniversitiesList;
