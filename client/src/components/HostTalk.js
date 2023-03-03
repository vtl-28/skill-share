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
import { Heading, chakra, Flex, Text, FormControl, FormLabel, Textarea, Input, CardBody, Card, Button, Divider } from '@chakra-ui/react';

const HostTalk = () => {
    const talkDetails = `   What's the purpose of the talk? 
    Who should join? 
    What will you do at your talks?`
    const { user, socket } = useContext(TalkContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [pic, setPic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [ showHostTalks, setShowHostTalks ] = useState(true)
    const [disabled, setDisabled] = useState(false);

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const { _id } = user;

    let { data: userTalks, error, status, isError } = useQuery({ queryKey: ['userChats'], queryFn: () => fetchHostTalks(_id), 
            enabled: true,
            refetchOnMount: true,
            refetchInterval: 2000,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: true
        })
    if (status === 'loading') {
        return <div>loading user talks...</div> // loading state
      }
    
      if (status === 'error') {
        return <div>{error.message}</div> // error state
      }
    
     const caveat = (<div>You have not hosted any talks. Talks you have hosted will appear here</div>)
      

    const handleNotification = (type, resp) => {
        socket?.emit("create talk", {
            sender: user,
            type,
            resp
          });
    }
    const submitForm = async(e) => {
        e.preventDefault();

        setIsLoading(true);

        const data = {
            title, body, pic,location, city, date
        }

     
        let response = await addHostTalk(data)
        const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 

        if(hostDetailsValidation === 'no'){
            setIsLoading(false);
            setErrorMessage(response)
            toggleErrorToast() 
        }else{    
            setIsLoading(false);
            setSuccessMessage("Successfully created talk");
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
             setPic(url);
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
        <NavBar />
                <div className='container mx-auto'>
        <Heading className='flex justify-center mt-4'>Host Talk</Heading>
        <div className='grid grid-cols-12 grid-rows-6 py-8'>
            
            <div className='col-span-5 col-start-1'>

               {userTalks.length > 0 ? displayHostTalks(userTalks, deleteTalk) : caveat }
            </div>
            {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
            {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
            <div className='col-span-5 col-start-8 gap-6'>
            
                <Card>
                    <CardBody>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Title</FormLabel>
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder="Enter the title of the talk" />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea  h='100px' placeholder={talkDetails} value={body} onChange={(e) => setBody(e.target.value)} name="body" />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Venue</FormLabel>
                            <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} name="location" placeholder="Enter the venue of the talk"/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Date</FormLabel>
                            <Input type="text" value={date} onChange={(e) => setDate(e.target.value)} name="date" placeholder="Enter the date of the talk"/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>City</FormLabel>
                            <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city" placeholder="City of venue" />
                        </FormControl>
                        <FormControl className="mb-6">
                            <FormLabel className='font-link'>Upload image</FormLabel>
                            <Input type="file" value={pic} name="pic" accept="image/*" />
                        </FormControl>
                        
                        <FormControl>
                            <Button bgColor='#F64060' className="w-full text-white">Create talk</Button>
                        </FormControl>
                    </CardBody>
                </Card>
            </div>

        </div>
    </div>
        </div>
  )
}

export default HostTalk;

{/* <Form onSubmit={submitForm}>
<Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder="Enter the title of the talk" />
</Form.Group>
<textarea placeholder={talkDetails} value={body} onChange={(e) => setBody(e.target.value)} name="body" rows={8} className="w-full">

</textarea>

<Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} name="location" placeholder="Enter the venue of the talk" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="text" value={date} onChange={(e) => setDate(e.target.value)} name="date" placeholder="Enter the date and time of the talk" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city" placeholder="City of venue" />
</Form.Group>

<Form.Group className="mb-3" value={pic} name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} controlId="formBasicEmail">
    <Form.Control type="file"/>
</Form.Group>

<Button type="submit" className="w-full text-black">
                Submit {isLoading && <LoadingSpinner />}
</Button>
</Form> */}