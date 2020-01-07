import React from "react";
import axios from "axios";
import Post from "../components/Post";
import Event from "../components/Event";
import Postform from "../components/PostForm";
// import Nav from "../components/Nav";
import socketIOClient from "socket.io-client";

class Mainpage extends React.Component {
  state = {
    posts: [],
    events: []
  };

  socket = socketIOClient();

  componentDidMount() {
    this.getPosts();
    this.getEvents();

    this.socket.on("new event", event => {
      this.setState({
        events: [event, ...this.state.events]
      });
    });

    this.socket.on("new post", post => {
      this.setState({
        posts: [post, ...this.state.posts]
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => {
        console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container main">
        <div className="columns">
          <div className="column posts">
            {this.state.posts.map(post => (
              <Post
                key={post._id}
                msg={post.msg}
                firstName={post.creator.firstName}
                creatorPhoto={post.creator.photo}
              />
            ))}
          </div>
          <div className="column events">
            {this.state.events.map(event => (
              <Event key={event._id} />
            ))}
          </div>
        </div>
        <Postform />
      </div>
    );
  }
}

export default Mainpage;
