import React, { Component } from "react";
import "./nav.scss";

class Nav extends Component {
  render() {
    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
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
        {this.props.user ? (
          <div className="navbar-menu">
            <div className="navbar-end">
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
                  {this.props.postFormShow ? "Close" : "Make a Post"}
                </a>
              </div>
              <div className="navbar-item" id="eventMaker">
                <a
                  href="#"
                  className="button is-primary is-small"
                  id="makeEvent"
                  onClick={this.props.toggleEventForm}
                >
                  {this.props.eventFormShow ? "close" : "Make an Event"}
                </a>
              </div>
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
                Welcome back {this.props.firstName}!
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    );
  }
}
export default Nav;
