import React from 'react';
import { Toast, ToastContainer, ToastHeader } from 'react-bootstrap';


function SuccessToast({message, showSuccessToast, toggleSuccessToast}){
    return(
        <ToastContainer position="top-end">
        <Toast bg='success' show={showSuccessToast} onClose={toggleSuccessToast} delay={3000} autohide>
        <ToastHeader>
            <small>Success!</small>
        </ToastHeader>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
    )
}
function ErrorToast({message, showErrorToast, toggleErrorToast}){
    return(
        <ToastContainer position="top-end" >
        <Toast bg='danger' show={showErrorToast} onClose={toggleErrorToast} delay={3000} autohide>
        <ToastHeader>
            <small>Error occurred!</small>
        </ToastHeader>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
    )
}
function UploadImageToast({message, showErrorToast, toggleErrorToast}){
    return(
        <Toast delay={3000} autohide bg='danger'>
        <Toast.Header>
            <strong className="me-auto">Error occurred</strong>
        </Toast.Header>
        <Toast.Body>Please select an image</Toast.Body>
    </Toast>
    )
}

export { SuccessToast, ErrorToast, UploadImageToast }