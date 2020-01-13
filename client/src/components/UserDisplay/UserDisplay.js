import React, { Component } from "react";
import "./userDisplay.css";

class UserDisplay extends Component {
  render() {
    return (
      <>
        <div
          className="userphoto"
          style={{ backgroundImage: `url(${this.props.creatorPhoto})` }}
        ></div>
        <div className="username">{this.props.firstName}</div>
      </>
    );
  }
}

export default UserDisplay;
