import React from 'react'

const Attendant = ({attendant}) => {
    const { _id, name, pic } = attendant;
  return (
    <a href={`/host/${_id}`}   key={_id} className='flex flex-col items-center justify-center h-32 w-1/5 border rounded'>
        <img src={pic} alt='logo'
        className='w-1/2 rounded-full' />
        <h1>{name}</h1>
    </a>
  )
}

export default Attendant
