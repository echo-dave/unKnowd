import React from "react";
import axios from "axios";
import Post from "../components/Post";
import Event from "../components/Event";
import Postform from "../components/PostForm";
import authenticatedAxios from "../utils/AuthenticatedAxios";
import EventMap from "../components/Map";
import socketIOClient from "socket.io-client";
import EventForm from "../components/EventForm";

class Mainpage extends React.Component {
  state = {
    posts: [],
    events: [],
    user: "",
    eventShow: false,
    postFormShow: false,
    eventFormShow: false
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
        posts: [post, ...this.state.posts]
      });
    });

    socket.on("new event", event => {
      console.log(event);
      this.setState({
        events: [event, ...this.state.events]
      });
    });

    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        // console.log(response.data);
        this.setUser(response.data);
        // console.log(this.state.user);
      });
    }
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
      .then(res => {
        this.setState({ events: res.data });
        console.log(this.state.events);
      })
      .catch(err => console.log(err));
  };

  togglePostEventViews = () => {
    this.setState({ eventShow: !this.state.eventShow });
  };

  togglePostForm = () => {
    this.setState({ postFormShow: !this.state.postFormShow });
  };

  toggleEventForm = () => {
    this.setState({ eventFormShow: !this.state.eventFormShow });
  };

  render() {
    return (
      <div className="container main">
        <nav>
          <button
            className="button is-primary is-small"
            id="viewChange"
            onClick={this.togglePostEventViews}
          >
            {this.state.eventShow ? "View Posts" : "View Events"}
          </button>
          <button
            className="button is-primary is-small"
            id="formButton"
            onClick={this.togglePostForm}
          >
            {this.state.postFormShow ? "close" : "Make a Post"}
          </button>
          <button
            className="button is-primary is-small"
            id="makeEvent"
            onClick={this.toggleEventForm}
          >
            Add Event
          </button>
        </nav>
        <div>
          {this.state.postFormShow ? (
            <Postform userState={this.state.user} />
          ) : null}

          {this.state.eventFormShow ? (
            <EventForm userState={this.state.user} closeForm={this.eventForm} />
          ) : null}
        </div>
        <div className="columns">
          <div className="column posts">
            {!this.state.eventShow
              ? this.state.posts.map(post => (
                  <Post
                    key={post._id}
                    msg={post.msg}
                    photos={post.photos[0]}
                    firstName={post.creator.firstName}
                    creatorPhoto={post.creator.photo}
                  />
                ))
              : this.state.events.map(event => (
                  <Event key={event._id} eventData={event} />
                ))}
          </div>
          <div className="column events">
            <EventMap />
          </div>
        </div>
      </div>
    );
  }
}

export default Mainpage;
