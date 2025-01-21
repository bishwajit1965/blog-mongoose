import { useEffect, useRef, useState } from "react";

import api from "../services/api"; // Ensure the api instance is configured correctly

const useFetchCollection = (collectionName, queryParams = {}) => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Ref to store the previous queryParams to detect changes
  const prevQueryParamsRef = useRef(queryParams);

  useEffect(() => {
    // Check if collectionName is provided
    if (!collectionName) {
      console.error("Collection name is required.");
      return;
    }

    // Function to fetch data from the backend using the custom Axios instance
    const fetchData = async () => {
      try {
        // API call using the collection name and query parameters
        const response = await api.get(`/${collectionName}`, {
          params: queryParams,
        });

        // Check if the response contains the expected data
        if (Array.isArray(response.data)) {
          setData(response.data); // Set fetched data
        } else {
          setData([]); // Set empty array if response is not as expected
        }
      } catch (err) {
        console.error("Error fetching data:", err); // Debugging log
        setError(err);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    // Check if queryParams have changed
    const queryParamsChanged =
      JSON.stringify(prevQueryParamsRef.current) !==
      JSON.stringify(queryParams);

    if (queryParamsChanged || !data.length) {
      prevQueryParamsRef.current = queryParams; // Update ref to the current queryParams
      // Always fetch data (whether or not queryParams changed)
      fetchData();
    }
  }, [collectionName, queryParams, data.length]); // Effect dependencies

  return { data, setData, loading, error }; // Return state from the hook
};

export default useFetchCollection;
