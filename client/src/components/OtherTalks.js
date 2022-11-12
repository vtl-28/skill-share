import React from 'react'

function OtherTalks(){
    return(
        <div className='flex justify-between w-full border-red-200 border-y-2 py-2'>
            <div className=''>
                <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'/>
            </div>
            <div className='flex flex-col justify-between'>
                <h1>Date</h1>
                <h1>Title</h1>
                <h1>Attendees</h1>
            </div>
            <div className=''>
                <h1>Suggested</h1>
            </div>
        </div>
    )
}

export default OtherTalks;
