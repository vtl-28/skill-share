import React, { useContext, useState } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { TalkContext } from '../Context/TalkProvider';

const PlacesAutoComplete = () => {
    const [ coordinates, setCoordinates ] = useState({})
    const {  setAddress, setAddressCoordinates } = useContext(TalkContext);
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
      });

      const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
        setAddress(description)
        
          clearSuggestions();
          let locationCoordinates ={};
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            locationCoordinates = { lat: lat, lng: lng}
            setCoordinates(coordinates => ({...coordinates, locationCoordinates}))
            setAddressCoordinates((addressCoordinates) => ({...addressCoordinates, locationCoordinates}))
            //console.log("📍 Coordinates: ", { lat, lng });
            
          });
        };
    
        const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={place_id} onClick={handleSelect(suggestion)}>
              <a href="#">
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </a>
            </li>
          );
        });
    // console.log(hostAddress)
    // console.log(hostAddressCoordinates)
  return (
    <div>
         <FormControl className="mb-3" ref={ref}>
                            <FormLabel className='font-link'>Physical address</FormLabel>
                              <Input type='text' value={value}
                                  onChange={handleInput}
                                  disabled={!ready} name="value"/>
                                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                                {status === "OK" && <ul>{renderSuggestions()}</ul>}
                              
            </FormControl>
      
    </div>
  )
}

export default PlacesAutoComplete
