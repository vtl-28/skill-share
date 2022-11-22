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


function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = (e) =>{
        e.preventDefault();
        setIsLoading(true);

        axios.post('/login', { email, password})
        .then(response => {
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            setIsLoading(false);
            navigate("/dashboard");
        }).catch(error => {
            setIsLoading(false);
        })  
       
        
    }
    return(
        <div className="container w-full h-full mx-auto border-2 px-12 border-red-200">
            <div className="grid grid-cols-6 grid-rows-6">
                <div className="col-start-3 col-span-2 border-2 row-start-2 row-span-2 border-green-300 h-full">
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
                
                    {/* <form>
                        <input type='text' className="mb-3 w-full" placeholder='Enter your email'/>
                        <input type='text' className="mb-3 w-full" placeholder='Enter your password'/>
                        <div className="flex justify-between">
                            <button>Log in</button>
                            <button><Link to='/signup'>Sign up</Link></button>
                        </div>
                    </form> */}
                
      
                </div>
                
            </div>
           
        </div>
    )

}
export default Home;