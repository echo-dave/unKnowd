import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div className="post box clearfix" data-attr={this.props._id}>
        <img alt="" className="postPhotos" src={this.props.photos} />
        <p>{this.props.msg}</p>
        <div className="username">{this.props.firstName}</div>
        <img alt="" className="userphoto" src={this.props.creatorPhoto} />
      </div>
    );
  }
}

export default Post;
