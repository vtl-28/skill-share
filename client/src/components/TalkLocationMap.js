import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Radium, { StyleRoot } from 'radium';
import { useFetchWindowDimensions } from '../hooks/useFetchHostedEvents';

var mapStyles = {
  // xs: state => ({
  //   width: '40%',
  //   height: '25%'
  // })
  width: '100%',
    height: '100%'
   
  };
  const containerStyle = { 
  width: '37%',
  height: '20%'
}

function WindowDimensions(props) {
  const dimensions = useFetchWindowDimensions(props.callbackFn);
  return props.children(dimensions);
}
export class TalkLocationMap extends Component{
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}
        //screenSizeFits: window.matchMedia('(min-width: 500px)').matches    // Shows the InfoWindow to the selected place upon a marker
      };
      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };
    render(){
        return (
            <WindowDimensions>
              { dimensions =>
                <div className='flex grow'>
                 <Map
                        google={window.google}
                       
                        zoom={14}
                        style={mapStyles}
                        containerStyle={{
                          width: dimensions.width <= 768 ? '40%' : '37%' ,
                          height: dimensions.height <= 768 ? '18%' : '20%'
                        }}
                        initialCenter={
                        {
                            lat: -1.2884,
                            lng: 36.8233
                        }
                        }
                 >
                    <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
                 </Map>
              
              
            </div>
              }
            </WindowDimensions>
          )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_KEY
  })(TalkLocationMap);



// import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import '../map.css';
// import LocationPin from '../components/LocationPin';

// const TalkLocationMap = ({coordinates, zoomLevel}) => {
   
//   return (
//     <div>
//         <h2 className="map-h2">Come Visit Us At Our Campus</h2>

//         <div className="google-map">
//         <GoogleMapReact
//             bootstrapURLKeys={{ key: 'AIzaSyDZp2ZYcK6vz_GCgCWk7xVHIgSWZgoz8-8'}}
//             defaultCenter={coordinates}
//             defaultZoom={zoomLevel}
//         >
//         <LocationPin
//             lat={coordinates.lat}
//             lng={coordinates.lng}
//             text={coordinates.address}
//             />
//         </GoogleMapReact>
//         </div>
      
//     </div>
//   )
// }

// export default TalkLocationMap
