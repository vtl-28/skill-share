import React from 'react'
import { Toast, ToastContainer, ToastHeader } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

const SuccessToast = ({message, showSuccessToast, toggleSuccessToast, placement}) => {
    return(
        <ToastContainer className='border-2 border-white' position={placement} >
        <Toast className='bg-green-800' show={showSuccessToast} onClose={toggleSuccessToast} delay={3000} autohide>
        <ToastHeader className='bg-green-800 border-b-1 border-b-white'>
            <FaInfoCircle className='text-white text-base' />
            <small className='text-white ml-3 text-md'>Success!</small>
        </ToastHeader>
        <Toast.Body className='text-white text-base'>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
    )
}

export default SuccessToast
