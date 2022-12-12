import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, ToastContainer, ToastHeader } from "react-bootstrap";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast';
import LoadingSpinner from './LoadingSpinner'

const SignUp = () => {
    const navigate = useNavigate();
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [city, setCity] = useState('');
    const [profession, setProfession] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
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
            // const config = {
            //     headers: {
            //       "Content-type": "application/json",
            //     },
            // };
            const data = {
                name, email, pic,about, city, profession, password, confirmpassword
            }

           
            axios.post('/user/signup', data)
            .then(response => {
                    setIsLoading(false);
                    setSuccessMessage("Sign up successful")
                    toggleSuccessToast();
                    localStorage.setItem("userInfo", JSON.stringify(response.data));
            
            }).catch(error => {
                setIsLoading(false);
                setErrorMessage(error.response.data)
                toggleErrorToast();
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


  return (
    <div className="container w-full px-12 mx-auto border-2 border-red-200">
            <div className="grid grid-cols-6 grid-rows-6">
                <div className="col-span-2 col-start-3 row-span-2 row-start-2">
                {showSuccessToast && successToast(successMessage)}
                {showErrorToast && errorToast(errorMessage)}
                
                <Form className='border rounded-md'>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" name="name" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" name="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                               
                                <textarea name="about" value={about} placeholder="tell us about yourself" rows={5} className="w-full" onChange={(e) => setAbout(e.target.value)}>

                                </textarea>

                                <Form.Group className="mb-3">
                                    <Form.Control type="text" name="city" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" name="profession" value={profession} placeholder="Profession" onChange={(e) => setProfession(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="file" name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" name="confirmpassword" value={confirmpassword} placeholder="Confirm password" onChange={(e) => setConfirmpassword(e.target.value)}/>
                                </Form.Group>
                                
                                <div className='flex justify-between'>
                                    <Button type="submit" className="w-1/3 text-black" onClick={submitForm}>
                                        Sign Up  {isLoading && <LoadingSpinner />}
                                    </Button>
                                    <Button type="button" className="w-1/3 text-black">
                                        <Link to="/">Back</Link>
                                    </Button>
                                </div>
                                
                </Form>
            </div>
        </div>
    </div>

  )
}

export default SignUp;
