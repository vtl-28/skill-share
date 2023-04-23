import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';


export const TalkContext = createContext();

const TalkProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [hostTalks, setHostTalks] = useState([]);
  const [allTalks, setAllTalks] = useState([]);
  const [user, setUser] = useState({});
  const [viewport, setViewport] = useState({});
  const navigate = useNavigate();
  const [ address, setAddress ] = useState('')
  const [ addressCoordinates, setAddressCoordinates ] = useState({})
  const [ picUrl, setPicUrl ] = useState('')


  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const windowDimensions = JSON.parse(localStorage.getItem("windowDimensions"));
    setUser(userInfo);
    setViewport(windowDimensions)

    if (!userInfo) navigate("/");
 
  }, [ navigate]);
  

  return (
    <TalkContext.Provider
      value={{
        hostTalks,
        setHostTalks,
        user,
        viewport,

        allTalks,
        setAllTalks,
        socket, 
        setSocket,
        address,
        setAddress,
        addressCoordinates,
        setAddressCoordinates,
        picUrl, setPicUrl
      }}
    >
      {children}
    </TalkContext.Provider>
  );
};

export default TalkProvider;