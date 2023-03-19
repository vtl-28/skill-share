import React, { useEffect, useRef, useState } from 'react'
import { Flex, Spacer, chakra, Container, Grid, GridItem, Text, Heading, Box, Button, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea  } from '@chakra-ui/react'
import Navigation from './Navigation'
import { FaFacebookSquare, FaGooglePlay, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import Footer from './Footer'

function RegisterModal({onClose, isOpen}){
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction='column' className="py-10">
                 
                  <Box>
                  <FormControl className="mb-3">
                              <FormLabel className='font-link'>Your name</FormLabel>
                              <Input type='text' />
                          </FormControl>
                          <FormControl className="mb-3">
                              <FormLabel className='font-link'>Email address</FormLabel>
                              <Input type='email' />
                          </FormControl>
                          <FormControl className="mb-3">
                              <FormLabel className='font-link'>About</FormLabel>
                              <Textarea placeholder='please tell us about yourself' />
                          </FormControl>
                          <FormControl className="mb-3">
                              <FormLabel className='font-link'>City</FormLabel>
                              <Input type='text' placeholder='City you reside in'/>
                          </FormControl>
                          <FormControl className="mb-3">
                              <FormLabel className='font-link'>Profession</FormLabel>
                              <Input type='text' placeholder='What do you do for a living?'/>
                          </FormControl>
                          <FormControl className="mb-3">
                              <FormLabel className='font-link'>Profile pic</FormLabel>
                              <Input type='file' />
                          </FormControl>
                          <FormControl className="mb-3">
                              <FormLabel className='font-link'>Password</FormLabel>
                              <Input type='password' />
                          </FormControl>
                          <FormControl className="mb-6">
                              <FormLabel className='font-link'>Confirm password</FormLabel>
                              <Input type='password' />
                          </FormControl>
                          <FormControl className="mb-6">
                              <Button bgColor='#F64060' className="w-full text-white">Sign up</Button>
                          </FormControl>
                  </Box>
                  
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
    )

  
}
function getWindowDimensions() {
    const width = window.innerWidth
    const height = window.innerHeight
    return {
        width,
        height
    };
  }

const Home = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);



  return (
    <div className='bg-gradient-one xs:bg-right-top'>
      <Navigation />
      <div  className='container w-full h-full mx-auto'>

        <Box className='flex justify-around xs:pt-0 xs:flex-col md:flex-row md:mb-11 md:pt-28'>
            <div className='flex flex-col xs:w-full md:w-1/2 pt-10 xs:pl-4'>
                <Heading as='h1' className='font-bold leading-loose font-link xs:tracking-widest md:tracking-tight lg:tracking-wider xl:tracking-widest'>Connect and Learn with Talk Host: The Platform for Knowledge Sharing!</Heading>
                <Text className='mt-4 leading-loose font-link lg:tracking-wider xl:tracking-widest bg-gradient-two xs:bg-left-bottom'>Where people with a shared interest come
together and give small, informal presentations about things they know</Text>
            </div>
            <div className='bg-image w-1/3 xs:bg-right-top xs:self-center md:bg-center lg:bg-top'>
            </div>
        </Box>
     
        <div className='grid grid-cols-8'>  
            <div className='xs:col-start-1 xs:col-span-8 lg:col-start-2 lg:col-span-6'>
                <Flex direction='column' align='center'>
                    <h1 className='text-3xl mb-3 font-bold font-link'>How Talk Host works</h1>
                    <Text textAlign='center' className='font-medium font-link'>Meet new people who share your interests through online and in-person events. It’s free to create an account.</Text>
                </Flex>
            </div>
            <div className='col-start-1 col-span-8 mt-10'>
                <Flex direction={['column', 'column', 'row']} justifyContent={'space-between'}>
                    <Box className='flex flex-col items-center' mb={[6]}>
                    <Image
  boxSize='150px'
  src='/images1/undraw_the_search_s0xf.png'
  alt='Dan Abramov'
/>
                        <chakra.h3 className='sm:text-2xl my-3 font-semibold leading-7 font-link md:text-lg lg:text-2xl' color='#008294'>Find talk event</chakra.h3>
                        <Text className='sm:text-base leading-5 font-link md:text-center md:text-sm lg:text-base lg:tracking-tight xl:tracking-normal'>Search for in-person or online events</Text>
                    </Box>
                    <Box className='flex flex-col items-center' mb={[6]}>
                    <Image

  boxSize='150px'
  src='/images1/undraw_Conversation_re_c26v.png'
  alt='Dan Abramov'
/>
                        <chakra.h3 className='sm:text-2xl my-3 font-semibold leading-7 font-link md:text-lg lg:text-2xl' color='#008294'>Attend talk event</chakra.h3>
                        <Text className='sm:text-base leading-5 font-link md:text-center md:text-sm lg:text-base lg:tracking-tight xl:tracking-normal'>Attend events in-person or online</Text>
                    </Box>
                    <Box className='flex flex-col items-center'>
                    <Image

  boxSize='150px'
  src='/images1/undraw_schedule_meeting_52nu.png'
  alt='Dan Abramov'
/>
                        <chakra.h3 className='sm:text-2xl my-3 font-semibold leading-7 font-link md:text-lg lg:text-2xl' color='#008294'>Host talk event</chakra.h3>
                        <Text className='sm:text-base leading-5 font-link md:text-center md:text-sm lg:text-base lg:tracking-tight xl:tracking-normal'>Host events in-person or online</Text>
                    </Box>
                </Flex>
            </div>
            <div className='xs:col-start-1 xs:col-span-9 sm:col-start-2 sm:col-span-8 md:col-start-3 md:col-span-7 lg:col-start-4 lg:col-span-7 mt-24 bg-gradient-two bg-right'>
                <Box className='flex justify-center'>
                    <Button colorScheme='teal' color='#fff' onClick={onOpen}>Join Talk-Host</Button>
                </Box>
                <RegisterModal isOpen={isOpen} onClose={onClose}/>
            </div>
            <div className='xs:col-start-1 xs:col-span-8'>
                    <Box className='flex flex-col items-center'>
                        <h3 className='text-2xl mb-3 font-bold font-link'>Stories from Talk Host</h3>
                        <Text textAlign='center' className='font-medium font-link'>People on Talk Host have fostered community, learned new skills, started businesses, and made life-long friends. Learn how.</Text>
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

export default Home
