import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { SuccessToast, ErrorToast, UploadImageToast } from '../components/miscellaneous/Toasts'
import { uploadImage, fetchUser, updateHost } from '../components/miscellaneous/Utils';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Card, CardBody, 
    Text, Input, Button, 
    chakra, CardHeader, Heading, Flex, Link, Textarea, Form, Image
  } from '@chakra-ui/react'

const HostProfile = () => {
    let { id } = useParams();
    const [ userPic, setUserPic ] = useState('')
    const [ userCity, setUserCity ] = useState('')
    const [ userAbout, setUserAbout ] = useState('')
    const [ userEmail, setUserEmail ] = useState('')
    const [ userName, setUserName ] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

    const { data, error, status, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => fetchUser(id)})
    if (status === 'loading') {
        return <div>loading profile</div> // loading state
      }
    
      if (status === 'error') {
        return <div>{error.message}</div> // error state
      }
      console.log(id);
    console.log(data);
    const { name, email, pic, city, profession, about } = data;

    const updateUser = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const userDataToUpdate = {
            userName,
            userEmail,
            userCity,
            userAbout,
            userPic
        }
        let response = await updateHost(id,userDataToUpdate);
        const hostDetailsValidation = typeof response === 'object' ? 'yes': 'no';

        if(hostDetailsValidation === 'no'){
            setIsLoading(false);
            setErrorMessage(response);
            toggleErrorToast()
        }else{
            setIsLoading(false);
            setSuccessMessage('Host details successfully updated')
            toggleSuccessToast();
        }
        console.log(response)
 
    }

    const postDetails = async(pics) => {
        setIsLoading(true);
        if (pics === undefined) {
           <UploadImageToast />
          return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "skill-share");
          data.append("cloud_name", "dd1jqwp94");

         let {url} = await uploadImage(data);
         let imageUploadValidation = url.match(/cloudinary/i)
         if(imageUploadValidation){
             setUserPic(url);
             setIsLoading(false);
         }else{
            setErrorMessage("Problem uploading image")
            setIsLoading(false);
         }
        }else{
            <UploadImageToast />
          setIsLoading(false);
          return;
        }
      };

  return (
    <div>
        <Navbar />
        <div className='container w-full h-full mx-auto'>
            <div className='grid grid-cols-6 grid-rows-6 '>
                <div className='flex flex-col h-full col-span-2 col-start-3 py-4'>
                <Flex direction='column' className='mb-10'>
                    <Heading className='text-2xl'>Edit profile</Heading>
                    <h4 className='mt-3 textbase'>This information will appear on your public profile</h4>
                </Flex>
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
               
        
                   <Card>
                        <CardBody>
                        <Flex justifyContent='space-between'  className='mb-3'>
                            <Image className='rounded-full w-1/2' alt='user' src={pic}/>
                            <Flex className='flex pt-4'>
                                <label className="label">
                                    <Input type="file" name='pic' value={userPic}  accept="image/*"/>
                                    <span className='text-white font-semibold'>Select a file</span>
                                </label>
                            </Flex>
                        </Flex>
                    <FormControl className="mb-3">
                            <FormLabel className='font-link'>Your name</FormLabel>
                            <Input type='text' placeholder={name}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Email address</FormLabel>
                            <Input type='email' placeholder={email} />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea placeholder={about} />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>City</FormLabel>
                            <Input type='text' placeholder={city}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Profession</FormLabel>
                            <Input type='text' placeholder={profession}/>
                        </FormControl>
                        <FormControl className="mb-6">
                            <FormLabel className='font-link'>Profile pic</FormLabel>
                            <Input type='file' />
                        </FormControl>
                        <FormControl>
                            <Button bgColor='#F64060' className="w-full text-white">Save changes</Button>
                        </FormControl>
                        </CardBody>
                   </Card>
                

                </div>
       
                
            </div>
        </div>
    </div>
  )
}

export default HostProfile
{/* <div className='container w-full h-full mx-auto'>
<div className='grid grid-cols-6 grid-rows-6 '>
    <div className='flex flex-col h-full col-span-2 col-start-3 py-4'>
    <div className='flex flex-col'>
        <h1 className='text-2xl'>Edit profile</h1>
        <h4 className='mt-3'>This information will appear on your public profile</h4>
    </div>
    {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
    {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
   
    <Form className='mt-4'>
        <div className='flex mb-3 justify-content-between'>
            <img value={userPic} className='rounded-full' alt='user'/>
            <div className='flex pt-4'>
                <label className="label">
                    <input type="file" name='pic' accept="image/*"/>
                    <span>Select a file</span>
                </label>
            </div>
          
        </div>
        <Form.Group className="mb-3">
            <Form.Control type="text" name='name'   value={userName} onChange={(e) => setUserName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control type="email" name='email'  value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Control type="text" name='city'  value={userCity} onChange={(e) => setUserCity(e.target.value)}/>
        </Form.Group>
        <textarea name='about' rows={5} placeholder='Write a little about yourself here' value={userAbout} className='w-full mb-3' onChange={(e) => setUserAbout(e.target.value)}>

        </textarea>
        <Button type="submit" className="w-full text-black">
            Save changes
        </Button>
    </Form>

    </div>

    
</div>
</div> */}