import React, { Component } from "react";
import axios from "axios";
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  displayMarkers = () =>
    this.props.events.map((events, index) => (
      <Marker
        key={index}
        id={index}
        title={events.address}
        position={{
          lat: events.lat,
          lng: events.lon
        }}
        onClick={() =>
          alert(`Event: ${events.title} 
Address:${events.address}
Description: ${events.description}`)
        }
      />
    ));

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        initialCenter={{ lat: 33.753746, lng: -84.38633 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.MAP_API
})(MapContainer);
