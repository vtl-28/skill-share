import React from 'react'

function UserTalksList({talk}){
    const { _id, title, body, date, location, pic } = talk;
    return(
        <div className='flex justify-between w-full border-red-200 border-y-2 py-2' key={_id}>
            <div className=''>
                <img src={pic} alt='logo'/>
            </div>
            <div className='flex flex-col justify-between'>
                <h1>{date}</h1>
                <h1>{title}</h1>
                <h1>Attendees</h1>
            </div>
            <div className=''>
                <h1>Suggested</h1>
            </div>
        </div>
    )
}

export default UserTalksList;
