import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { Modal, ModalHeader, ModalTitle, Spinner } from 'react-bootstrap';
import { TalkContext } from '../../Context/TalkProvider';
import { updateHostTalk } from '../../Utils/talk';
import PlacesAutoComplete from '../PlacesAutoComplete';
import PostImage from '../UploadHostProfilePic';
import ErrorToast from '../Toasts/ErrorToast';
import SuccessToast from '../Toasts/SuccessToast';

const EditTalkModal = (props) => {
    const { user, address, addressCoordinates, picUrl } = useContext(TalkContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [pic, setPic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [picIsLoading, setPicIsLoading] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(false);

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);


    const {editTalk} = props
    const { _id, title: talkTitle, city: talkCity, pic: talkPic, date: talkDate, location: talkLocation, body: talkBody} = editTalk;

    async function updateTalk(e){
        e.preventDefault();
        setDataIsLoading(true);

        const talkDataToUpdate = {
            title,
            body,
            address,
            addressCoordinates,
            location,
            picUrl, 
            date
        }

        let response = await updateHostTalk(_id,talkDataToUpdate);
        const hostDetailsValidation = typeof response === 'object' ? 'yes': 'no';

        if(hostDetailsValidation === 'no'){
            setDataIsLoading(false);
            setErrorMessage(response);
            toggleErrorToast()
        }else{
            setDataIsLoading(false);
            setSuccessMessage('Talk details successfully updated')
            setTitle('')
            setBody('')
            setPic('')
            setDate('')
            setLocation('')
            setCity('')
            toggleSuccessToast();
        }
        console.log(response)
 

    }

    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered 
        >  
            <ModalHeader>
                <ModalTitle>Edit Talk</ModalTitle>
            </ModalHeader>
          <Modal.Body className='flex'>
            {showSuccessToast && <SuccessToast placement='middle-center' message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
            {showErrorToast && <ErrorToast placement='middle-center' message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
            <div className='flex flex-col w-full'>
            <FormControl className="mb-3">
                            <FormLabel className='font-link'>Title</FormLabel>
                            <Input type="text" value={title} placeholder={talkTitle} onChange={(e) => setTitle(e.target.value)} name="title"/>
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>About</FormLabel>
                            <Textarea  h='100px' placeholder={talkBody} value={body} onChange={(e) => setBody(e.target.value)} name="body" />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Venue</FormLabel>
                            <Input type="text" value={location} placeholder={talkLocation} onChange={(e) => setLocation(e.target.value)} name="location" />
                        </FormControl>
                        <FormControl className="mb-3">
                            <FormLabel className='font-link'>Date</FormLabel>
                            <Input type="text" value={date} placeholder={talkDate} onChange={(e) => setDate(e.target.value)} name="date"/>
                        </FormControl>
                        <PlacesAutoComplete />
                        <PostImage />
                        <FormControl>
                        <Button bgColor='#F64060' className="w-full" onClick={updateTalk}>
                        { dataIsLoading && ( <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="secondary"
                      />)}
                        <span className={dataIsLoading ? "visually-hidden text-white" : 'text-white'}>
                          Update Talk
                        </span>
                       </Button>
                        </FormControl>
            </div>
          </Modal.Body>
        </Modal>
      );

}

export default EditTalkModal
