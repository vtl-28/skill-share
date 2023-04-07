import React from 'react'

const Attendant = ({attendant}) => {
    const { _id, name, pic } = attendant;
  return (
    <a href={`/host/${_id}`}   key={_id} className='flex flex-col items-center justify-center w-1/5 py-3 px-2 h-40 border rounded'>
        <img src={pic} alt='logo'
        className='w-1/2 rounded-full' />
        <h1 className='mt-3'>{name}</h1>
    </a>
  )
}

export default Attendant
