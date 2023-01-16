import React from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import Navbar from './Navbar';

const HostProfile = () => {
  return (
    <div>
        <Navbar />
        <div className='container mx-auto h-full w-full'>
            <div className='grid grid-cols-6 grid-rows-6 '>
                <div className='flex flex-col h-full col-start-3 col-span-2 py-4'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl'>Edit profile</h1>
                    <h4 className='mt-3'>This information will appear on your public profile</h4>
                </div>
                <Form className='mt-4'>
                    <div className='flex mb-3 justify-content-between'>
                        <img src='https://randomuser.me/api/portraits/men/83.jpg' className='rounded-full' alt='user'/>
                        <div className='flex pt-4'>
                            <label class="label">
                                <input type="file" name='pic' accept="image/*"/>
                                <span>Select a file</span>
                            </label>
                        </div>
                      
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name='name' placeholder='Tlotliso Lehola'/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name='location' placeholder='Location'/>
                    </Form.Group>
                    <textarea name='about' rows={5} placeholder='Write a little about yourself here' className='w-full mb-3'>

                    </textarea>
                    <Button type="submit" className="text-black w-full" >
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
