import React, { Component } from "react";

class UserDisplay extends Component {
  render() {
    return (
      <div className="userInfoDisplay">
        <div
          className="userphoto"
          style={{ backgroundImage: `url(${this.props.creatorPhoto})` }}
        ></div>
        <div className="username">{this.props.firstName}</div>
      </div>
    );
  }
}

export default UserDisplay;
