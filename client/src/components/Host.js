import React from 'react';
import { faClock, faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFacebookSquare, FaTwitter, FaLinkedin, FaInbox } from 'react-icons/fa';
import Navbar from './Navbar'

const Host = () => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <div className='grid grid-cols-10 grid-rows-6 h-full pt-6'>
            <div className='col-start-2 col-span-4 h-full'>
                <img src='https://randomuser.me/api/portraits/men/83.jpg' alt='logo'
                className='h-75 w-full'/>
            </div>
            <div className='col-start-7 col-span-3'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>Vuyisile Lehola</h1>
                    <div className='flex mt-4'>
                        <FontAwesomeIcon icon={faCompass} />
                        <h3 className='ml-4'>North West, Mahikeng</h3>
                    </div>
                    <div className='flex mt-3'>
                        <FontAwesomeIcon icon={faUserTie} />
                        <h3 className='ml-4'>Software developer</h3>
                    </div>
                    <div className='flex mt-3'>
                        <FontAwesomeIcon icon={faUser} />
                        <h3 className='ml-4'>Organized by Vuyisile Lehola</h3>
                    </div>
                    <div className='flex mt-48'>
                        <h3 className='font-bold'>Share:</h3>
                        <a href='#' className='mx-1'><FaFacebookSquare /></a>
                        <a href='#' className='mx-1'><FaTwitter /></a>
                        <a href='#' className='mx-1'><FaLinkedin /></a>
                        <a href='#' className='mx-1'><FaInbox /></a>
                    </div>     
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Host;
