import { Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Image, Input, Textarea } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchHost, updateHost } from '../../Utils/host';
import DashboardNavbar from '../../components/Navigation/DashboardNavbar';
import PlacesAutoComplete from '../../components/PlacesAutoComplete';
import ErrorToast from '../../components/Toasts/ErrorToast';
import SuccessToast from '../../components/Toasts/SuccessToast';
import UpdateHostProfilePic from '../../components/UpdateHostProfilePic';
import { TalkContext } from '../../Context/TalkProvider';

const Index = () => {
    let { id } = useParams();
    const { address, addressCoordinates, picUrl } = useContext(TalkContext);
    const [ userPic, setUserPic ] = useState('')
    const [ userCity, setUserCity ] = useState('')
    const [ userAbout, setUserAbout ] = useState('')
    const [ userEmail, setUserEmail ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ userProfession, setUserProfession ] = useState('')
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [picIsLoading, setPicIsLoading] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [ coordinates, setCoordinates ] = useState({})

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  


    const { data: host, error, isLoading, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => fetchHost(id)})
    if (isLoading) {
        return <div>loading profile</div> // loading state
      }
    
      if (isError) {
        return <div>{error.message}</div> // error state
      }
      
    const { name, email, pic, city, profession, about } = host;

    const submitForm = async(e) => {
        e.preventDefault();
        setDataIsLoading(true);
        const userDataToUpdate = {
            userName,
            userEmail,
            address,
            addressCoordinates,
            userAbout,
            picUrl,
            userProfession
        }
      
        let response = await updateHost(id,userDataToUpdate);
        const hostDetailsValidation = typeof response === 'object' ? 'yes': 'no';

        if(hostDetailsValidation === 'no'){
            setDataIsLoading(false);
            setErrorMessage(response);
            toggleErrorToast()
        }else{
            setDataIsLoading(false);
            setUserAbout('')
            setUserPic('')
            setUserName('')
            setUserEmail('')
            setUserProfession('')
            setSuccessMessage('Host details successfully updated')
            toggleSuccessToast();
        }
        console.log(response)
 
    }


  return (
    <div className='remove-overflow'>
        <DashboardNavbar />
        <div className='container w-full h-full mx-auto'>
            <div className='grid grid-cols-12'>
                <div className='flex flex-col h-full xs:col-start-2 xs:col-span-10 lg:col-start-4 lg:col-span-6  py-4'>
                <Flex direction='column' className='mb-10'>
                    <Heading className='text-2xl'>Edit profile</Heading>
                    <h4 className='mt-3 textbase'>This information will appear on your public profile</h4>
                </Flex>
                {showErrorToast && <ErrorToast placement='middle-center' message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
                {showSuccessToast && <SuccessToast placement='middle-center' message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
               
        
                   <Card>
                        <CardBody>
                        {picIsLoading && <LoadingSpinner />}
                        <Flex justifyContent='space-between'  className='mb-3'>
                            <Image className='rounded-full w-1/2' alt='user' src={pic}/>
                            <Flex className='flex pt-4 align-items-center'>
                               <UpdateHostProfilePic />
                            </Flex>
                        </Flex>
                    <FormControl className="mb-3">
                            <FormLabel className='font-link'>Your name</FormLabel>
                            <Input type='text' placeholder={name} name='userName' onChange={(e) => setUserName(e.target.value)}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Email address</FormLabel>
                            <Input type='email' placeholder={email} name='userEmail' onChange={(e) => setUserEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea placeholder={about} name='userAbout' onChange={(e) => setUserAbout(e.target.value)}/>
                        </FormControl>
                        <PlacesAutoComplete />
                        <FormControl className="mb-6">
                            <FormLabel className='font-link'>Profession</FormLabel>
                            <Input type='text' placeholder={profession} name='userProfession' onChange={(e) => setUserProfession(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                        {dataIsLoading && <LoadingSpinner />}
                            <Button bgColor='#F64060' className="w-full text-white" onClick={submitForm}>Save changes</Button>
                        </FormControl>
                        </CardBody>
                   </Card>
                

                </div>
       
                
            </div>
        </div>
        <div className="footer-two-style">
          <Footer />
        </div>
    </div>
  )
}

export default Index
