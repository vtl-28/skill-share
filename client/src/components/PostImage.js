import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { TalkContext } from '../Context/TalkProvider';
import { uploadImage } from './miscellaneous/Utils';

const PostImage = () => {
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

    console.log(picUrl)

  return (
    <div>
         <FormControl className="mb-3">
                             <FormLabel className='font-link'>Profile pic</FormLabel>
                             <Input type="file" name="pic" accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
                             {picIsLoading && <Spinner 
                                as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              variant="secondary" className='z-auto'
                             />}
                         </FormControl>
      
    </div>
  )
}

export default PostImage
