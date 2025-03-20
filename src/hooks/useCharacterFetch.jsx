import { useState, useEffect } from "react";

const useCharacterFetch = (url, page) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setData([]);

        const response = await fetch(`${url}?page=${page}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const resData = await response.json();

        resData.results.length < 10 ?
            setTotal(page) : setTotal(Math.ceil(resData.count / resData.results.length));
        
          setData(resData.results); 

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page]);

  return { data, loading, error, total };
};

export default useCharacterFetch;
