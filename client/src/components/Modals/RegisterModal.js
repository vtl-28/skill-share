import React, { useContext, useEffect, useRef, useState } from 'react'
import { Flex, Spacer, chakra, Container, Grid, GridItem, Text, Heading, Box, Button, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea  } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { TalkContext } from '../../Context/TalkProvider';
import { registerHost } from '../../Utils/host';
import PlacesAutoComplete from '../PlacesAutoComplete';
import UploadHostProfilePic from '../UploadHostProfilePic';
import { Spinner } from 'react-bootstrap';
import LoginModal from './LoginModal';
import ErrorToast from '../Toasts/ErrorToast';
import SuccessToast from '../Toasts/SuccessToast';

const RegisterModal = ({onClose, isOpen}) => {
    const navigate = useNavigate();
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [city, setCity] = useState('');
    const [profession, setProfession] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState('');
    const [picIsLoading, setPicIsLoading] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [ coordinates, setCoordinates ] = useState({})
    const { address, addressCoordinates, picUrl } = useContext(TalkContext);

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();

          

    const submitForm = async(e) => {
      e.preventDefault();
      setDataIsLoading(true);

      const data = {
          name, email, picUrl,about, address, addressCoordinates, profession, password, confirmpassword
      }
      const response = await registerHost(data)
      const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 
     
      if(hostDetailsValidation === 'no'){
        setDataIsLoading(false);
          setErrorMessage(response)
          toggleErrorToast() 
      }else{
        setDataIsLoading(false);
          setSuccessMessage("Sign up successful")
          setAbout('')
          setName('')
          setPic('')
          setProfession('')
          setPassword('')
          setConfirmpassword('')
          setEmail('')
          toggleSuccessToast();
          localStorage.setItem("userInfo", JSON.stringify(response.data));
      }
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' className="py-10">
               
                <Box>
                {showErrorToast && <ErrorToast placement={'bottom-center'} message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                {showSuccessToast && <SuccessToast placement={'bottom-center'} message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast} />}

                <FormControl className="mb-3">
                            <FormLabel className='font-link'>Your name</FormLabel>
                            <Input type='text'name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Email address</FormLabel>
                            <Input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea placeholder='please tell us about yourself' onChange={(e) => setAbout(e.target.value)} name="about" value={about}/>
                        </FormControl>
                       <PlacesAutoComplete />
                         <FormControl className="mb-3">
                             <FormLabel className='font-link'>Profession</FormLabel>
                             <Input type='text' placeholder='What do you do for a living?' name="profession" value={profession}  onChange={(e) => setProfession(e.target.value)}/>
                         </FormControl>
                         <UploadHostProfilePic />
                         <FormControl className="mb-3">
                            <FormLabel className='font-link'>Password</FormLabel>
                             <Input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                         </FormControl>
                         <FormControl className="mb-6">
                            <FormLabel className='font-link'>Confirm password</FormLabel>
                        <Input type='password' name="confirmpassword" value={confirmpassword} placeholder="Confirm password" onChange={(e) => setConfirmpassword(e.target.value)}/>
                       </FormControl>
                       {/* {dataIsLoading && <LoadingSpinner />} */}
                        <FormControl className="mb-6">
                             <Button bgColor='#F64060' className="w-full" onClick={submitForm}>
                              { dataIsLoading && ( <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              variant="secondary"
                            />)}
                              <span className={dataIsLoading ? "visually-hidden text-white" : 'text-white'}>
                                Sign up
                              </span>
                             </Button>
                        </FormControl>
                        <Flex justify='center'>
                            <Text className="text-lg leading-5">Already a member? <Link color='#008294' onClick={onOpenLogin}>Log in</Link></Text>
                         </Flex>
               
                </Box>
                
                <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin}/>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default RegisterModal
