import React, { createContext, useReducer, useEffect, useState } from "react";
import { universityReducer } from "../reducers/universityReducer";
import { environment } from "../constants/environment";

export const UniversityContext = createContext();

const UniversityContextProvider = (props) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [data, dispatch] = useReducer(universityReducer, [], () => {
    // incase we need to start with load data in the local storge
    return [];
    // const localData = localStorage.getItem("universities");
    // return localData ? JSON.parse(localData) : [];
  });

  const loadDataFromLocalStorge = () => {
    const localData = localStorage.getItem("universities");

    if (JSON.parse(localData).length > 0) {
      // there is a problem with connection so we will load data from the local storage if there is a data on it
      dispatch({ type: "ADD_University", payload: JSON.parse(localData) });
    } else {
      dispatch({ type: "ADD_University", payload: [] });
      localStorage.setItem("universities", JSON.stringify([]));
      setError("Could not fetch the data for that resource.");
    }

    dispatch({ type: "SORT_ASC" });
  };
  const getData = (url) => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setError(null);
          if (data.length > 0) {
            // add ID field to the row data
            data.map((university, index) => {
              university["id"] = ++index;
            });
            dispatch({ type: "ADD_University", payload: data });

            // save data to the local storage
            localStorage.setItem("universities", JSON.stringify(data));
          } else {
            // try load data from local storge
            loadDataFromLocalStorge();
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message); // message will appear to show the connection error and load data form local storage

            // try load data from local storge
            loadDataFromLocalStorge();
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  };

  useEffect(() => {
    getData(environment.apiURL);
  }, []);
  return (
    <UniversityContext.Provider value={{ data, isPending, error, dispatch }}>
      {props.children}
    </UniversityContext.Provider>
  );
};

export default UniversityContextProvider;
