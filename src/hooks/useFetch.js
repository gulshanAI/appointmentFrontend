"use client";
import { useState, useEffect, useCallback } from "react";
import { axiosFireApi } from "../lib/api";

const useFetch = (url, filter, callBack = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const [meta, setMeta] = useState({
  //     pagination: { total: 0, page: 1, pageSize: 25 },
  //   });

  const fireApi = async () => {
    let params = { ...filter };
    setLoading(true);
    const response = await axiosFireApi(url, "get", params);
    if (response.success) {
      let resData = response.data;
      if (callBack) resData = callBack(response.data, setData);
      else {
        setData(resData);
        // if (response.data.meta) setMeta(response.data.meta);
        // else
        //   setMeta({
        //     pagination: { total: data.length, page: 1, pageSize: data.length },
        //   });
      }
      setLoading(false);
    } else {
      // setError("Error fetching data");
      // setLoading(false);
    }
  };
  const getData = useCallback(fireApi, [url, filter]);
  useEffect(() => {
    getData();
  }, [filter, getData]);

  return { data, loading, error };
};

export default useFetch;
