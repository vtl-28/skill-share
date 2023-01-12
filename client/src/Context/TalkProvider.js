import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const TalkContext = createContext(null);

const TalkProvider = ({ children }) => {
  const [userTalks, setUserTalks] = useState([]);
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  // const { data, error, status } = useQuery({ queryKey: ['userInfo'],
  // queryFn: getUser})

  // console.log(data)
  // function getUser(){
  //   return JSON.parse(localStorage.getItem("userInfo"));
  // }


  return (
    <TalkContext.Provider
      value={{
        userTalks,
        setUserTalks,
        user,
        notification,
        setNotification
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