import React, { Component } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
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
        position={{
          lat: events.lat,
          lng: events.lon
        }}
        onClick={() => console.log("You clicked")}
      />
    ));
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
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

// ------------------

// import React, { Component } from "react";
// import SignUpForm from "./SignUpForm";
// import LoginForm from "./LoginForm";

// import * as parkDate from "../data/events.json";
// import axios from "axios";

// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// class MapContainer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       markers: [
//         { lat: 47.49855629475769, lng: -122.14184416996333 },
//         { latitude: 47.359423, longitude: -122.021071 }
//       ]
//     };
//   }

//   displayMarkers = () => {
//     return this.state.markers.map((marker, index) => {
//       return (
//         <Marker
//           key={index}
//           id={index}
//           position={{
//             lat: marker.latitude,
//             lng: marker.longitude
//           }}
//           onClick={() => console.log("You clicked")}
//         />
//       );
//     });
//   };

//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={8}
//         // style={mapStyles}
//         initialCenter={{ lat: 47.444, lng: -122.176 }}
//       >
//         {this.displayMarkers()}
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAePGrHhmiuMqr9vOL5PxtJpvSNsYjEnDk"
// })(MapContainer);
// ---------------------------------
// const mapStyles = {
//   width: "50%",
//   height: "50%"
// };

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
