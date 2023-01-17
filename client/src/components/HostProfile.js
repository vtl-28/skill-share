import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Nav, Toast } from 'react-bootstrap';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

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

    const { data, error, status, isError } = useQuery({ queryKey: ['userProfile'], queryFn: fetchUser})
    if (status === 'loading') {
        return <div>loading profile</div> // loading state
      }
    
      if (status === 'error') {
        return <div>{error.message}</div> // error state
      }
      console.log(id);
    console.log(data);
    const { name, email, pic, city, profession, about } = data;
   


    function fetchUser(){
      return axios.get(`/api/user/${id}`, {
        headers: {
            'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
        }
    }).then(response => {
        //console.log(response.data)
         return response.data;      
      }).catch(error => {
          return error.response.data;
      })

    }

    const updateUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userDataToUpdate = {
            userName,
            userEmail,
            userCity,
            userAbout,
            userPic
        }

        const config = {
            headers: {
                'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
            }
        }

        axios.put(`/api/user/edit/${id}`, userDataToUpdate, config).then(response => {
            console.log(response.data)
            console.log(typeof response.data)
            setIsLoading(false);
        }).catch(error => {
            console.log(error.response.data)
        })
    }

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
            setUserPic(url);
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

  return (
    <div>
        <Navbar />
        <div className='container w-full h-full mx-auto'>
            <div className='grid grid-cols-6 grid-rows-6 '>
                <div className='flex flex-col h-full col-span-2 col-start-3 py-4'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl'>Edit profile</h1>
                    <h4 className='mt-3'>This information will appear on your public profile</h4>
                </div>
                <Form className='mt-4'>
                    <div className='flex mb-3 justify-content-between'>
                        <img src={pic} value={userPic} className='rounded-full' alt='user'/>
                        <div className='flex pt-4'>
                            <label className="label">
                                <input type="file" name='pic' accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
                                <span>Select a file</span>
                            </label>
                        </div>
                      
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name='name'  placeholder={name} value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" name='email' placeholder={email} value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name='city' placeholder={city} value={userCity} onChange={(e) => setUserCity(e.target.value)}/>
                    </Form.Group>
                    <textarea name='about' rows={5} placeholder='Write a little about yourself here' value={userAbout} className='w-full mb-3' onChange={(e) => setUserAbout(e.target.value)}>

                    </textarea>
                    <Button type="submit" className="w-full text-black" onClick={updateUser}>
                        Save changes
                    </Button>
                </Form>

                </div>
       
                
            </div>
        </div>
    </div>
  )
}

export default HostProfile
