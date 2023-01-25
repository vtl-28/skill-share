import React, { useContext, useState } from 'react';
import { FaAlignJustify, FaPen, FaTrash } from 'react-icons/fa';
import { Button, Modal, Form, ModalHeader, ModalTitle } from 'react-bootstrap';
import { TalkContext } from '../Context/TalkProvider';
import LoadingSpinner from './LoadingSpinner';


function EditTalkModal(props){
    const { user } = useContext(TalkContext);
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

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const { _id } = user;
    const { details } = props;
    console.log(_id);
    console.log('' + details);

    
    function updateTalk(){
        

    }
    function postDetails(){
        
    }

    return (
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered 
        >  
            <ModalHeader>
                <ModalTitle>Edit Talk</ModalTitle>
            </ModalHeader>
          <Modal.Body className='flex'>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} name="title" placeholder="Title" />
                    </Form.Group>
                    <textarea onChange={(e) => setBody(e.target.value)} name="body" rows={8} className="w-full" placeholder="Bio" >

                    </textarea>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text"  onChange={(e) => setLocation(e.target.value)} name="location" placeholder="Venue" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text"  onChange={(e) => setDate(e.target.value)} name="date" placeholder="Date and time" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text"  onChange={(e) => setCity(e.target.value)} name="city" placeholder="City" />
                    </Form.Group>

                    <Form.Group className="mb-3" name="pic" accept="image/*" onChange={(e) => postDetails(e.target.files[0])}>
                        <Form.Control type="file"/>
                    </Form.Group>

                    <Button type="submit" className="w-full text-black">
                                    Update Talk {isLoading && <LoadingSpinner />}
                    </Button>
              
            </Form>
          </Modal.Body>
        </Modal>
      );

}
function MyVerticallyCenteredModal(props) {
    const { user, hostTalks, setHostTalks } = useContext(TalkContext);
    const [modalShow, setModalShow] = React.useState(false);
    
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
      >
        <Modal.Body className='flex'>
            <div className='flex flex-col w-full'>
                <a href='#' onClick={() => setModalShow(true)} className='flex w-1/3 justify-around mb-2'>
                    <FaPen />Edit
                </a>
                <EditTalkModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <a href='#' className='flex w-1/3 justify-around'>
                    <FaTrash />Delete
                </a>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

function UserTalksList({talk}){
    const [modalShow, setModalShow] = React.useState(false);

    const { _id, title, body, date, location, pic } = talk;
    return(
        <div className='flex justify-between w-full border-red-200 border-y-2 py-2' key={_id}>
            <div className='w-1/5'>
                <img src={pic} alt='logo'/>
            </div>
            <div className='flex flex-col justify-between'>
                <h1>{date} {location}</h1>
                <h1>{title}</h1>
                <h1>Attendees</h1>
            </div>
            <div className=''>
                <a href='#' onClick={() => setModalShow(true)}><FaAlignJustify /></a>
                <MyVerticallyCenteredModal
                talkDetails={talk}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}

export default UserTalksList;
