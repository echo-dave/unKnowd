import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import moment from "moment";

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  displayMarkers = (google) => 
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
        label={{ 
          text: events.title,
          color: "#f19203",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          fontSize: "14px"
        }}
        icon={{url:"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          labelOrigin: {
            x: 15,
            y: -15
          },
          scaledSize: new google.maps.Size(45,45)
        }}
      />
    ));
      

    //asynchronis loading seems to mean the data loads, but no markers.
    staticMarkers = (google) => 
      this.props.markers.map((events, index) => (
        <Marker
        key={index}
        id={index}
        title={events.name}
        // description="{events.description}"
        // address="Goat Farm"
        position={{
          lat: events.position.lat,
          lng: events.position.lng
        }}
        // date="none"
        onClick={this.onMarkerClick}
        icon={{url:"/img/info-i_maps.png",
          labelOrigin:{
            x: 15,
            y: 30
          },
          scaledSize: new google.maps.Size(25,25)
        }}
        label={{
          text: events.name,
          color: "#0080a7",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          fontSize: "14px"
        }}
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
      <>
      {this.props.mapKey ? 
      <Map
        google={this.props.google}
        zoom={17}
        initialCenter={{ lat: 33.785678, lng: -84.416687 }}
        onClick={this.onMapClicked}
      >
        {this.displayMarkers(this.props.google)}
        
        {this.props.markers ? this.staticMarkers(this.props.google) : null }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1 className="title is-4" style={{ marginBottom: ".5rem" }}>
              {this.state.selectedPlace.name}
            </h1>
            {this.state.selectedPlace.date ? <p className="is-size-7">{moment (this.state.selectedPlace.date).format("ddd MMM Do YYYY")}</p> : null }
            <div className="is-size-6">
              <p>
                {this.state.selectedPlace.address ? <>
                <span className="has-text-weight-bold">Where: </span>
                {this.state.selectedPlace.address} <br /> </>
                : null }
                {this.state.selectedPlace.description ?  <><span className="has-text-weight-bold">What: </span>
              {this.state.selectedPlace.description} </> : null }
              </p>
            </div>
          </div>
        </InfoWindow>
      </Map>
      :  <h1>Loading...</h1>}
      </>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.mapKey
}))(MapContainer);