import React, { Component } from "react";
import UserDisplay from "./UserDisplay/UserDisplay";
import axios from "axios";
import PostReply from "./PostForms/PostReply";
import CommentDisplay from "./CommentDisplay/CommentDisplay";
import CommentingButtons from "./CommentingButtons/CommentingButtons";

class Event extends Component {
  state = {
    readComments: false,
    comments: [],
    toggleReply: false,
    user: "",
    replyCount: ""
  };
  // componentDidMount() {
  //   // console.log("eventUser", this.props.eventData);
  //   this.setState({ user: this.props.userState });
  //   setTimeout(
  //     () =>
  //       this.setState({
  //         comments: this.props.eventData.replies,
  //         replyCount: this.props.replyCount
  //       }),
  //     100
  //   );
  //   // setTimeout(() => console.log("props.eventData", this.props.eventData), 500);
  // }

  getComments = () => {
    // let id = this.getAttribute("data-id");
    // setTimeout(() => console.log("id", this.props._id), 200);

    axios
      .get("/api/getEventComments", {
        params: { _id: this.props.eventData._id }
      })
      .then(comments => {
        // console.log("comment", comments.data);
        this.setState({
          comments: comments.data,
          replyCount: comments.data.length
        });
        // console.log(this.state.comments);
      });
  };

  refreshComments = () => {
    this.getComments();
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
      _id,
      replies
    } = this.props.eventData;
    return (
      <div className="event box clearfix" data-attr={_id}>
        <div>
          <h2>{title}</h2>
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
          <span className="dates">{date.start}</span>
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
