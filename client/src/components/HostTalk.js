import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Form, Toast, ToastContainer, ToastHeader } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import UserTalksList from './UserTalksList';
import { TalkContext } from '../Context/TalkProvider';

const HostTalk = () => {
    const talkDetails = `   What's the purpose of the talk? 
    Who should join? 
    What will you do at your talks?`
    const { userTalks, setUserTalks } = useContext(TalkContext);
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

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

    const successToast = (message) => {
        return <ToastContainer position="top-end">
            <Toast bg='success' show={showSuccessToast} onClose={toggleSuccessToast} delay={3000} autohide>
            <ToastHeader>
                <small>Success!</small>
            </ToastHeader>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    }
    const errorToast = (message) => {
        return <ToastContainer position="top-end" >
            <Toast bg='danger' show={showErrorToast} onClose={toggleErrorToast} delay={3000} autohide>
            <ToastHeader>
                <small>Error occurred!</small>
            </ToastHeader>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    }

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            title, body, pic,location, city, date
        }

        axios.post('/', data, {
            headers: {
                'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
            }
        })
        .then(response => {
            // console.log(response.data)
                setIsLoading(false);
                setSuccessMessage("Successfully created talk event");
                setTitle('')
                setBody('')
                setPic('')
                setDate('')
                setLocation('')
                setCity('')
                setUserTalks([...userTalks, response.data]) 
                localStorage.setItem('userTalks', [...userTalks]);
                toggleSuccessToast();
        }).catch(error => {
            setIsLoading(false);
            setErrorMessage(error.response.data)
            toggleErrorToast();
        })
    }
    console.log(userTalks)
    console.log(localStorage.getItem('userTalks'))
    const postDetails = (pics) => {
        setIsLoading(true);
        if (pics === undefined) {
            <Toast delay={3000} autohide bg='danger'>
                <Toast.Header>
                    <strong className="me-auto">Error occurred</strong>
                </Toast.Header>
                <Toast.Body>Please select an image</Toast.Body>
            </Toast>
          return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "skill-share");
          data.append("cloud_name", "dd1jqwp94");
          axios.post("https://api.cloudinary.com/v1_1/dd1jqwp94/image/upload", data)
          .then(response => {
            const { url } = response.data;
            setPic(url);
            console.log(pic);
            setIsLoading(false);
          }).catch(error => {
            console.log(error.response.data);
            setIsLoading(false);
          })
        }else{
            <Toast delay={3000} autohide bg='danger'>
                <Toast.Header>
                    <strong className="me-auto">Error occurred</strong>
                </Toast.Header>
                <Toast.Body>Please select an image</Toast.Body>
            </Toast>
          setIsLoading(false);
          return;
        }
      };
      const displayTalks = () => {
        return <ul>{userTalks.map(talk => {
            return <UserTalksList talk={talk}/>
        })}</ul>
      }
      const displayHeader = (<h1>Your hosted talks will be listed here</h1>);
        
      
  return (
    <div className='container mx-auto'>
        <h1 className='flex justify-center mt-4'>Host Talk</h1>
        <div className='grid grid-rows-6 grid-cols-12 py-8'>
            
            <div className='col-start-1 col-span-5'>
                { !userTalks ? displayHeader: displayTalks()}
               
            </div>
            {showSuccessToast && successToast(successMessage)}
            {showErrorToast && errorToast(errorMessage)}
            <div className='col-start-7 col-span-5'>
                <h1 className='text-center mb-4'>Fill in the form below to host your own talk</h1>
                <Form>
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

                    <Button type="submit" className="text-black w-full" onClick={submitForm}>
                                    Submit {isLoading && <LoadingSpinner />}
                    </Button>
                </Form>
            </div>

        </div>
    </div>
  )
}

export default HostTalk;

