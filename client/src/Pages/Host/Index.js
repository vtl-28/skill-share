import { EmailIcon } from '@chakra-ui/icons';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { FaFacebookSquare, FaInbox, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import HostInfoTabs from '../../components/HostInfoTabs';
import { fetchHost } from '../../Utils/host';
import DashboardNavbar from '../../components/Navigation/DashboardNavbar';
import { TalkContext } from '../../Context/TalkProvider';

  
const Index = () => {
    const { id } = useParams();
    const { viewport } = useContext(TalkContext);
  
    const { data, error, status, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => fetchHost(id)})
      if (status === 'loading') {
          return <div>loading profile</div> // loading state
        }
      
        if (status === 'error') {
          return <div>{error.message}</div> // error state
        }
        console.log(viewport)
  
        const {  _id, name, email, profession, pic, city, about } = data;
    return (
      <div>
        <DashboardNavbar />
        <div className='container mx-auto xs:px-4 xl:px-28 pt-8'>
            <Flex direction={['column', 'column', 'row']} justifyContent='space-between' width='100%'>
              <Flex width={['100%', '100%', '55%', '60%']} mb={['6']}>
                <img src={pic} alt='logo' className='object-fill w-full xs:h-50 rounded-md'/>
              </Flex>
              <Flex direction='column' width={['100%', '100%', '40%', '33%']}>
                <h1 className='text-4xl font-bold tracking-widest leading-5'>{name}</h1>
                <div className='flex mt-4'>
                  <EmailIcon />
                  <h3 className='ml-4 tracking-widest leading-5'>{email}</h3>
                </div>
                <div className='flex mt-3'>
                  <FontAwesomeIcon icon={faUserTie} />
                  <h3 className='ml-4 leading-5 tracking-widest' >{profession}</h3>
               </div>
                <div className='flex mt-3'>
                    <FontAwesomeIcon icon={faUser} />
                    <h3 className='ml-4 tracking-widest leading-5'>Organized by {name}</h3>
                </div>
                <div className='flex lg:mt-40 xl:mt-48 xs:w-1/2 sm:w-1/3 md:w-2/3 justify-between xs:mt-5 md:mt-14'>
                    <h3 className='font-bold text-lg'>Share:</h3>
                    <a href='#' className='mx-1 flex align-items-center justify-center text-xl'><FaFacebookSquare /></a>
                    <a href='#' className='mx-1 flex align-items-center justify-center text-xl'><FaTwitter /></a>
                    <a href='#' className='mx-1 flex align-items-center justify-center text-xl'><FaLinkedin /></a>
                    <a href='#' className='mx-1 flex align-items-center justify-center text-xl'><FaInbox /></a>
                </div> 
              </Flex>
            </Flex>
            <div className='grid  xs:mt-5'>
                <HostInfoTabs _id={_id} about={about}/>
            </div>
        </div>
            <div className='footer-one-style'>
          <Footer />
      </div>   
      </div>
    )
}

export default Index
