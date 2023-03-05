import React from 'react';
import { useParams} from 'react-router-dom'
import { faClock, faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFacebookSquare, FaTwitter, FaLinkedin, FaInbox } from 'react-icons/fa';
import Navbar from './Navbar'
import { useQuery } from '@tanstack/react-query';
import {fetchHostTalks, fetchUser } from '../components/miscellaneous/Utils';
import { EmailIcon } from '@chakra-ui/icons'
import { Flex, Image, Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import HostEvents from '../components/HostEvents';

const AboutHost = ({about}) => {

  return( 
    <p>{about}</p>

  )
}


const Host = () => {
  const { id } = useParams();

  const { data, error, status, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => fetchUser(id)})
    if (status === 'loading') {
        return <div>loading profile</div> // loading state
      }
    
      if (status === 'error') {
        return <div>{error.message}</div> // error state
      }
     

      const {  _id, name, email, profession, pic, city, about } = data;
  return (
    <div>
      <Navbar />
      <div className='container mx-auto px-28 pt-8'>
          <Flex justifyContent='space-between' width='100%'>
            <Flex width='55%'>
              <img src={pic} alt='logo' className='object-fill w-full h-96 rounded-md'/>
            </Flex>
            <Flex direction='column' width='33%'>
              <h1 className='text-4xl font-bold'>{name}</h1>
              <div className='flex mt-4'>
                <EmailIcon />
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
            </Flex>
          </Flex>
          <div className='grid grid-rows-6 h-full'>
          <Tabs size='lg' isFitted>
                <TabList>
                  <Tab>About Host</Tab>
                  <Tab>Events</Tab>
                  <Tab>Three</Tab>
                </TabList>

                <TabPanels h='2095px' w='100%' className=''>
                  <TabPanel h='2095px'>
                    <AboutHost about={about} />
                  </TabPanel>
                  <TabPanel h='2095px'>
                    <ul className='flex flex-col h-full'>
                      <HostEvents id={_id}/>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          </div>

          {/* <Flex className='h-full'>
          <Tabs size='lg' isFitted>
                <TabList>
                  <Tab>About Host</Tab>
                  <Tab>Events</Tab>
                  <Tab>Three</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <AboutHost about={about} />
                  </TabPanel>
                  <TabPanel className='h-full border-2 border-blue-700'>
                    <ul className='flex flex-col border-2 border-green-700 h-full'>
                      <HostEvents id={_id}/>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          </Flex> */}
      </div>
    </div>
  )
}

export default Host;
{/* <div className='col-start-2 col-span-4 h-full'>
<Image src={pic} alt='logo' boxSize='380px' objectFit='cover'/>
   
</div>
<div className='col-start-7 col-span-3'>
    <div className='flex flex-col'>
        <h1 className='text-3xl font-bold'>{name}</h1>
        <div className='flex mt-4'>
            <EmailIcon />
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
<div div className='col-start-7 col-span-3'>
    <h1>hi</h1>
</div>
</div> */}