import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';


export const TalkContext = createContext();

const TalkProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [allTalks, setAllTalks] = useState([{
    _id: "64742b0ca8ef92df84dff6c2",
    title: "Learn to Code: Introduction to Web Development"
  },
  {
    _id:  "64742c84a8ef92df84dff6c8",
    title: "Public Speaking: Overcoming Fear and Nervousness"
  },
  {
    _id: "64742d11a8ef92df84dff6ce",
    title: "Photography Masterclass: Composition and Lighting"
  },
  {
    _id: "64742db5a8ef92df84dff6d4",
    title: "Yoga for Beginners: Mindfulness and Breathwork"
  },
  {
    _id: "64742e53a8ef92df84dff6da",
    title: "Cooking Workshop: Thai Cuisine"
  },
  {
    _id: "6474303fa8ef92df84dff6e0",
    title: "Graphic Design Workshop: Creating Stunning Visuals"
  },
  {
    _id: "6474399c6808d6cb83ebc852",
    title: "Getting started with full stack development"
  }]);
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