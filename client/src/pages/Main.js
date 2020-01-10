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
    eventFormShow: false,
    burgerActive: false
  };

  setUser = user => {
    this.setState({ user });
    setTimeout(() => console.log("****STATE", this.state), 100);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        console.log(response);
        this.setUser(response.data);
        // console.log(this.state.user);
      });
    }

    this.getPosts();
    this.getEvents();
    const socket = socketIOClient();
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

  toggleNavbar = () => {
    this.setState({ burgerActive: !this.state.burgerActive });
    if (this.state.burgerActive === false) {
      document.querySelector(".navbar-menu").className += " is-active";
    } else {
      document.querySelector(".navbar-menu").classList.remove("is-active");
    }
  };

  render() {
    return (
      <div className="container main">
        <nav
          className="navbar is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item">
              <h1 id="title">UnKnowd</h1>
            </a>
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item" id="viewChanger">
                <a
                  className="button is-primary is-small"
                  id="viewChange"
                  onClick={this.togglePostEventViews}
                >
                  {this.state.eventShow ? "View Posts" : "View Events"}
                </a>
              </div>
              <div className="navbar-item" id="postMaker">
                <a
                  className="button is-primary is-small"
                  id="formButton"
                  onClick={this.togglePostForm}
                >
                  {this.state.postFormShow ? "Close" : "Make a Post"}
                </a>
              </div>
              <div className="navbar-item" id="eventMaker">
                <a
                  className="button is-primary is-small"
                  id="makeEvent"
                  onClick={this.toggleEventForm}
                >
                  {this.state.eventFormShow ? "close" : "Make an Event"}
                </a>
              </div>
              {this.state.user ? (
                <div className="userNameDisplay">
                  Welcome back {this.state.user.firstName}!
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
        <div>
          {this.state.postFormShow ? (
            <Postform
              userState={this.state.user}
              closeForm={this.state.togglePostForm}
            />
          ) : null}

          {this.state.eventFormShow ? (
            <EventForm
              userState={this.state.user}
              closeForm={this.toggleEventForm}
            />
          ) : null}
        </div>
        <div className="columns">
          <div className="column posts">
            {!this.state.eventShow
              ? this.state.posts.map(post => (
                  <Post
                    key={post._id}
                    _id={post._id}
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
