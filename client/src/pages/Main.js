import React from "react";
import Post from "../components/Post";
import Event from "../componets/Event";
import Nav from "../components/Nav";
import socketIOClient from "socket.io-client";

class Mainpage extends React.Component {
  state = {
    posts: [],
    events: []
  };

  componentDidMount() {
    this.getPosts();
    this.getEvents();
  }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .cach(err => console.log(err));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <Nav />
        {this.state.posts.map(post => (
          <Post key={post._id} />
        ))}
        {this.state.events.map(event => (
          <Event key={event._id} />
        ))}
      </>
    );
  }
}
