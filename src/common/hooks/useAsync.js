import { useState } from 'react';
import useLoading from './useLoading';

const useAsync = (loadOnStartup = false) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {
    loading, startLoading, stopLoading, reset: resetLoading,
  } = useLoading(loadOnStartup);

  const reset = () => {
    setData(null);
    setError(null);
    resetLoading();
  };

  const fetcher = (asyncFunc) => {
    startLoading();
    asyncFunc()
      .then(setData)
      .catch(setError)
      .then(stopLoading);
  };

  return {
    loading, data, error, fetcher, reset,
  };
};

export default useAsync;
