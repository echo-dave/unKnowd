import React, { Component } from "react";

class Post extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .cach(err => console.log(err));
  };

  render() {
    return (
      <div class="posts box">
        <p>{this.props.msg}</p>
        <div class="postPhotos">{this.props.photos}</div>
        <div class="username">{this.props.creator.firstName}</div>
        <div class="userphoto">{this.props.creator.photo}</div>
      </div>
    );
  }
}

export default Post;
