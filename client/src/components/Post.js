import React, { Component } from "react";
import UserDisplay from "./UserDisplay/UserDisplay";
import axios from "axios";
import PostReply from "./PostReply";
import CommentDisplay from "./CommentDisplay/CommentDisplay";

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
    // setTimeout(() => console.log("id", this.props._id), 200);

    axios
      .get("/api/getComments", { params: { _id: this.props._id } })
      .then(comments => {
        // console.log("comment", comments.data);
        this.setState({ comments: comments.data });
        // console.log(this.state.comments);
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
        <div>
          <div className="clearfix">
            <div className={this.props.photos ? "clearfix" : null}>
              <UserDisplay
                firstName={this.props.firstName}
                creatorPhoto={this.props.creatorPhoto}
              />
              {this.props.photos ? (
                <div className="postPhotos">
                  <img alt="" src={this.props.photos} />
                </div>
              ) : null}
            </div>
            <p>{this.props.msg}</p>
          </div>
          <div className="commentingButtons">
            <button
              className="button is-smaller"
              style={{ marginRight: ".5rem" }}
              onClick={this.toggleReply}
            >
              Reply
            </button>
            <button
              className="button is-smaller"
              data-id={this.props._id}
              onClick={this.toggleComments.bind(this)}
            >
              Comments
            </button>
          </div>
        </div>
        {this.state.toggleReply ? (
          <PostReply
            userState={this.state.user}
            postId={this.props._id}
            closeForm={this.toggleReply}
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
