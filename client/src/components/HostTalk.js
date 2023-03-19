import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import UserTalksList from './UserTalksList';
import { TalkContext } from '../Context/TalkProvider';
import { useQuery } from '@tanstack/react-query';
import NavBar from './Navbar';
import {fetchHostTalks, addHostTalk, uploadImage} from './miscellaneous/Utils'
import {displayHostTalks} from './miscellaneous/DisplayItems'
import { SuccessToast, ErrorToast, UploadImageToast } from '../components/miscellaneous/Toasts'
import { Heading, chakra, Flex, Text, FormControl, FormLabel, Textarea, Input, CardBody, Card, Button, Divider, CardHeader } from '@chakra-ui/react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import Footer from './Footer';

const HostTalk = () => {
    const talkDetails = `   What's the purpose of the talk? 
    Who should join? 
    What will you do at your talks?`
    const { user, socket, viewport } = useContext(TalkContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [pic, setPic] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [ showHostTalks, setShowHostTalks ] = useState(true)
    const [disabled, setDisabled] = useState(false);
    const [picIsLoading, setPicIsLoading] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [ coordinates, setCoordinates ] = useState({})

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const { _id } = user;

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
      });
  
    
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
    

    let { data: userTalks, error, isLoading, isError } = useQuery({ queryKey: ['hostTalks'], queryFn: () => fetchHostTalks(_id), 
            enabled: true,
            refetchOnMount: true,
            refetchInterval: 2000,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: true
        })
    if (isLoading) {
        return <div>loading user talks...</div> // loading state
      }
    
     const caveat = (<div>You have not hosted any talks. Talks you have hosted will appear here</div>)

      

    const handleNotification = (type, response) => {
        socket?.emit("create talk", {
            sender: user,
            type,
            response
          });
    }
    const submitForm = async(e) => {
        e.preventDefault();

        setDataIsLoading(true);

        const data = {
            title, body, pic,location, value, date, coordinates
        }

     
        let response = await addHostTalk(data)
        console.log(response)
        const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 

        if(hostDetailsValidation === 'no'){
            setDataIsLoading(false);
            setErrorMessage(response)
            toggleErrorToast() 
        }else{    
            setDataIsLoading(false);
            setSuccessMessage("Successfully created talk event");
            handleNotification(4, response)
            setTitle('')
            setBody('')
            setPic('')
            setDate('')
            setLocation('')
            setCity('')
            toggleSuccessToast();
        }
       
    }
    function deleteTalk(e){
        axios.delete(`/api/talks/delete/${e.target.name}`);
        userTalks.filter((talks) => talks._id !== e.target.name);
    }
    
    const postDetails = async(pics) => {
        setDataIsLoading(true);
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
             setPic(url);
             setDataIsLoading(false);
         }else{
            setErrorMessage("Problem uploading image")
            setDataIsLoading(false);
         }
    
        }else{
           <UploadImageToast />
           setDataIsLoading(false);
          return;
        }
      };
  return (
        <div>
        <NavBar />
                <div className='container mx-auto'>
        <Heading className='flex justify-center mt-4'>Host Talk</Heading>
        <div className='grid grid-cols-12 py-8'>
            
            <div className='xs:col-start-1 xs:col-span-12 lg:col-start-1 lg:col-span-5 xs:mb-16'>

               {userTalks.length > 0 ? displayHostTalks(userTalks, deleteTalk) : caveat }
            </div>
            {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
            {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
            <div className='xs:col-start-1 xs:col-span-12 lg:col-start-7 lg:col-span-6 xl:col-start-8 xl:col-span-5'>
                <div className='flex justify-center mb-4'>
                  <h1 className='font-semibold  xs:text-xl md:text-2xl lg:text-xl'>Fill in the below form to host your own talk event</h1>
                </div>
                <Card>
                    <CardBody>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Title</FormLabel>
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title"/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea  h='100px' placeholder={talkDetails} value={body} onChange={(e) => setBody(e.target.value)} name="body" />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Venue</FormLabel>
                            <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} name="location" placeholder="Enter the venue of the talk event"/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Date</FormLabel>
                            <Input type="text" value={date} onChange={(e) => setDate(e.target.value)} name="date" placeholder='dd-mm-yyyy'/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Physical Address</FormLabel>
                            <Input type='text' value={value}
                                  onChange={handleInput}
                                  disabled={!ready} name="value"/>
                                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                                {status === "OK" && <ul>{renderSuggestions()}</ul>}
                        </FormControl>
                        <FormControl className="mb-6">
                            <FormLabel className='font-link'>Upload image</FormLabel>
                            <Input type="file"  name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} /> {picIsLoading && <LoadingSpinner />}
                        </FormControl>
                        {dataIsLoading && <LoadingSpinner />}
                        <FormControl>
                            <Button bgColor='#F64060' className="w-full text-white" onClick={submitForm}>Create talk</Button>
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

export default HostTalk;