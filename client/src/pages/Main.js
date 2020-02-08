import React from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import Post from "../components/Post";
import Event from "../components/Event";
import Postform from "../components/PostForms/PostForm";
import authenticatedAxios from "../utils/AuthenticatedAxios";
import EventMap from "../components/Map";
import io from "socket.io-client";
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
    burgerActive: false,
    mapShow: true,
    comment: false,
    loading: true
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

    let bodyHeight = window.innerHeight;
    this.resizeVh(bodyHeight);
    window.addEventListener("resize", this.resizeVh.bind(this));

    this.getPosts();
    this.getEvents();
    const socket = io();
    // socket.on("new post", data => console.log(data));

    socket.on("new post", post => {
      // console.log(post);
      this.setState({
        posts: [post, ...this.state.posts],
        loading: false
      });
    });

    socket.on("new event", event => {
      // console.log(event);
      this.setState({
        events: [event, ...this.state.events],
        loading: false
      });
    });

    socket.on("new comment", comment => {
      if (comment.post) {
        this.getPosts();
      }
      if (comment.event) {
        this.getEvents();
      }
    });
  }

  resizeVh = bodyHeight => {
    bodyHeight = window.innerHeight;
    // bodyHeight = window.innerHeight;
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
        // console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err.resoponse));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => {
        this.setState({ events: res.data });
        // console.log(this.state.events);
      })
      .catch(err => console.log(err.resoponse));
  };

  togglePostEventViews = () => {
    this.setState({ eventShow: !this.state.eventShow, burgerActive: false });
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  togglePostForm = () => {
    this.setState({
      postFormShow: !this.state.postFormShow,
      eventFormShow: false,
      burgerActive: false
    });
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  toggleEventForm = () => {
    this.setState({
      eventFormShow: !this.state.eventFormShow,
      postFormShow: false,
      burgerActive: false
    });
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  toggleNavbar = () => {
    if (this.state.burgerActive === false) {
      document.querySelector(".navbar-menu").className += " is-active";
    } else {
      document.querySelector(".navbar-menu").classList.remove("is-active");
    }
    this.setState({ burgerActive: !this.state.burgerActive });
  };

  toggleMapMobile = () => {
    let postHeight = window.innerHeight + "px";
    if (window.innerWidth < 769 && this.state.mapShow === true) {
      document
        .querySelector(".column.posts")
        .setAttribute("style", `height:calc(${postHeight} - 4rem)`);
    } else {
      document
        .querySelector(".column.posts")
        .setAttribute("style", `height:calc(${postHeight} * .6 - 5rem)`);
    }
    this.setState({ mapShow: !this.state.mapShow });
    this.toggleNavbar();
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
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
          postFormShow={this.state.postFormShow}
          eventFormShow={this.state.eventFormShow}
          toggleNavbar={this.toggleNavbar}
          toggleMapMobile={this.toggleMapMobile}
        />

        <div>
          {this.state.postFormShow ? (
            <Postform
              loading={this.state.loading}
              toggleLoading={this.toggleLoading}
              userState={this.state.user}
              closeForm={this.togglePostForm}
            />
          ) : null}

          {this.state.eventFormShow ? (
            <EventForm
              loading={this.state.loading}
              toggleLoading={this.toggleLoading}
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
                    loading={this.state.loading}
                    toggleLoading={this.toggleLoading}
                  />
                ))
              : this.state.events.map(event => (
                  <Event
                    key={event._id}
                    eventData={event}
                    eventShow={this.state.eventShow}
                    userState={this.context.user}
                    replyCount={event.replies.length}
                    loading={this.state.loading}
                    toggleLoading={this.toggleLoading}
                  />
                ))}
          </div>
          {window.innerWidth <= 768 && !this.state.mapShow ? null : (
            <div className="column events">
              <EventMap events={this.state.events} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
Mainpage.contextType = UserContext;
export default Mainpage;
