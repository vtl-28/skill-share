import { Button } from '@chakra-ui/react';
import React, {  useContext } from 'react'
import { TalkContext } from '../Context/TalkProvider';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const AttendNavbar = ({title, date, attendants, book, cancel}) => {
    const { user } = useContext(TalkContext);
    let ids = [];

    attendants.forEach(element => {
        ids.push(element._id)
    });

    console.log(ids.includes(user._id))
  return (
    <div className='flex justify-between py-4'>
        <div className='flex flex-col w-1/2'>
            <h1 className='mb-2'>{format(new Date(date), "eee',' MMM d',' h':'mm a", {
                        weekStartsOn: 1
                    })}</h1>
            <h1 className='font-link font-semibold'>{title}</h1>
        </div>
        <div className='flex flex-col'>
            <h1 className='mb-2 font-semibold font-link'>R50.00</h1>
            <h1>{attendants ? (20 - attendants.length) : '20'} Spots left</h1>
        </div>
        <div className='flex'>
        {
            ids.includes(user._id) ? 
            <Button bgColor='#F64060' className=" text-white" onClick={(e) => cancel(e)}>Cancel Talk</Button> :
            <Button bgColor='#F64060' className=" text-white" onClick={(e) => book(e)}>Attend Talk</Button>
        }

        </div>
    </div>
  )
}

export default AttendNavbar
