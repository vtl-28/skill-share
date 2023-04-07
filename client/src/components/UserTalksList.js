import React, { useContext, useState } from 'react';
import { FaAlignJustify, FaPen, FaTrash } from 'react-icons/fa';
import { Modal, Form, ModalHeader, ModalTitle, Spinner } from 'react-bootstrap';
import { TalkContext } from '../Context/TalkProvider';
import LoadingSpinner from './LoadingSpinner';
import {updateUserTalk} from './miscellaneous/Utils';
import {SuccessToast, ErrorToast } from './miscellaneous/Toasts';
import axios from 'axios';
import { format } from 'date-fns';
import { Button, FormControl, FormLabel, Input, Textarea, useDisclosure } from '@chakra-ui/react';
import PlacesAutoComplete from './PlacesAutoComplete';
import PostImage from './PostImage';


function EditTalkModal(props){
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

        let response = await updateUserTalk(_id,talkDataToUpdate);
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
function TalkActions(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const {talkDetails} = props;
    const { deleteTalk } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
      >
        <Modal.Body className='flex'>
            <div className='flex flex-col w-full'>
                <div className='flex rounded-md hover:bg-slate-300 mb-2'>
                    <FaPen />
                    <a href='#' onClick={() => setModalShow(true)} className='flex w-1/3 justify-around mb-2'>
                        Edit
                    </a>
                    <EditTalkModal
                    editTalk={talkDetails}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
                <div className='flex rounded-md hover:bg-slate-300'>
                    <FaTrash />
                    <a href='#' onClick={deleteTalk} name={talkDetails._id}  className='flex w-1/3 justify-around'>
                        Delete
                    </a>
                </div>
             
                
            </div>
        </Modal.Body>
      </Modal>
    );
  }

function UserTalksList({talk, deleteTalk}){
    const [modalShow, setModalShow] = React.useState(false);

    const { _id, title, body, date, location, pic } = talk;
    return(
        <div className='flex justify-around w-full border-slate-300 border-t-2 py-4' key={_id}>
            <div className='w-1/5'>
                <img src={pic} alt='logo'/>
            </div>
            <div className='w-1/2 flex flex-col'>
                <h4 className='mb-2 xs:text-sm sm:text-base'>{format(new Date(date), "eee',' d MMM y',' h':'mm a", {
                        weekStartsOn: 1
                    })}</h4>
                <h4 className='mb-2 xs:text-sm sm:text-base'>{title}</h4>
                <h4 className='xs:text-sm sm:text-base'>{location}</h4>
            </div>
            <div className=''>
                <a href='#' onClick={() => setModalShow(true)}><FaAlignJustify /></a>
                <TalkActions
                talkDetails={talk}
                deleteTalk={deleteTalk}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}

export default UserTalksList;
{/* <Form>
<Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder={talkTitle} value={title} onChange={(e) => setTitle(e.target.value)} name="title" />
        </Form.Group>
        <textarea placeholder={talkBody} value={body} onChange={(e) => setBody(e.target.value)} name="body" rows={8} className="w-full" >

        </textarea>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text"  placeholder={talkLocation} value={location} onChange={(e) => setLocation(e.target.value)} name="location"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text"  placeholder={talkDate} value={date} onChange={(e) => setDate(e.target.value)} name="date"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text"  placeholder={talkCity} value={city} onChange={(e) => setCity(e.target.value)} name="city" />
        </Form.Group>

        <Form.Group className="mb-3" name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])}>
            <Form.Control type="file"/>
        </Form.Group>

        <Button type="submit" onClick={updateTalk} className="w-full text-black">
                        Update Talk {isLoading && <LoadingSpinner />}
        </Button>
  
</Form> */}