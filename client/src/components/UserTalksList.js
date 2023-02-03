import React, { useContext, useState } from 'react';
import { FaAlignJustify, FaPen, FaTrash } from 'react-icons/fa';
import { Button, Modal, Form, ModalHeader, ModalTitle } from 'react-bootstrap';
import { TalkContext } from '../Context/TalkProvider';
import LoadingSpinner from './LoadingSpinner';
import {updateUserTalk} from './miscellaneous/Utils';
import {SuccessToast, ErrorToast } from './miscellaneous/Toasts';


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


    const {editTalk} = props
    const { _id, title: talkTitle, city: talkCity, pic: talkPic, date: talkDate, location: talkLocation, body: talkBody} = editTalk;

    async function updateTalk(e){
        e.preventDefault();
        setIsLoading(true);

        const talkDataToUpdate = {
            title,
            body,
            city,
            location,
            pic, 
            date
        }
        let response = await updateUserTalk(_id,talkDataToUpdate);
        const hostDetailsValidation = typeof response === 'object' ? 'yes': 'no';

        if(hostDetailsValidation === 'no'){
            setIsLoading(false);
            setErrorMessage(response);
            toggleErrorToast()
        }else{
            setIsLoading(false);
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
            {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
            {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
            <Form>
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
              
            </Form>
          </Modal.Body>
        </Modal>
      );

}
function MyVerticallyCenteredModal(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const {talkDetails} = props
   
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
                editTalk={talkDetails}
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
