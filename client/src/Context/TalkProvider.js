import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { io } from 'socket.io-client';
import { useJsApiLoader } from '@react-google-maps/api';
import { useLoadPlacesScript } from '../hooks/useFetchHostedEvents'

export const TalkContext = createContext();

const TalkProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [hostTalks, setHostTalks] = useState([]);
  const [allTalks, setAllTalks] = useState([]);
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [viewport, setViewport] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [ address, setAddress ] = useState('')
  const [ addressCoordinates, setAddressCoordinates ] = useState({})
  const [ picUrl, setPicUrl ] = useState('')
  const [ talkViewCount, setTalkViewCount ] = useState(0)

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const windowDimensions = JSON.parse(localStorage.getItem("windowDimensions"));
    setUser(userInfo);
    setViewport(windowDimensions)

    if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ navigate]);
  //load()

  
  // function load(){
  //   if(isLoaded === true){
  //     console.log("true")
  //     setPlacesScript(true)
  //   }else{
  //     console.log("false")
  //   }
  //   console.log(placesScript)
  // }
  

  return (
    <TalkContext.Provider
      value={{
        hostTalks,
        setHostTalks,
        user,
        viewport,
        notification,
        allTalks,
        setAllTalks,
        setNotification,
        socket, 
        setSocket,
        address,
        setAddress,
        addressCoordinates,
        setAddressCoordinates,
        talkViewCount, setTalkViewCount,
        picUrl, setPicUrl
      }}
    >
      {children}
    </TalkContext.Provider>
  );
};

// export const TalkState = () => {
//   return useContext(TalkContext);
// };

export default TalkProvider;