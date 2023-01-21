import React from 'react'

function TalksList({talk}){
    const { _id, title, body, date, location, pic } = talk;
    return(
      <a href={`/talk/${_id}`} key={_id} target='blank'>
          <div className='flex justify-between w-full border-red-200 border-y-2 py-2'>
            <div className='w-1/5'>
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
      </a>
    )
}

export default TalksList;
