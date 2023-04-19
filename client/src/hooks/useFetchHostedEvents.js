import { useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { fetchHostTalks, fetchTalks } from "../Utils/talk";
import { TalkContext } from "../Context/TalkProvider";


export const useFetch = (id) => {
  let { data, error, status, isError } = useQuery({ queryKey: ['hostTalks'], queryFn: () => fetchHostTalks(id), 
  enabled: true,
  refetchOnMount: true,
  refetchInterval: 2000,
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true
})

  return { data, error, status };
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


export const useFetchTalks = () => {
  const { data, error, status, isFetched } = useQuery({ queryKey: ['talks'], queryFn: fetchTalks,
  refetchOnMount: true,
  refetchInterval: 2000,
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true})

return { data, error, status };
}

export const useLoadPlacesScript = () => {
  const { isLoaded } = useJsApiLoader({ library: "places" });

  return { isLoaded }
}

