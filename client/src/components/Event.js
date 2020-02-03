import React, { Component } from "react";
import moment from "moment";
import UserDisplay from "./UserDisplay/UserDisplay";
import PostReply from "./PostForms/PostReply";
import CommentDisplay from "./CommentDisplay/CommentDisplay";
import CommentingButtons from "./CommentingButtons/CommentingButtons";

class Event extends Component {
  state = {
    readComments: false,
    toggleReply: false,
    user: "",
    replyCount: ""
  };

  toggleComments = () => {
    this.setState({ readComments: !this.state.readComments });
  };

  toggleReply = () => {
    this.setState({ toggleReply: !this.state.toggleReply });
  };

  render() {
    const {
      title,
      address,
      img,
      description,
      date,
      creator,
      _id,
      replies
    } = this.props.eventData;
    return (
      <div className="event box clearfix" data-attr={_id}>
        <div>
          <h2>{title}</h2>
          <h3>
            {address} | {moment(date.start).format("MMM Do YYYY")}
          </h3>
          <UserDisplay
            firstName={creator.firstName}
            creatorPhoto={creator.photo}
          />
          {img ? (
            <div className="postPhotos">
              <img src={img} alt="" />
            </div>
          ) : null}
          <p className={!img == "" ? "clearRight description" : "description"}>
            {description}
          </p>
          {/* <span className="dates">
            {moment(date.start).format("MMM Do YYYY")}
          </span> */}
          <CommentingButtons
            dataId={_id}
            toggleComments={this.toggleComments}
            toggleReply={this.toggleReply}
            replyCount={this.props.replyCount}
          />
        </div>
        {this.state.toggleReply ? (
          <PostReply
            userState={this.props.userState}
            postId={_id}
            closeForm={this.toggleReply}
            eventShow={this.props.eventShow}
            // refreshComments={this.refreshComments}
          />
        ) : null}
        {this.state.readComments
          ? replies.map(comment => (
              <CommentDisplay key={comment.dateCreated} comments={comment} />
            ))
          : null}
      </div>
    );
  }
}

export default Event;
