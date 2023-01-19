import React, { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import SignUp from './SignUp'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { ErrorToast } from './miscellaneous/Toasts';
import { loginHost } from './miscellaneous/Utils';

function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const navigate = useNavigate();

    const submitForm = async(e) =>{
        e.preventDefault();
        setIsLoading(true);

        const data = {
            email, password
        }
        let response = await loginHost(data);
       //const answer = response === 'Please enter all fields'|| response === 'User does not exist' || response === 'Invalid Email or Password' ? 'no' : 'yes'
       const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 
       
        if(hostDetailsValidation === 'no'){
            console.log(response)
            setIsLoading(false);
            setErrorMessage(response)
            toggleErrorToast() 
        }else{
            console.log(response)
            setIsLoading(false);
            navigate("/dashboard", {state: response});
        }
    }
    return(
        <div className="container w-full h-full px-12 mx-auto border-2 border-red-200">
            <div className="grid grid-cols-6 grid-rows-6">
                <div className="h-full col-span-2 col-start-3 row-span-2 row-start-2 border-2 border-green-300">
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                    <Form className='border rounded-md'>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                             <Form.Control type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <div className="flex justify-between">
                            <Button type="submit" className="w-1/3 text-black" onClick={submitForm}>
                                        Log in  {isLoading && <LoadingSpinner />}
                            </Button>
                            <Button type="button" className="w-1/3 text-black">
                                    <Link to="/signup">Sign up</Link>
                            </Button>
                        </div>
                    </Form>
                </div>
                
            </div>
           
        </div>
    )

}
export default Home;