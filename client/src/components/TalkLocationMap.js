import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

var mapStyles = {
    width: '28%',
    height: '25%'
  };


export class TalkLocationMap extends Component{
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
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
            <div> 
                 <Map
                        google={window.google}
                        zoom={14}
                        style={mapStyles}
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
          )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDZp2ZYcK6vz_GCgCWk7xVHIgSWZgoz8-8'
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
