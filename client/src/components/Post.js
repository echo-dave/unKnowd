import React, { Component } from "react";

class Post extends Component {
  /*  state = {
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
  }; */

  render() {
    return (
      <div className="posts box">
        <p>{this.props.msg}</p>
        <div className="postPhotos">{this.props.photos}</div>
        <div className="username">{this.props.creator.firstName}</div>
        <div className="userphoto">{this.props.creator.photo}</div>
      </div>
    );
  }
}

export default Post;
