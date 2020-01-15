import React, { Component } from "react";
import UserDisplay from "./UserDisplay/UserDisplay";
import axios from "axios";
import PostReply from "./PostReply";
import CommentDisplay from "./CommentDisplay/CommentDisplay";
import CommentingButtons from "./CommentingButtons/CommentingButtons";
// import socketIOClient from "socket.io-client";

class Post extends Component {
  state = {
    readComments: false,
    comments: [],
    toggleReply: false,
    user: "",
    replyCount: ""
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        user: this.props.userState,
        comments: this.props.postData.replies,
        replyCount: this.props.replyCount
      });
    }, 50);
  };

  getComments = () => {
    // let id = this.getAttribute("data-id");
    // setTimeout(() => console.log("id", this.props._id), 200);

    axios
      .get("/api/getComments", { params: { _id: this.props.postData._id } })
      .then(comments => {
        console.log("comment.data", comments.data);
        this.setState({
          comments: comments.data,
          replyCount: comments.data.length
        });
        // console.log("comment data", this.state.comments);
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

  refreshComments = () => {
    this.getComments();
  };

  render() {
    return (
      <div className="post box clearfix" data-id={this.props.postData._id}>
        <div>
          <div className="clearfix">
            <div
              className={
                !this.props.postData.photos[0] == "" ? "clearfix" : null
              }
            >
              <UserDisplay
                firstName={this.props.postData.creator.firstName}
                creatorPhoto={this.props.postData.creator.photo}
              />
              {!this.props.postData.photos[0] == "" ? (
                <div className="postPhotos">
                  <img alt="" src={this.props.postData.photos} />
                </div>
              ) : null}
            </div>
            <p>{this.props.postData.msg}</p>
          </div>
          <CommentingButtons
            dataId={this.props.postData._id}
            toggleComments={this.toggleComments}
            toggleReply={this.toggleReply}
            replyCount={this.state.replyCount}
          />
        </div>
        {this.state.toggleReply ? (
          <PostReply
            userState={this.state.user}
            postId={this.props.postData._id}
            closeForm={this.toggleReply}
            refreshComments={this.refreshComments}
          />
        ) : null}
        {this.state.readComments
          ? this.state.comments.map(comment => (
              <CommentDisplay key={comment.dateCreated} comments={comment} />
            ))
          : null}
      </div>
    );
  }
}

export default Post;
