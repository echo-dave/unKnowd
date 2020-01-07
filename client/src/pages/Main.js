import React from "react";
import axios from "axios";
import Post from "../components/Post";
import Event from "../components/Event";
import Postform from "../components/PostForm";
import authenticatedAxios from "../utils/AuthenticatedAxios";

// import Nav from "../components/Nav";
import socketIOClient from "socket.io-client";

class Mainpage extends React.Component {
  state = {
    posts: [],
    events: [],
    user: ""
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    this.getPosts();
    this.getEvents();
    const socket = socketIOClient("http://127.0.0.1:3001");
    // socket.on("new post", data => console.log(data));

    socket.on("new post", post => {
      console.log(post);
      this.setState({
        posts: [...this.state.posts, post]
      });
    });

    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        console.log(response.data);
        this.setUser(response.data);
        console.log(this.state.user);
      });
    }

    // this.socket.on("new event", event => {
    //   this.setState({
    //     events: [event, ...this.state.events]
    //   });
    // });

    //
    // this.socket.on("new test", console.log);
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
