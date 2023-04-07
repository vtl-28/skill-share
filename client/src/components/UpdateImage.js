import { Input } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { TalkContext } from '../Context/TalkProvider';
import usePostImage from '../hooks/usePostImage'

const UpdateImage = () => {
    const {  picUrl, setPicUrl } = useContext(TalkContext);
    const { postDetails } = usePostImage()

  return (
    <div>
         <label className="label">
                                    <Input type="file" name='pic' accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
                                    <span className='text-white font-semibold xs:text-sm'>Upload New</span>
                                </label>
      
    </div>
  )
}

export default UpdateImage
