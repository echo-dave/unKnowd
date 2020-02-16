import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import moment from "moment";
import Axios from "axios";

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  displayMarkers = () =>
    this.props.events.map((events, index) => (
      <Marker
        key={events._id}
        id={events._id}
        title={events.title}
        description={events.description}
        address={events.address}
        position={{
          lat: events.lat,
          lng: events.lon
        }}
        date={events.date.start}
        onClick={this.onMarkerClick}
        name={events.title}
      />
    ));

    //asynchronis loading seems to mean the data loads, but no markers.
    staticMarkers = () => 
      this.props.markers.map((events, index) => (
        <Marker
        key={index}
        id={index}
        title={events.name}
        // description="{events.description}"
        address="Goat Farm"
        position={{
          lat: events.position.lat,
          lng: events.position.lng
        }}
        // date="none"
        onClick={this.onMarkerClick}
        icon="/img/info-i_maps.png"
        name={events.name}
      />
      ));
    

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={18}
        initialCenter={{ lat: 33.7859878, lng: -84.4162648 }}
        onClick={this.onMapClicked}
      >
        {this.displayMarkers()}
        
        {this.props.markers ? this.staticMarkers() : null }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1 className="title is-4" style={{ marginBottom: ".5rem" }}>
              {this.state.selectedPlace.name}
            </h1>
            {this.state.selectedPlace.date ?  <p className="is-size-7">{moment (this.state.selectedPlace.date).format("ddd MMM Do YYYY")}</p> : null }
            <div className="is-size-6">
              <p>
                <span className="has-text-weight-bold">Where: </span>
                {this.state.selectedPlace.address} <br />
                {this.state.selectedPlace.description ?  <><span className="has-text-weight-bold">What: </span>
              {this.state.selectedPlace.description} </> : null }
              </p>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.mapKey
}))(MapContainer);