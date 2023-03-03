import { Container, Nav, Navbar } from "react-bootstrap"
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
  Textarea,
} from '@chakra-ui/react'
import LogIn from '../components/LogIn'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHost } from "./miscellaneous/Utils";
import { ErrorToast } from "./miscellaneous/Toasts";
import LoadingSpinner from "./LoadingSpinner";


 function LoginModal({onClose, isOpen}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
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
     //const answer = response === 'Please enter all fields'|| response === 'User does not exist' || response === 'Invalid Email or Password' ? 'no' : 'yes'
     const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 
     
      if(hostDetailsValidation === 'no'){
          //console.log(response)
          setIsLoading(false);
          setErrorMessage(response)
          toggleErrorToast() 
      }else{
          //console.log(response)
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
                            <Text fontSize='2xl' color='#F64060' className="font-link font-semibold"><Link>Talk Host</Link></Text>
                            <Heading>Log in</Heading>
                            <Text className="leading-5 text-lg">Not a member? <Link color='#008294' onClick={onOpenSignup}>Sign up</Link></Text>
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
                            <Button bgColor='#F64060' className="w-full text-white" onClick={submitForm}> {isLoading && <LoadingSpinner />}Log in</Button>
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
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
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
                        <Flex justify='center'>
                            <Text className="leading-5 text-lg">Already a member? <Link color='#008294' onClick={onOpenLogin}>Log in</Link></Text>
                        </Flex>
                </Box>
                
                <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin}/>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )


 }
const Navigation = () => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();

    return (
      <div>
        <Navbar bg="white" expand="md">
          <Container>
            <Navbar.Brand href="/dashboard" className="text-rose-500 font-semibold leading-5 text-lg font-link">Talk Host</Navbar.Brand>
            
            <Navbar.Toggle aria-controls="navbarScroll" />
           
            <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
              <Nav
                className="flex justify-between"
                style={{ maxHeight: '100px' }}
           
              >
                <Nav.Link className="mr-4 leading-5 leading-5 font-medium text-slate-900 font-link" onClick={onOpenLogin}>Log In</Nav.Link>
                <Nav.Link  className="mr-4 leading-5 leading-5 font-medium text-slate-900 font-link" onClick={onOpenSignup}>Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin}/>
        <RegisterModal isOpen={isOpenSignup} onClose={onCloseSignup}/>
      </div>
    )
  }

  export default Navigation;