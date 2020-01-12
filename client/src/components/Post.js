import React, { Component } from "react";
import UserDisplay from "./UserDisplay";

class Post extends Component {
  render() {
    return (
      <div className="post box clearfix" data-attr={this.props._id}>
        <div className="imageGroup">
          <UserDisplay
            firstName={this.props.firstName}
            creatorPhoto={this.props.creatorPhoto}
          />
          <img alt="" className="postPhotos" src={this.props.photos} />
        </div>
        <p>{this.props.msg}</p>

        {/* <div className="username">{this.props.firstName}</div>
        <div
          className="userphoto"
          style={{ backgroundImage: `url(${this.props.creatorPhoto})` }}
        ></div> */}
      </div>
    );
  }
}

export default Post;
