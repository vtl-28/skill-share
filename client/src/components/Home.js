import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";

function Home(){
    return(
        <div className="container w-full h-full mx-auto border-2 px-12 border-red-200">
            <div className="grid grid-cols-6 grid-rows-6">
                <div className="col-start-3 col-span-2 border-2 row-start-2 row-span-2 border-green-300 h-full">
                
                
                    <Tabs
                        defaultActiveKey="login"
                        id="uncontrolled-tab-example"
                        className="mb-3" justify
                        >
                        <Tab eventKey="login" title="Log in">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                
                                <Button type="submit" className="text-black w-full">
                                    Submit
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="signup" title="Sign up">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>

                               
                                <textarea placeholder="tell us about yourself" rows={5} className="w-full">

                                </textarea>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="City" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="text" placeholder="Profession" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="file"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Confirm password" />
                                </Form.Group>
                                
                                <Button type="submit" className="text-black w-full">
                                    Submit
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                
      
                </div>
                
            </div>
           
        </div>
    )

}
export default Home;