import React from "react";
import axios from "axios";
import Post from "../components/Post";
import Event from "../components/Event";
import Postform from "../components/PostForms/PostForm";
import authenticatedAxios from "../utils/AuthenticatedAxios";
import EventMap from "../components/Map";
import socketIOClient from "socket.io-client";
import EventForm from "../components/PostForms/EventForm";
import Auth from "../utils/Auth";
import Nav from "../components/Nav/Nav";

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
    // setTimeout(() => console.log("****STATE", this.state), 100);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        // console.log(response);
        this.setUser(response.data);
        // console.log(this.state.user);
      });
    }

    this.getPosts();
    this.getEvents();
    const socket = socketIOClient();
    // socket.on("new post", data => console.log(data));

    socket.on("new post", post => {
      // console.log(post);
      this.setState({
        posts: [post, ...this.state.posts]
      });
    });

    socket.on("new event", event => {
      // console.log(event);
      this.setState({
        events: [event, ...this.state.events]
      });
    });
  }

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => {
        // console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => {
        this.setState({ events: res.data });
        // console.log(this.state.events);
      })
      .catch(err => console.log(err));
  };

  togglePostEventViews = () => {
    this.setState({ eventShow: !this.state.eventShow });
    this.setState({ burgerActive: false });
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  togglePostForm = () => {
    this.setState({
      postFormShow: !this.state.postFormShow,
      eventFormShow: false
    });
    this.setState({ burgerActive: false });
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  toggleEventForm = () => {
    this.setState({
      eventFormShow: !this.state.eventFormShow,
      postFormShow: false
    });
    this.setState({ burgerActive: false });
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  toggleNavbar = () => {
    this.setState({ burgerActive: !this.state.burgerActive });
    if (this.state.burgerActive === false) {
      document.querySelector(".navbar-menu").className += " is-active";
    } else {
      document.querySelector(".navbar-menu").classList.remove("is-active");
    }
  };

  logout = () => {
    Auth.logOut(() => (window.location = "/"));
  };

  render() {
    return (
      <div className="container main">
        <Nav
          togglePostEventViews={this.togglePostEventViews}
          eventShow={this.state.eventShow}
          togglePostForm={this.togglePostForm}
          toggleEventForm={this.toggleEventForm}
          logout={this.logout}
          // firstName={this.state.user.firstName}
          // user={this.state.user}
          postFormShow={this.state.postFormShow}
          eventFormShow={this.state.eventFormShow}
          toggleNavbar={this.toggleNavbar}
        />

        <div>
          {this.state.postFormShow ? (
            <Postform
              userState={this.state.user}
              closeForm={this.togglePostForm}
            />
          ) : null}

          {this.state.eventFormShow ? (
            <EventForm
              userState={this.state.user}
              closeForm={this.toggleEventForm}
              eventShow={this.state.eventShow}
              togglePostEventViews={this.togglePostEventViews}
            />
          ) : null}
        </div>
        <div className="columns">
          <div className="column posts">
            {!this.state.eventShow
              ? this.state.posts.map(post => (
                  <Post
                    key={post._id}
                    postData={post}
                    userState={this.state.user}
                    replyCount={post.replies.length}
                  />
                ))
              : this.state.events.map(event => (
                  <Event
                    key={event._id}
                    eventData={event}
                    eventShow={this.state.eventShow}
                    userState={this.state.user}
                    replyCount={event.replies.length}
                  />
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
