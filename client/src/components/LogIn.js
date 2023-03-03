import React, { useState } from "react";
import SignUp from './SignUp'
import {  useNavigate } from 'react-router-dom'
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { ErrorToast } from './miscellaneous/Toasts';
import { loginHost } from './miscellaneous/Utils';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Card, CardBody, 
    Text, Input, Button, 
    chakra, CardHeader, Heading, Flex, Link
  } from '@chakra-ui/react'


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
            //console.log(response)
            setIsLoading(false);
            setErrorMessage(response)
            toggleErrorToast() 
        }else{
            //console.log(response)
            setIsLoading(false);
            navigate("/dashboard", {state: response});
        }
    }
    return(
        <div className="container w-full h-full px-12 mx-auto border-2 border-red-200">
            <div className="grid grid-cols-6 grid-rows-6">
                <div className="h-full col-span-2 col-start-3 row-span-2 row-start-2">
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                <Card>
                    <CardHeader>
                       <Flex direction='column' alignItems='center'  h='120px' justifyContent='space-between'>
                            <Text fontSize='2xl' color='#F64060' className="font-link font-semibold"><Link>Talk Host</Link></Text>
                            <Heading>Log in</Heading>
                            <Text className="leading-5 text-lg">Not a member? <Link href="/" color='#008294'>Sign up</Link></Text>
                       </Flex>
                    </CardHeader>
                    <CardBody>
                        <FormControl className="mb-3">
                            <FormLabel>Email address</FormLabel>
                            <Input type='email' />
                        </FormControl>
                        <FormControl className="mb-6">
                            <FormLabel>Password</FormLabel>
                            <Input type='password' />
                        </FormControl>
                        <FormControl>
                            <Button bgColor='#F64060' className="w-full text-white">Log in</Button>
                        </FormControl>
                    </CardBody>
                </Card>
                </div>
                
            </div>
           
        </div>
    )

}
export default Home;
