import { Button, Input, InputGroup } from '@chakra-ui/react';
import React, {  useContext } from 'react'
import { TalkContext } from '../Context/TalkProvider';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaShareSquare } from 'react-icons/fa';

const AttendNavbar = ({title, date, attendants, book, cancel}) => {
    const { user } = useContext(TalkContext);
    let ids = [];

    attendants.forEach(element => {
        ids.push(element._id)
    });

    console.log(ids.includes(user._id))
  return (
    <div className='remove-overflow'>
                <Navbar className="py-3">
        <Container>
            <div className='md:flex md:flex-col xs:hidden  lg:w-1/3 xl:w-1/2'>
                 <h1 className='mb-2'>{format(new Date(date), "eee',' MMM d',' h':'mm a", {
                             weekStartsOn: 1
                         })}</h1>
                  <h1 className='font-link font-semibold'>{title}</h1>
             </div>
             <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="navbar-toggler-style"/>
          <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
            <Nav
              className="flex justify-between md:w-3/4 xs:w-full"
              style={{ maxHeight: '100px' }}
         
            >
              
             
                   <div className='flex flex-col xs:justify-end'>
             <h1 className='mb-2 font-semibold font-link xs:text-sm sm:text-base'>R50.00</h1>
             <h1 className='xs:text-sm sm:text-base'>{attendants ? (20 - attendants.length) : '20'} Spots left</h1>
         </div>
         <div className='flex xs:flex-col sm:flex-row sm:w-1/2 md:w-2/3 sm:justify-around'>
         <div className='flex align-items-center'>
            <Button rightIcon={<FaShareSquare />} variant='outline' colorScheme='teal' size={['sm', 'md']} className=' hover:text-white'>Share</Button>
         </div>
        <div className='flex align-items-center'>
         {
             ids.includes(user._id) ? 
             <Button bgColor='#F64060' className=" text-white" onClick={(e) => cancel(e)} size={['sm', 'md']}>Cancel Talk</Button> :
             <Button bgColor='#F64060' className=" text-white" onClick={(e) => book(e)} size={['sm', 'md']}>Attend Talk</Button>
         }

         </div>
         </div>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
   
  )
}

export default AttendNavbar
 // <div className='flex justify-between py-4'>
    //     <div className='flex flex-col w-1/2'>
    //         <h1 className='mb-2'>{format(new Date(date), "eee',' MMM d',' h':'mm a", {
    //                     weekStartsOn: 1
    //                 })}</h1>
    //         <h1 className='font-link font-semibold'>{title}</h1>
    //     </div>
    //     <div className='flex flex-col'>
    //         <h1 className='mb-2 font-semibold font-link'>R50.00</h1>
    //         <h1>{attendants ? (20 - attendants.length) : '20'} Spots left</h1>
    //     </div>
    //     <div className='flex'>
    //     {
    //         ids.includes(user._id) ? 
    //         <Button bgColor='#F64060' className=" text-white" onClick={(e) => cancel(e)}>Cancel Talk</Button> :
    //         <Button bgColor='#F64060' className=" text-white" onClick={(e) => book(e)}>Attend Talk</Button>
    //     }

    //     </div>
    // </div>