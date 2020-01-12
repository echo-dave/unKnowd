import React, { Component } from "react";
import UserDisplay from "./UserDisplay";
import axios from "axios";
import PostReply from "./PostReply";

class Post extends Component {
  state = {
    readComments: false,
    comments: [],
    toggleReply: false,
    user: ""
  };

  componentDidMount = () => {
    this.setState({ user: this.props.userState });
  };

  getComments = () => {
    // let id = this.getAttribute("data-id");
    console.log("id", this.props._id);

    axios
      .get("/api/getComments", { params: { _id: this.props._id } })
      .then(comments => {
        console.log("comment", comments.data);
        this.setState({ comments: comments.data });
        console.log(this.state.comments);
      });
  };

  toggleComments = () => {
    this.setState({ readComments: !this.state.readComments });
    this.state.readComments
      ? (this.setState.comments = [])
      : this.getComments();
  };

  toggleReply = () => {
    this.setState({ toggleReply: !this.state.toggleReply });
  };

  render() {
    return (
      <div className="post box clearfix" data-id={this.props._id}>
        <div className="imageGroup">
          <UserDisplay
            firstName={this.props.firstName}
            creatorPhoto={this.props.creatorPhoto}
          />
          <img alt="" className="postPhotos" src={this.props.photos} />
        </div>
        <p>{this.props.msg}</p>
        <button onClick={this.toggleReply}>Reply</button>
        <button
          data-id={this.props._id}
          onClick={this.toggleComments.bind(this)}
        >
          Comments
        </button>

        {this.state.toggleReply ? (
          <PostReply
            userState={this.state.user}
            postId={this.props._id}
            closeForm={this.toggleReply}
          />
        ) : null}
      </div>
    );
  }
}

export default Post;
