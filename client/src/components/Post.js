import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div className="post box clearfix" data-attr={this.props._id}>
        <img alt="" className="postPhotos" src={this.props.photos} />
        <p>{this.props.msg}</p>
        <div className="username">{this.props.firstName}</div>
        <div
          className="userphoto"
          style={{ backgroundImage: `url(${this.props.creatorPhoto})` }}
        ></div>
      </div>
    );
  }
}

export default Post;
