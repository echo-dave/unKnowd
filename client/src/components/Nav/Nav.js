import React, { Component, useContext } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserDisplay from "../UserDisplay/UserDisplay";
import UserContext from "../../context/UserContext";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./nav.scss";

//this.context accesses the conextType (UserContext) referenced bottom
class Nav extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="/mainpage">
              <h1 id="title">UnKnowd</h1>
            </a>
            <a
              role="button"
              href="#"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.props.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          {this.context.user ? (
            <div className="navbar-menu">
              <div className="navbar-end">
                {window.location.pathname === "/mainpage" ? (
                  <>
                    <div className="navbar-item" id="viewChanger">
                      <a
                        href="#"
                        className="button is-primary is-small"
                        id="viewChange"
                        onClick={this.props.togglePostEventViews}
                      >
                        {this.props.eventShow ? "View Posts" : "View Events"}
                      </a>
                    </div>
                    <div className="navbar-item" id="postMaker">
                      <a
                        href="#"
                        className="button is-primary is-small"
                        id="formButton"
                        onClick={this.props.togglePostForm}
                      >
                        {this.props.postFormShow ? "Close" : "Add Post"}
                      </a>
                    </div>
                    <div className="navbar-item" id="eventMaker">
                      <a
                        href="#"
                        className="button is-primary is-small"
                        id="makeEvent"
                        onClick={this.props.toggleEventForm}
                      >
                        {this.props.eventFormShow ? "close" : "Add Event"}
                      </a>
                    </div>
                  </>
                ) : null}
                <div className="navbar-item" id="eventMaker">
                  <a
                    href="#"
                    className="button is-primary is-small"
                    id="makeEvent"
                    onClick={this.props.logout}
                  >
                    Logout
                  </a>
                </div>

                <div className="navbar-item userNameDisplay">
                  Welcome back
                  {/* <Link to={{ pathname: "/", state: { user } }}>
                  {this.props.firstName}!
                </Link> */}
                  <Link to="/profile">
                    {this.context.user.photo ? (
                      <UserDisplay creatorPhoto={this.context.user.photo} />
                    ) : (
                      <span className="navUserName">
                        {this.context.user.firstName}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </nav>
      </>
    );
  }
}
Nav.contextType = UserContext;
export default Nav;
