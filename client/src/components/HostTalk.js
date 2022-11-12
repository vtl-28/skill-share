import React from 'react'
import { Button, Form } from 'react-bootstrap';
import OtherTalks from './OtherTalks'

const HostTalk = () => {
    const talkDetails = `   What's the purpose of the talk? 
    Who should join? 
    What will you do at your talks?`
  return (
    <div className='container mx-auto'>
        <h1 className='flex justify-center mt-4'>Host Talk</h1>
        <div className='grid grid-rows-6 grid-cols-12 py-8'>
            
            <div className='col-start-1 col-span-5'>
                <h1>Your hosted talks will be listed here</h1>
            </div>
            <div className='col-start-7 col-span-5'>
                <h1 className='text-center mb-4'>Fill in the form below to host your own talk</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter the title of the talk" />
                    </Form.Group>
                    <textarea placeholder={talkDetails} rows={8} className="w-full">

                    </textarea>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter the venue of the talk" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Enter the date and time of the talk" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="file"/>
                    </Form.Group>

                    <Button type="submit" className="text-black w-full">
                                    Submit
                    </Button>
                </Form>
            </div>

        </div>
    </div>
  )
}

export default HostTalk;

