import React, { Component } from "react";
import UserDisplay from "./UserDisplay";
import axios from "axios";
import PostReply from "./PostReply";
import CommentDisplay from "./CommentDisplay";

class Event extends Component {
  state = {
    readComments: false,
    comments: [],
    toggleReply: false,
    user: ""
  };
  componentDidMount() {
    // console.log("eventUser", this.props.eventData);
    this.setState({ user: this.props.userState });
    // setTimeout(() => console.log("props.eventData", this.props.eventData), 500);
  }

  getComments = () => {
    // let id = this.getAttribute("data-id");
    // setTimeout(() => console.log("id", this.props._id), 200);

    axios
      .get("/api/getEventComments", {
        params: { _id: this.props.eventData._id }
      })
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
    const {
      title,
      img,
      description,
      date,
      creator,
      _id
    } = this.props.eventData;
    return (
      <div className="event box clearfix" data-attr={_id}>
        <div className="clearfix">
          <h2>{title}</h2>
          <div className="imageGroup">
            <UserDisplay
              firstName={creator.firstName}
              creatorPhoto={creator.photo}
            />
          </div>
          <div className="postPhotos">
            <img src={img} alt="" />
          </div>
          <p className="description">{description}</p>
          <span className="dates">{date.start}</span>
          <div className="commentingButtons">
            <button
              className="button is-small"
              style={{ marginRight: ".5rem" }}
              onClick={this.toggleReply}
            >
              Reply
            </button>
            <button
              className="button is-small"
              data-id={_id}
              onClick={this.toggleComments.bind(this)}
            >
              Comments
            </button>
          </div>
        </div>
        {this.state.toggleReply ? (
          <PostReply
            userState={this.state.user}
            postId={_id}
            closeForm={this.toggleReply}
            eventShow={this.props.eventShow}
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

export default Event;
