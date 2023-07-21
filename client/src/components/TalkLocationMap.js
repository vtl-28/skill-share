import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { useFetchWindowDimensions } from "../hooks/useFetchHostedEvents";

var mapStyles = {
  width: "100%",
  height: "100%",
};

function WindowDimensions(props) {
  const dimensions = useFetchWindowDimensions(props.callbackFn);
  return props.children(dimensions);
}
export class TalkLocationMap extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {},
    //screenSizeFits: window.matchMedia('(min-width: 500px)').matches    // Shows the InfoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <WindowDimensions>
        {(dimensions) => (
          <div className="flex grow">
            <Map
              google={window.google}
              zoom={14}
              style={mapStyles}
              containerStyle={{
                width: dimensions.width <= 768 ? "40%" : "37%",
                height: dimensions.height <= 768 ? "18%" : "20%",
              }}
              initialCenter={{
                lat: this.props.addressCoordinates.lat,
                lng: this.props.addressCoordinates.lng,
              }}
            >
              <Marker
                onClick={this.onMarkerClick}
                name={this.props.address}
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
        )}
      </WindowDimensions>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY,
})(TalkLocationMap);
