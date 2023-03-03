import React from 'react'
import { Flex, Spacer, chakra, Container, Grid, GridItem, Text, Heading, Box, Button, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea  } from '@chakra-ui/react'
import Navigation from './Navigation'

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
const Home = () => {
    const myStyle={
        backgroundImage:  "url(/images1/undraw_sharing_knowledge_03vp.png)",
        height:'80vh',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Navigation />
      <div style={myStyle} className='container w-full h-full mx-auto bg-right-top'>
        <div className='grid grid-cols-8 mb-40'>
            <div className='col-start-1 col-span-3 pl-16 mt-20 mb-10'>
                <Heading as='h1' className='font-bold leading-loose font-link'>Connect and Learn with Talk Host: The Platform for Knowledge Sharing!</Heading>
                <Text className='mt-4 tracking-wide leading-loose font-link'>Where people with a shared interest come
together and give small, informal presentations about things they know</Text>
            </div>
        </div>
        <div className='grid grid-cols-8'>
            <div className='col-start-3 col-span-4'>
                <Flex direction='column' align='center'>
                    <h1 className='text-3xl mb-3 font-bold font-link'>How Talk Host works</h1>
                    <Text textAlign='center' className='font-medium font-link'>Meet new people who share your interests through online and in-person events. It’s free to create an account.</Text>
                </Flex>
            </div>
            <div className='col-start-1 col-span-8 mt-10'>
                <Flex justifyContent='space-between'>
                    <Box className='flex flex-col items-center'>
                    <Image
  boxSize='150px'
  src='/images1/undraw_the_search_s0xf.png'
  alt='Dan Abramov'
/>
                        <chakra.h3 className='text-2xl my-3 font-semibold leading-7 font-link' color='#008294'>Find talk event</chakra.h3>
                        <Text className='text-base leading-5 font-link'>Search for in-person or online events</Text>
                    </Box>
                    <Box className='flex flex-col items-center'>
                    <Image

  boxSize='150px'
  src='/images1/undraw_Conversation_re_c26v.png'
  alt='Dan Abramov'
/>
                        <chakra.h3 className='text-2xl my-3 font-semibold leading-7 font-link' color='#008294'>Attend talk event</chakra.h3>
                        <Text className='text-base leading-5 font-link'>Attend events in-person or online</Text>
                    </Box>
                    <Box className='flex flex-col items-center'>
                    <Image

  boxSize='150px'
  src='/images1/undraw_schedule_meeting_52nu.png'
  alt='Dan Abramov'
/>
                        <chakra.h3 className='text-2xl my-3 font-semibold leading-7 font-link' color='#008294'>Host talk event</chakra.h3>
                        <Text className='text-base leading-5 font-link'>Host events in-person or online</Text>
                    </Box>
                </Flex>
            </div>
            <div className='col-start-4 col-span-2 mt-24'>
                <Box className='flex justify-center'>
                    <Button colorScheme='teal' color='#fff' onClick={onOpen}>Join Talk-Host</Button>
                </Box>
                <RegisterModal isOpen={isOpen} onClose={onClose}/>
            </div>
            <div className='col-start-3 col-span-4 mt-32'>
                    <Box className='flex flex-col items-center'>
                        <h3 className='text-2xl mb-3 font-bold font-link'>Stories from Talk Host</h3>
                        <Text textAlign='center' className='font-medium font-link'>People on Talk Host have fostered community, learned new skills, started businesses, and made life-long friends. Learn how.</Text>
                    </Box>
            </div>
            <div className='col-start-1 col-span-8 mt-10'>
                <Flex justifyContent='space-between'>
                    <Box className='flex flex-col items-center'>
                    <Image
  borderRadius='full'
  boxSize='150px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
/>
                        <h3 className='text-2xl mb-3 font-medium font-link'>Joh Doe</h3>
                        <Text textAlign='center' className='italic text-current'>"I was able to improve my cooking skills thanks to Talk Host. The small presentations made it easy to learn and ask questions. I can now make delicious meals for my family and friends!"</Text>
                    </Box>
                    <Box className='flex flex-col items-center'>
                    <Image
  borderRadius='full'
  boxSize='150px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
/>
                        <h3 className='text-2xl mb-3 font-medium font-link'>Jane Smith</h3>
                        <Text textAlign='center' className='italic text-current'>"I joined Talk Host's gardening skill-sharing meeting and learned so much about cultivating different vegetables. It was great to connect with other garden enthusiasts and share tips and tricks!"</Text>
                    </Box>
                    <Box className='flex flex-col items-center'>
                    <Image
  borderRadius='full'
  boxSize='150px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
/>
                        <h3 className='text-2xl mb-3 font-medium font-link'>Ali Ahmed</h3>
                        <Text textAlign='center' className='italic text-current'>"Talk Host's platform was so easy to use and the speakers were very knowledgeable. I learned about new topics I was interested in and even discovered some new hobbies. Highly recommend it!"</Text>
                    </Box>
                </Flex>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Home
