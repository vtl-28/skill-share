import React from 'react'
import { Modal } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import EditTalkModal from './EditTalkModal';

const TalkActionsModal = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const {talkDetails} = props;
    const { deleteTalk } = props;

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

export default TalkActionsModal
