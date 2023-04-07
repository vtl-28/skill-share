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
import { CalendarIcon } from '@chakra-ui/icons';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import Footer from './Footer';
import Spinner from 'react-bootstrap/Spinner';
import PlacesAutoComplete from '../components/PlacesAutoComplete'
import { useJsApiLoader } from '@react-google-maps/api';
import PostImage from '../components/PostImage'
import { useFetch } from '../hooks/useFetchHostedEvents';
import DatePicker from 'react-datepicker';

const HostTalk = () => {
    const talkDetails = `   What's the purpose of the talk? 
    Who should join? 
    What will you do at your talks?`
    const { user, socket, viewport, address, addressCoordinates, picUrl } = useContext(TalkContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    //const [date, setDate] = useState('');
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
    const [value, onChange] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());;

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const { _id } = user;

  const { data: userTalks, status, error } = useFetch(_id)
  if (status === 'loading') {
    return <Spinner 
    animation="border"
    size="lg"
    role="status"
    aria-hidden="true"
    variant="secondary"
    className="spin" />
  }
  
  if (status === 'error') {
  return <div>{error.message}</div> // error state
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
        let date = format(new Date(date), "d'-'MMM'-'y',' h':'mm a", {
            weekStartsOn: 1
        })
        const data = {
            title, body, picUrl,location, address, date, addressCoordinates
        }
     
        let response = await addHostTalk(data)
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
            setStartDate('')
            setLocation('')
            setCity('')
            toggleSuccessToast();
        }
       
    }
    function deleteTalk(e){
        e.preventDefault()
        setDataIsLoading(true)
        axios.delete(`/api/talks/delete/${e.target.name}`);
        setDataIsLoading(false)
        setSuccessMessage('Talk event successfully deleted')
        toggleSuccessToast()
        userTalks.filter((talks) => talks._id !== e.target.name);
        
    }
   
    console.log(startDate)
  return (
        <div>
        <NavBar />
                <div className='container mx-auto'>
        <Heading className='flex justify-center mt-4'>Host Talk</Heading>
        <div className='grid grid-cols-12 py-8'>
            
            <div className='xs:col-start-1 xs:col-span-12 lg:col-start-1 lg:col-span-5 xs:mb-16'>

               {userTalks.length > 0 ? displayHostTalks(userTalks, deleteTalk) : caveat }
            </div>
            {showSuccessToast && <SuccessToast placement={'middle-center'} message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
            {showErrorToast && <ErrorToast placement={'middle-center'} message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
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
                            {/* <Flex justifyContent='space-between'>
                                <Input type="text" w='90%' value={date} onChange={(e) => setDate(e.target.value)} name="date" placeholder='dd-mm-yyyy'/>
                                <a w='5%' className='self-end' onClick={() => setShowDatePicker(true)} href='#'><CalendarIcon /></a>
                            </Flex> */}
                            <DatePicker  showIcon isClearable showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="dd-MMMM-yyyy h:mm aa" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </FormControl>
                        <PlacesAutoComplete />
                        <PostImage />
                        <FormControl>
                        <Button bgColor='#F64060' className="w-full" onClick={submitForm}>
                        { dataIsLoading && ( <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="secondary"
                      />)}
                        <span className={dataIsLoading ? "visually-hidden text-white" : 'text-white'}>
                          Host Talk
                        </span>
                       </Button>
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