import React from "react";
import { Toast, ToastContainer, ToastHeader } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const ErrorToast = ({
  message,
  showErrorToast,
  toggleErrorToast,
  placement,
}) => {
  return (
    <ToastContainer className="border-2 border-white" position={placement}>
      <Toast
        className="bg-red-600"
        show={showErrorToast}
        onClose={toggleErrorToast}
        delay={3000}
        autohide
      >
        <ToastHeader className="bg-red-600 border-b-1 border-b-white">
          <FaInfoCircle className="text-white text-base" />
          <small className="text-white ml-3 text-md">Error occurred!</small>
        </ToastHeader>
        <Toast.Body className="text-white text-base">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorToast;
