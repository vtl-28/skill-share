import { useState } from "react";

export function useHostProfileState() {
  const [userAbout, setUserAbout] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfession, setUserProfession] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [picIsLoading, setPicIsLoading] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
  const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

  return {
    userAbout,
    setUserAbout,
    userEmail,
    setUserEmail,
    userName,
    setUserName,
    userProfession,
    setUserProfession,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    picIsLoading,
    setPicIsLoading,
    dataIsLoading,
    setDataIsLoading,
    toggleSuccessToast,
    toggleErrorToast,
    showErrorToast, setShowErrorToast,
    showSuccessToast, setShowSuccessToast

  };
}

export function useHostTalkState(){
    const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
  const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

  
  return {
    title, setTitle,
    body, setBody,
    location, setLocation,
    startDate, setStartDate,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    dataIsLoading,
    setDataIsLoading,
    toggleSuccessToast,
    toggleErrorToast,
    showErrorToast, setShowErrorToast,
    showSuccessToast, setShowSuccessToast

  };
}

export function useTalkState(){
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

    return {
        showSuccessToast, setShowSuccessToast,
        showErrorToast, setShowErrorToast,
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
        toggleSuccessToast,
        toggleErrorToast
    }
}