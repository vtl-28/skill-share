import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchHostTalks } from "../components/miscellaneous/Utils";

export const useFetch = (id) => {
  let { data, error, status, isError } = useQuery({ queryKey: ['hostTalks'], queryFn: () => fetchHostTalks(id), 
  enabled: true,
  refetchOnMount: true,
  refetchInterval: 2000,
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true
})
if (status === 'loading') {
return <div>loading user talks...</div> // loading state
}

if (status === 'error') {
return <div>{error.message}</div> // error state
}

  return { data };
};

export const useFetchWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  function getWindowDimensions() {
    const width = window.innerWidth
    const height = window.innerHeight
    return {
        width,
        height
    };
  }

  useEffect(() => {
    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, [windowDimensions]);

return windowDimensions;

}