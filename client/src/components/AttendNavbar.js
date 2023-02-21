import React, {  useContext } from 'react'
import { Button } from 'react-bootstrap'
import { TalkContext } from '../Context/TalkProvider';

const AttendNavbar = ({title, date, attendants, book, cancel}) => {
    const { user } = useContext(TalkContext);

  
  return (
    <div className='flex justify-between py-4'>
        <div className='flex flex-col w-1/2'>
            <h1 className='mb-2'>{date}</h1>
            <h1>{title}</h1>
        </div>
        <div className='flex flex-col'>
            <h1 className='mb-2'>R50.00</h1>
            <h1>{attendants ? (20 - attendants.length) : '20'} Spots left</h1>
        </div>
        <div className='flex'>
        {
            attendants.includes(user._id) ? 
            <Button onClick={(e) => cancel(e)}>Cancel Talk</Button> :
            <Button onClick={(e) => book(e)}>Attend Talk</Button>
        }

        </div>
    </div>
  )
}

export default AttendNavbar
