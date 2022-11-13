import React from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock,  faCompass } from '@fortawesome/free-regular-svg-icons'

const Talk = () => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <div className='flex flex-col mx-28 py-6 border-b-2 border-red-400'>
            <h1 className='text font-bold text-2xl'>How to do the garden</h1>
            <div className='flex flex-row mt-4 w-25 justify-between'>
                <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo' 
                className='rounded-full'/>
                <div className='flex flex-col justify-center'>
                    <h1 className='mb-2'>Hosted by</h1>
                    <h1>Vuyisile Lehola</h1>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-10 grid-rows-6 h-full pt-6 bg-gray-50'>
            <div className='col-start-2 col-span-4 h-full'>
                <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                    className='w-full'
                />
                <h1 className='text-xl font-bold mt-3 mb-4'>Details</h1>
                <p className='font-bold mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <a href='#' className='mt-8 text-blue-700'>Ticket here</a>
                <div className='flex flex-col mt-6'>
                    <div className='flex justify-between mb-3'>
                        <h1 className='font-bold text-xl'>Attendees (5)</h1>
                        <a href='#' className=' text-blue-700'>See all</a>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-1/5 flex flex-col justify-center items-center border rounded'>
                            <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                            className='rounded-full w-1/2' />
                            <h1>Vuyisile</h1>
                        </div>
                        <div className='w-1/5 flex flex-col justify-center items-center border rounded'>
                            <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                            className='rounded-full w-1/2' />
                            <h1>Vuyisile</h1>
                        </div>
                        <div className='w-1/5 flex flex-col justify-center items-center border rounded'>
                            <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                            className='rounded-full w-1/2' />
                            <h1>Vuyisile</h1>
                        </div>
                        <div className='w-1/5 flex flex-col py-4 items-center border rounded'>
                            <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                            className='rounded-full w-1/2' />
                            <h1>Vuyisile</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-start-7 col-span-3'>
                <div className='p-4 border rounded flex'>
                    <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                            className='w-1/4' />
                    <div className='flex flex-col ml-4'>
                        <h1 className='font-bold'>Vuyisile Lehola</h1>
                        <h1 className='mt-2 text-slate-500'>Software developer</h1>
                    </div>
                </div>
                <div className='p-4 border rounded flex flex-col justify-between mt-4'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faClock} />
                        <h1 className='ml-4'>Date</h1>
                    </div>
                    <div className='flex mt-3'>
                        <FontAwesomeIcon icon={ faCompass} />
                        <h1 className='ml-4'>Date</h1>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Talk;
