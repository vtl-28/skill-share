import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { TalkContext } from '../Context/TalkProvider';
import { uploadImage } from './miscellaneous/Utils';
import usePostImage from '../hooks/usePostImage'

const PostImage = () => {
     const [picIsLoading, setPicIsLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState([]);
    // const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    // const [showErrorToast, setShowErrorToast] = useState(false);
    // const [pic, setPic] = useState('');
    const {  picUrl, setPicUrl } = useContext(TalkContext);
    const { postDetails } = usePostImage()
   

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
