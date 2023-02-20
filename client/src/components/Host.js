import React from 'react';
import { useParams} from 'react-router-dom'
import { faClock, faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFacebookSquare, FaTwitter, FaLinkedin, FaInbox } from 'react-icons/fa';
import Navbar from './Navbar'
import { useQuery } from '@tanstack/react-query';
import {fetchUser } from '../components/miscellaneous/Utils';

const Host = () => {
  const { id } = useParams();

  const { data, error, status, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => fetchUser(id)})
    if (status === 'loading') {
        return <div>loading profile</div> // loading state
      }
    
      if (status === 'error') {
        return <div>{error.message}</div> // error state
      }
      console.log(data)

      const {  name, email, profession, pic, city } = data;
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <div className='grid grid-cols-10 grid-rows-6 h-full pt-6'>
            <div className='col-start-2 col-span-4 h-full'>
                <img src={pic} alt='logo'
                className='h-75 w-full'/>
            </div>
            <div className='col-start-7 col-span-3'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>{name}</h1>
                    <div className='flex mt-4'>
                        <FontAwesomeIcon icon={faCompass} />
                        <h3 className='ml-4'>{email}</h3>
                    </div>
                    <div className='flex mt-3'>
                        <FontAwesomeIcon icon={faUserTie} />
                        <h3 className='ml-4'>{profession}</h3>
                    </div>
                    <div className='flex mt-3'>
                        <FontAwesomeIcon icon={faUser} />
                        <h3 className='ml-4'>Organized by {name}</h3>
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
