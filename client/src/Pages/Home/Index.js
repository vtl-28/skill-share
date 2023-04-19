import React, { useEffect, useRef, useState } from 'react'
import { Flex, Spacer, chakra, Container, Grid, GridItem, Text, Heading, Box, Button, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea  } from '@chakra-ui/react'

import { FaFacebookSquare, FaGooglePlay, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

import Footer from '../../components/Footer'
import HomeNavbar from '../../components/Navigation/HomeNavbar'
import RegisterModal from '../../components/Modals/RegisterModal'

const Index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    


    return (
      <div className=''>
        <HomeNavbar/>
        <div  className=' w-full h-full '>
  
          <Box className='flex justify-around xs:pt-0 xs:flex-col sm:flex-row sm:mb-24 sm:pt-28'>
              <div className='flex flex-col xs:w-full sm:w-1/2 pt-10 xs:px-2'>
                  <Heading as='h1' fontSize={['30px', '25px', '30px', '35px']} className='font-bold xl:leading-10 font-link'>Connect and Learn with Talk Host: The Platform for Knowledge Sharing!</Heading>
                  <Text className='mt-4 leading-loose font-link xs:text-base sm:text-sm md:text-base xl:leading-8'>Where people with a shared interest come
  together and give small, informal presentations about things they know to share Knowledge and create meaningful connections</Text>
              </div>
              <div className='bg-image w-1/3 xs:mx-auto sm:mx-0 md:bg-top'>
              </div>
          </Box>
       
          <div className='grid grid-cols-8'>  
              <div className='xs:col-start-1 xs:col-span-8 lg:col-start-2 sm:px-4 lg:col-span-6'>
                  <Flex direction='column' align='center'>
                      <Heading as='h1' fontSize={['25px', '25px', '25px', '30px']} className='mb-3 font-bold font-link'>How Talk Host works</Heading>
                      <Text textAlign='center' className='font-medium font-link xs:text-sm md:text-base'>Meet new people who share your interests through online and in-person events. It’s free to create an account.</Text>
                  </Flex>
              </div>
              <div className='xs:col-start-1 xs:col-span-8 sm:px-4 mt-10'>
                  <Flex direction={['column', 'column', 'row']} justifyContent={'space-between'}>
                      <Box className='flex flex-col items-center how' mb={[6]} >
                      <Image
    boxSize='150px'
    src='/images1/undraw_the_search_s0xf.png'
    alt='Dan Abramov'
  />
                          <chakra.h3 className='sm:text-2xl my-3 font-semibold leading-7 font-link md:text-lg lg:text-2xl' color='#008294'>Find talk event</chakra.h3>
                          <Text className='xs:text-sm sm:text-base leading-5 font-link xs:text-center md:text-sm lg:text-base lg:tracking-tight xl:tracking-normal'>Search for in-person or online events</Text>
                      </Box>
                      <Box className='flex flex-col items-center' mb={[6]}>
                      <Image
  
    boxSize='150px'
    src='/images1/undraw_Conversation_re_c26v.png'
    alt='Dan Abramov'
  />
                          <chakra.h3 className='sm:text-2xl my-3 font-semibold leading-7 font-link md:text-lg lg:text-2xl' color='#008294'>Attend talk event</chakra.h3>
                          <Text className='xs:text-sm sm:text-base leading-5 font-link xs:text-center md:text-sm lg:text-base lg:tracking-tight xl:tracking-normal'>Attend events in-person or online</Text>
                      </Box>
                      <Box className='flex flex-col items-center'>
                      <Image
  
    boxSize='150px'
    src='/images1/undraw_schedule_meeting_52nu.png'
    alt='Dan Abramov'
  />
                          <chakra.h3 className='sm:text-2xl my-3 font-semibold leading-7 font-link md:text-lg lg:text-2xl' color='#008294'>Host talk event</chakra.h3>
                          <Text className='xs:text-sm sm:text-base leading-5 font-link xs:text-center md:text-sm lg:text-base lg:tracking-tight xl:tracking-normal'>Host events in-person or online</Text>
                      </Box>
                  </Flex>
              </div>
              <div className='xs:col-start-1 xs:col-span-9 sm:col-start-1 sm:col-span-9 md:col-start-1 md:col-span-9 lg:col-start-1 lg:col-span-9 mt-24'>
                  <Box className='flex justify-center'>
                      <Button colorScheme='teal' color='#fff' onClick={onOpen}>Join Talk-Host</Button>
                  </Box>
                  <RegisterModal isOpen={isOpen} onClose={onClose}/>
              </div>
              <div className='xs:col-start-1 xs:col-span-8 xs:mt-24'>
                      <Box className='flex flex-col items-center'>
                          <chakra.h3 fontSize={['22px', '22px', '22px', '30px']} className='mb-3 font-bold font-link'>Stories from Talk Host</chakra.h3>
                          <Text textAlign={['center']} className='xs:text-sm font-medium font-link md:text-base'>People on Talk Host have fostered community, learned new skills, started businesses, and made life-long friends. Learn how.</Text>
                      </Box>
              </div>
              <div className='col-start-1 col-span-8 mt-10'>
                  <div className='flex xs:flex-col md:flex-row'>
                      <Box className='flex flex-col items-center' mb={[6]}>
                      <Image
    borderRadius='full'
    boxSize='150px'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />
                          <h3 className='text-2xl mb-3 font-medium font-link'>Joh Doe</h3>
                          <div className='px-4'>
                              <Text textAlign='center' className='italic text-current md:tracking-tight'>"I was able to improve my cooking skills thanks to Talk Host. The small presentations made it easy to learn and ask questions. I can now make delicious meals for my family and friends!"</Text>
                          </div>
                      </Box>
                      <Box className='flex flex-col items-center' mb={[6]}>
                      <Image
    borderRadius='full'
    boxSize='150px'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />
                          <h3 className='text-2xl mb-3 font-medium font-link'>Jane Smith</h3>
                          <div className='px-4'>
                              <Text textAlign='center' className='italic text-current md:tracking-tight'>"I joined Talk Host's gardening skill-sharing meeting and learned so much about cultivating different vegetables. It was great to connect with other garden enthusiasts and share tips and tricks!"</Text>
                          </div>
                      </Box>
                      <Box className='flex flex-col items-center' mb={[6]}>
                      <Image
    borderRadius='full'
    boxSize='150px'
    src='https://bit.ly/dan-abramov'
    alt='Dan Abramov'
  />
                          <h3 className='text-2xl mb-3 font-medium font-link'>Ali Ahmed</h3>
                          <div className='px-4'>
                              <Text textAlign='center' className='italic text-current md:tracking-tight'>"Talk Host's platform was so easy to use and the speakers were very knowledgeable. I learned about new topics I was interested in and even discovered some new hobbies. Highly recommend it!"</Text>
                          </div>
                      </Box>
                  </div>
              </div>
          </div>
        </div>
      <div className='footer-one-style'>
          <Footer />
      </div>    
      
  
      </div>
    )
}

export default Index
