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
  Textarea,
} from '@chakra-ui/react'
import LogIn from '../components/LogIn'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHost, registerHost, uploadImage } from "./miscellaneous/Utils";
import { ErrorToast, SuccessToast, UploadImageToast } from "./miscellaneous/Toasts";
import LoadingSpinner from "./LoadingSpinner";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

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

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

        const postDetails = async(pics) => {
          
            setPicIsLoading(true);
            if (pics === undefined) {
              <UploadImageToast />
              return;
            }

            if (pics.type === "image/jpeg" || pics.type === "image/png") {
             
              const data = new FormData();
              data.append("file", pics);
              data.append("upload_preset", "skill-share");
              data.append("cloud_name", "dd1jqwp94");
              
              console.log(data)
              let {url} = await uploadImage(data);
              console.log(url)
         let imageUploadValidation = url.match(/cloudinary/i)
         if(imageUploadValidation){
             setPic(url);
             setPicIsLoading(false);
         }else{
            setErrorMessage("Problem uploading image")
            setPicIsLoading(false);
         }
            }else{
                <UploadImageToast />
                setPicIsLoading(false);
              return;
            }
          };


  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      let locationCoordinates ={};
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        locationCoordinates = { lat: lat, lng: lng}
        setCoordinates(coordinates => ({...coordinates, locationCoordinates}))
        console.log("📍 Coordinates: ", { lat, lng });
        
      });
    };

    const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <a href="#">
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </a>
        </li>
      );
    });

    const submitForm = async(e) => {
      e.preventDefault();
      setDataIsLoading(true);

      const data = {
          name, email, pic,about, value, coordinates, profession, password, confirmpassword
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
          setValue('')
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
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast} />}

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
                        <FormControl className="mb-3" ref={ref}>
                            <FormLabel className='font-link'>Physical address</FormLabel>
                              <Input type='text' value={value}
                                  onChange={handleInput}
                                  disabled={!ready} name="value"/>
                                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                                {status === "OK" && <ul>{renderSuggestions()}</ul>}
                              
                         </FormControl>
                         <FormControl className="mb-3">
                             <FormLabel className='font-link'>Profession</FormLabel>
                             <Input type='text' placeholder='What do you do for a living?' name="profession" value={profession}  onChange={(e) => setProfession(e.target.value)}/>
                         </FormControl>
                         <FormControl className="mb-3">
                             <FormLabel className='font-link'>Profile pic</FormLabel>
                             <Input type="file" name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />  {picIsLoading && <LoadingSpinner />}
                         </FormControl>
                         <FormControl className="mb-3">
                            <FormLabel className='font-link'>Password</FormLabel>
                             <Input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                         </FormControl>
                         <FormControl className="mb-6">
                            <FormLabel className='font-link'>Confirm password</FormLabel>
                        <Input type='password' name="confirmpassword" value={confirmpassword} placeholder="Confirm password" onChange={(e) => setConfirmpassword(e.target.value)}/>
                       </FormControl>
                       {dataIsLoading && <LoadingSpinner />}
                        <FormControl className="mb-6">
                             <Button bgColor='#F64060' className="w-full text-white" onClick={submitForm}>Sign up</Button>
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
const Navigation = () => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignup, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();

    return (
      <div>
        <Navbar bg="white" expand="md">
          <Container>
            <Navbar.Brand href="/" className="text-lg font-semibold leading-5 text-rose-500 font-link">Talk Host</Navbar.Brand>
            
            <Navbar.Toggle aria-controls="navbarScroll" />
           
            <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
              <Nav
                className="flex justify-between"
                style={{ maxHeight: '100px' }}
           
              >
                <Nav.Link className="mr-4 font-medium leading-5 text-slate-900 font-link" onClick={onOpenLogin}>Log In</Nav.Link>
                <Nav.Link  className="mr-4 font-medium leading-5 text-slate-900 font-link" onClick={onOpenSignup}>Sign Up</Nav.Link>
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
 {/* <Form className='border rounded-md'>
<Form.Group className="mb-3">
    <Form.Control type="text" name="name" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Control type="email" name="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
</Form.Group>


<textarea name="about" value={about} placeholder="tell us about yourself" rows={5} className="w-full" onChange={(e) => setAbout(e.target.value)}>

</textarea>

<Form.Group className="mb-3">
    <Form.Control type="text" name="city" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Control type="text" name="profession" value={profession} placeholder="Profession" onChange={(e) => setProfession(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Control type="file" name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
</Form.Group>

<Form.Group className="mb-3">
    <Form.Control type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Control type="password" name="confirmpassword" value={confirmpassword} placeholder="Confirm password" onChange={(e) => setConfirmpassword(e.target.value)}/>
</Form.Group>

<div className='flex justify-between'>
    <Button type="submit" className="w-1/3 text-black" onClick={submitForm}>
        Sign Up  {isLoading && <LoadingSpinner />}
    </Button>
    <Button type="button" className="w-1/3 text-black">
        <Link to="/">Back</Link>
    </Button>
</div>

</Form> */}