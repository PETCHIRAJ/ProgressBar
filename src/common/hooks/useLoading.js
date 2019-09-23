import { useState } from 'react';

const useLoading = (loadingOnStart = false) => {
  const [loading, setLoading] = useState(loadingOnStart);

  const startLoading = () => {
    if (!loading) setLoading(true);
  };

  const reset = () => {
    setLoading(loadingOnStart);
  };

  const stopLoading = () => {
    setLoading(false);
  };
  return {
    loading, startLoading, stopLoading, reset,
  };
};

export default useLoading;
