import { useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { uploadImage } from "../Utils/image";
import { TalkContext } from "../Context/TalkProvider";

const usePostImage = () => {
    const [picIsLoading, setPicIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [pic, setPic] = useState('');
    const {  picUrl, setPicUrl } = useContext(TalkContext);

    async function postDetails(pics){
        setPicIsLoading(true);
        if (pics === undefined || pics === '') {
          setErrorMessage("Please select a file")
          setPicIsLoading(false);
          toggleErrorToast()
        }
      
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
         
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "skill-share");
          data.append("cloud_name", "dd1jqwp94");
          
          console.log(data)
          let {url} = await uploadImage(data);
          console.log(url)
      let imageUploadValidation = url.match(/cloudinary/i)
      if(imageUploadValidation){
            setPicUrl(url);
         setPicIsLoading(false);
      }else{
        setErrorMessage("Problem uploading image")
        setPicIsLoading(false);
        toggleErrorToast()
      }
        }else{
            setErrorMessage('Please select an image file')
            setPicIsLoading(false);
            toggleErrorToast()
        }
      
    }

    return { postDetails }
}

export default usePostImage;