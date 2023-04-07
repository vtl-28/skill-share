import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Nav, Navbar } from "react-bootstrap"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Card,
  CardHeader,
  Flex,
  Heading,
  Link,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea, Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import LogIn from '../components/LogIn'
import { useNavigate } from "react-router-dom";
import { loginHost, registerHost, uploadImage } from "./miscellaneous/Utils";
import { ErrorToast, SuccessToast, UploadImageToast } from "./miscellaneous/Toasts";
import LoadingSpinner from "./LoadingSpinner";
import Spinner from 'react-bootstrap/Spinner';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { TalkContext } from '../Context/TalkProvider';
import { ErrorAlert } from '../components/miscellaneous/Alerts'
import PlacesAutoComplete from '../components/PlacesAutoComplete'
import PostImage from '../components/PostImage'

 function LoginModal({onClose, isOpen}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { user, socket, viewport } = useContext(TalkContext);
  const [errorMessage, setErrorMessage] = useState([]);
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();

  const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  const navigate = useNavigate();


  const submitForm = async(e) =>{
      e.preventDefault();
      setIsLoading(true);

      const data = {
          email, password
      }
      let response = await loginHost(data);
   
     const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 
     
      if(hostDetailsValidation === 'no'){
    
          setIsLoading(false);
          setErrorMessage(response)
          toggleErrorToast() 
      }else{
          setIsLoading(false);
          navigate("/dashboard", {state: response});
      }
  }

  
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' className="py-10">
               <Flex direction='column' alignItems='center'  h='120px' justifyContent='space-between'>
                            <Text fontSize='2xl' color='#F64060' className="font-semibold font-link"><Link>Talk Host</Link></Text>
                            <Heading>Log in</Heading>
                            <Text className="text-lg leading-5">Not a member? <Link color='#008294' onClick={onOpenSignup}>Sign up</Link></Text>
                </Flex>
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
               
                <Box className="pt-10">
                
                        <FormControl className="mb-3">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl className="mb-6">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            {/* <Button bgColor='#F64060' className="w-full text-white" onClick={submitForm}> {isLoading && <LoadingSpinner />}Log in</Button> */}
                            <Button bgColor='#F64060' className="w-full" onClick={submitForm}>
                              { isLoading && ( <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              variant="secondary"
                            />)}
                              <span className={isLoading ? "visually-hidden text-white" : 'text-white'}>
                                Log in
                              </span>
                             </Button>
                        </FormControl>
                </Box>
                <RegisterModal isOpen={isOpenSignup} onClose={onCloseSignup}/>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )

 }

 function RegisterModal({onClose, isOpen}){
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

          
        //     setPicIsLoading(true);
        //     if (pics === undefined || pics === '') {
        //       setErrorMessage("Please select a file")
        //       setPicIsLoading(false);
        //       toggleErrorToast()
        //     }

        //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
             
        //       const data = new FormData();
        //       data.append("file", pics);
        //       data.append("upload_preset", "skill-share");
        //       data.append("cloud_name", "dd1jqwp94");
              
        //       console.log(data)
        //       let {url} = await uploadImage(data);
        //       console.log(url)
        //  let imageUploadValidation = url.match(/cloudinary/i)
        //  if(imageUploadValidation){
        //      setPic(url);
        //      setPicIsLoading(false);
        //  }else{
        //     setErrorMessage("Problem uploading image")
        //     setPicIsLoading(false);
        //     toggleErrorToast()
        //  }
        //     }else{
        //         setErrorMessage('Please select an image file')
        //         setPicIsLoading(false);
        //         toggleErrorToast()
        //     }
        //   };

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
   //console.log(isLoaded)

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
                         <PostImage />
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
const Navigation = ({ls}) => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();
  console.log(ls)
    return (
      <div>
        <Navbar bg="white">
          <div className='flex justify-between align-items-center px-2 w-full'>
            <Navbar.Brand href="/" className="text-lg font-semibold leading-5 text-rose-500 font-link">Talk Host</Navbar.Brand>
            
            <Navbar.Toggle aria-controls="navbarScroll" />
           
            <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
              <Nav
                className="flex justify-between"
                style={{ maxHeight: '100px' }}
           
              >
                <Nav.Link className="mr-4 xs:text-sm sm:text-base font-medium leading-5 text-slate-900 hover:text-teal-700 font-link " onClick={onOpenLogin}>Log in</Nav.Link>
                <Nav.Link  className="xs:text-sm sm:text-base font-medium leading-5 text-slate-900 hover:text-teal-700 font-link" onClick={onOpenSignup}>Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin}/>
        <RegisterModal isOpen={isOpenSignup} onClose={onCloseSignup} ls={ls}/>
      </div>
    )
  }

  export default Navigation;