import React from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import EditToggle from "../../components/EditToggle";
import Postform from "../../components/PostForms/PostForm";
import authenticatedAxios from "../../utils/AuthenticatedAxios";
import EventMap from "../../components/Map";
import io from "socket.io-client";
import EventForm from "../../components/PostForms/EventForm";
import Auth from "../../utils/Auth";
import Nav from "../../components/Nav/Nav";
import "./main.scss";

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
    loading: false,
    page: 1
  };

  setUser = user => {
    this.setState({ user });
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
    this.resize(bodyHeight);
    window.addEventListener("resize", this.resize.bind(this));

    if (window.innerWidth < 769) this.toggleMapMobile();

    this.getPosts();
    this.getEvents();
    const socket = io();

    socket.on("new post", post => {
      if (!post.updatePost){
      this.setState({
        posts: [post, ...this.state.posts],
        loading: false
      })} else {
        this.setState({loading: false});
        this.getPosts();
      }
    });

    socket.on("new event", event => {
      if (!event.updateEvent){
      this.setState({
        events: [event, ...this.state.events],
        loading: false
      })} else {
        this.setState({loading: false});
        this.getEvents();
      }
    });

    socket.on("new comment", comment => {
      if (comment.post) {
        this.setState({loading: false});
        this.getPosts();
      }
      if (comment.event) {
        this.setState({loading: false});
        this.getEvents();
      }
    });
  }

  resize = bodyHeight => {
    bodyHeight = window.innerHeight;
    document.documentElement.style.setProperty(
      "--bodyHeight",
      `${bodyHeight}px`
    );
    if (window.innerWidth > 768) {
      document.querySelector(".column.posts").removeAttribute("style")
      this.setState({mapShow: true})
    }
  };

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  incrementPostPage =() => {
    console.log(this.state.posts);
    authenticatedAxios
    .get(`/api/posts/${this.state.page + 1}`)
    .then(page => {
      console.log(page.data);
      let newPage = [...this.state.posts, ...page.data.posts];
      console.log("newPage ",newPage);
      this.setState({ posts: newPage, page: this.state.page + 1 });
    })
    .catch(err => console.log(err));
  }
  getPosts = () => {
    authenticatedAxios
      .get(`/api/posts/${this.state.page}`)
      .then(res => {
        this.setState({ posts: res.data.posts, postPages: Math.ceil(res.data.count / 20), postCount: res.data.count });
      })
      .catch(err => console.log(err.resoponse));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => {
        this.setState({ events: res.data });
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
    if (this.state.postFormShow === false) this.scrollTop();
    document.querySelector(".navbar-menu").classList.remove("is-active");
  };

  toggleEventForm = () => {
    this.setState({
      eventFormShow: !this.state.eventFormShow,
      postFormShow: false,
      burgerActive: false
    });
    if (this.state.eventFormShow === false) this.scrollTop();
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
        .setAttribute("style", `height:calc(${postHeight} - 3.5rem)`);
    } else {
      document
        .querySelector(".column.posts")
        .setAttribute("style", `height:calc(${postHeight} * .6 - 5rem)`);
    }
    this.setState({ mapShow: !this.state.mapShow });
    if (this.state.burgerActive) this.toggleNavbar();
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  logout = () => {
    Auth.logOut(() => (window.location = "/"));
  };

  scrollTop =() => document.querySelector(".column.posts").scrollTop = 0;


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
          mapShow={this.state.mapShow}
          scrollTop={this.scrollTop}
        />

       
        <div className="columns">
          <div className="column posts">
            
            {this.state.postFormShow ? (
              <Postform
                loading={this.state.loading}
                toggleLoading={this.toggleLoading}
                userState={this.state.user}
                closeForm={this.togglePostForm}
                eventShow={this.state.eventShow}
                togglePostEventViews={this.togglePostEventViews}
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
          
            {!this.state.eventShow ?
               this.state.posts.map(post => (
                //  Show posts
                  <EditToggle
                    key={post._id}
                    postData={post}
                    userState={this.state.user}
                    replyCount={post.replies.length}
                    loading={this.state.loading}
                    toggleLoading={this.toggleLoading}
                  />
                ))
              : this.state.events.map(event => (
                  // show events
                  <EditToggle
                    key={event._id}
                    eventData={event}
                    eventShow={this.state.eventShow}
                    userState={this.context.user}
                    replyCount={event.replies.length}
                    loading={this.state.loading}
                    toggleLoading={this.toggleLoading}
                  />
                ))}
                {this.state.postPages > this.state.page && !this.state.eventShow ? 
                <button className="more button is-small" onClick={this.incrementPostPage}>More Posts</button> 
                : null}
          </div>
          {window.innerWidth <= 768 && !this.state.mapShow ? null : (
            <div className="column events">
              <EventMap
                events={this.state.events}
                mapKey={this.context.mapKey}
                markers={this.props.markers}

              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
Mainpage.contextType = UserContext;
export default Mainpage;
