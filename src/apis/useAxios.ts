import { Axios } from "./index";
import { useEffect, useRef, useState } from "react";

const useAxios = <InitialState>(
  path: string,
  rest: {
    params?: unknown;
    body?: unknown;
    skip?: boolean;
    initialState?: InitialState;
  } = {}
) => {
  type RestType = {
    params?: unknown;
    body?: unknown;
    onCompleted?: (arg: InitialState) => void;
  };

  const { params, skip, body } = rest;
  const check = useRef(false);

  const [response, setResponse] = useState(rest?.initialState);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const axiosFetch = async (
    apiParams: unknown,
    apiBody: unknown,
    onCompleted?: (arg: InitialState) => void
  ) => {
    try {
      check.current = true;
      setLoading(true);

      if (apiBody) {
        const res = await Axios.post(path, apiBody);
        setResponse(res?.data || []);
        if (onCompleted) {
          onCompleted(res?.data);
        }
      } else {
        const res = await Axios.get(path, {
          params: apiParams,
        });
        setResponse(res?.data || []);
        if (onCompleted) {
          onCompleted(res?.data);
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      check.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (path && !check.current && !skip) {
      axiosFetch(params, body);
    }
  }, [path]);

  const refetch = ({ params, body, onCompleted }: RestType) => {
    axiosFetch(params, body, onCompleted);
  };

  return { response, loading, refetch, error };
};

// refetch({ params: { id: 123 } }); //params
// refetch({body:{ id: 123 }}); //body
// const { response, loading } = useAxios<SongList[]>("/songs", [], {});

export default useAxios;
