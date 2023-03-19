import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
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
import LoadingSpinner from './LoadingSpinner';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import Footer from './Footer';
import { TalkContext } from '../Context/TalkProvider';

const HostProfile = () => {
    let { id } = useParams();
    const { user, socket, viewport } = useContext(TalkContext);
    const [ userPic, setUserPic ] = useState('')
    const [ userCity, setUserCity ] = useState('')
    const [ userAbout, setUserAbout ] = useState('')
    const [ userEmail, setUserEmail ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ userProfession, setUserProfession ] = useState('')
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [picIsLoading, setPicIsLoading] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [ coordinates, setCoordinates ] = useState({})

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

    console.log(viewport)
  

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
      });
    
    
      const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
      const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <a href="#">
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </a>
          </li>
        );
      })
    ;
  
    
      const handleSelect =
        ({ description }) => 
        () => {
          // When user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
          let locationCoordinates ={};
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            locationCoordinates = { lat: lat, lng: lng}
            setCoordinates(coordinates => ({...coordinates, locationCoordinates}))
            console.log("📍 Coordinates: ", { lat, lng });
            
          });
        };

    const { data: host, error, isLoading, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => fetchUser(id)})
    if (isLoading) {
        return <div>loading profile</div> // loading state
      }
    
      if (isError) {
        return <div>{error.message}</div> // error state
      }
      console.log(id);
    console.log(data);
    const { name, email, pic, city, profession, about } = host;

    const updateUser = async(e) => {
        e.preventDefault();
        setDataIsLoading(true);
        const userDataToUpdate = {
            userName,
            userEmail,
            value,
            userAbout,
            userPic,
            userProfession,
            coordinates
        }
        let response = await updateHost(id,userDataToUpdate);
        const hostDetailsValidation = typeof response === 'object' ? 'yes': 'no';

        if(hostDetailsValidation === 'no'){
            setDataIsLoading(false);
            setErrorMessage(response);
            toggleErrorToast()
        }else{
            setDataIsLoading(false);
            setUserAbout('')
            setUserPic('')
            setUserName('')
            setUserEmail('')
            setUserProfession('')
            setSuccessMessage('Host details successfully updated')
            toggleSuccessToast();
        }
        console.log(response)
 
    }

    const postDetails = async(pics) => {
        setPicIsLoading(true);
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
         console.log(url)
         let imageUploadValidation = url.match(/cloudinary/i)
         if(imageUploadValidation){
             setUserPic(url);
             setPicIsLoading(false);
         }else{
            setErrorMessage("Problem uploading image")
            setPicIsLoading(false);
         }
        }else{
            <UploadImageToast />
            setPicIsLoading(false);
          return;
        }
      };

  return (
    <div className='remove-overflow'>
        <Navbar />
        <div className='container w-full h-full mx-auto'>
            <div className='grid grid-cols-12'>
                <div className='flex flex-col h-full xs:col-start-2 xs:col-span-10 lg:col-start-4 lg:col-span-6  py-4'>
                <Flex direction='column' className='mb-10'>
                    <Heading className='text-2xl'>Edit profile</Heading>
                    <h4 className='mt-3 textbase'>This information will appear on your public profile</h4>
                </Flex>
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
               
        
                   <Card>
                        <CardBody>
                        {picIsLoading && <LoadingSpinner />}
                        <Flex justifyContent='space-between'  className='mb-3'>
                            <Image className='rounded-full w-1/2' alt='user' src={pic}/>
                            <Flex className='flex pt-4 align-items-center'>
                                <label className="label">
                                    <Input type="file" name='pic' accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
                                    <span className='text-white font-semibold'>Upload New</span>
                                </label>
                            </Flex>
                        </Flex>
                    <FormControl className="mb-3">
                            <FormLabel className='font-link'>Your name</FormLabel>
                            <Input type='text' placeholder={name} name='userName' onChange={(e) => setUserName(e.target.value)}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Email address</FormLabel>
                            <Input type='email' placeholder={email} name='userEmail' onChange={(e) => setUserEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea placeholder={about} name='userAbout' onChange={(e) => setUserAbout(e.target.value)}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Physical Address</FormLabel>
                            <Input type='text' value={value}
                                  onChange={handleInput}
                                  disabled={!ready} name="value" placeholder={city}/>
                                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                                {status === "OK" && <ul>{renderSuggestions()}</ul>}
                        </FormControl>
                        <FormControl className="mb-6">
                            <FormLabel className='font-link'>Profession</FormLabel>
                            <Input type='text' placeholder={profession} name='userProfession' onChange={(e) => setUserProfession(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                        {dataIsLoading && <LoadingSpinner />}
                            <Button bgColor='#F64060' className="w-full text-white" onClick={updateUser}>Save changes</Button>
                        </FormControl>
                        </CardBody>
                   </Card>
                

                </div>
       
                
            </div>
        </div>
        <div className="footer-two-style">
          <Footer />
        </div>
    </div>
  )
}

export default HostProfile