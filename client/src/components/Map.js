import React, { Component } from "react";
import axios from "axios";

import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  componentDidMount() {
    axios.get("/api/all").then(data => {
      console.log(data.data);
      this.setState({ events: data.data });
    });
  }
  displayMarkers = () =>
    this.state.events.map((events, index) => (
      <Marker
        key={index}
        id={index}
        title={events.address}
        position={{
          lat: events.lat,
          lng: events.lon
        }}
        onClick={() =>
          alert(`Title of the event: ${events.title} 
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
  apiKey: "AIzaSyAePGrHhmiuMqr9vOL5PxtJpvSNsYjEnDk"
})(MapContainer);

// class Main extends React.Component {
//   state = {
//     isRegister: false
//   };
//   changeForm = () => {
//     this.setState({ isRegister: !this.state.isRegister });
//   };
//   render() {
//     const { isRegister } = this.state;
//     return (
//       <>
//         <div class="container">
//           <div class="columns is-centered is-vcentered">
//             <div class="column is-narrow">
//               <h1>Hi, this is the main site</h1>

//               <a href="/event">Create a new post</a>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
