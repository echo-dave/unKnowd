import React from "react";
import axios from "axios";
import Event from "../components/Event";
import EventMap from "../components/Map";
import socketIOClient from "socket.io-client";
import Nav from "../components/Nav/Nav";
import UserContext from "../context/UserContext";


class Viewer extends React.Component {
  state = {
    posts: [],
    events: []
  };

  componentDidMount() {
    let bodyHeight = window.innerHeight;
    this.resizeVh(bodyHeight);
    window.addEventListener("resize", this.resizeVh.bind(this));

    this.getPosts();
    this.getEvents();
    const socket = socketIOClient();
    // socket.on("new post", data => console.log(data));

    socket.on("new post", post => {
      this.setState({
        posts: [post, ...this.state.posts]
      });
    });

    socket.on("new event", event => {
      this.setState({
        events: [event, ...this.state.events]
      });
    });
  }

  resizeVh = bodyHeight => {
    bodyHeight = window.innerHeight;
    document.documentElement.style.setProperty(
      "--bodyHeight",
      `${bodyHeight}px`
    );
  };

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => {
        this.setState({ events: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container main">
        <Nav />
        <div className="columns">
          <div className="column posts">
            {this.state.events.map(event => (
              <Event key={event._id} eventData={event} userState={{id:null}} />
            ))}
          </div>
          <div className="column events">
            <EventMap events={this.state.events} mapKey={this.context.mapKey}/>
          </div>
        </div>
      </div>
    );
  }
}
Viewer.contextType = UserContext;
export default Viewer;
