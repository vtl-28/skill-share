import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div>
       <Spinner animation="border" role="status" size="md" variant="secondary">
         <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  )
}

export default LoadingSpinner;
