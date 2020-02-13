import React, { Component } from "react";
import moment from "moment";
import UserDisplay from "./UserDisplay/UserDisplay";
import PostReply from "./PostForms/PostReply";
import CommentDisplay from "./CommentDisplay/CommentDisplay";
import CommentingButtons from "./CommentingButtons/CommentingButtons";
import { urlClick } from "../utils/ClearImageSelect";

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
          <h3 className="address">
          {moment(date.start).format("ddd MMM Do YYYY")} @ {address}
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
          <p
            className={!img == "" ? "clearRight description" : "description"}
            dangerouslySetInnerHTML={{
              __html: urlClick(description)
            }}
          />
          <CommentingButtons
            dataId={_id}
            toggleComments={this.toggleComments}
            toggleReply={this.toggleReply}
            replyCount={this.props.replyCount}
          />
        </div>
        {this.state.toggleReply ? (
          <PostReply
            loading={this.props.loading}
            toggleLoading={this.props.toggleLoading}
            userState={this.props.userState}
            postId={_id}
            closeForm={this.toggleReply}
            eventShow={this.props.eventShow}
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
