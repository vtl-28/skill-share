import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

export const TalkContext = createContext(null);

const TalkProvider = ({ children }) => {
  const [talk, setTalk] = useState({});
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <TalkContext.Provider
      value={{
        talk,
        setTalk,
        user,
        setUser,
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