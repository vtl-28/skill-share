import React from 'react'

const LocationPin = ({ text }) => {
  return (
    <div className='flex'>
       {/* <Icon icon={locationIcon} className="pin-icon" /> */}
        <p className="pin-text">{text}</p>
    </div>
  )
}

export default LocationPin
