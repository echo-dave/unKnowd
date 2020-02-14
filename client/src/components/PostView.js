import React, { Component } from "react";
import UserDisplay from "./UserDisplay/UserDisplay";
import Replyform from "./PostForms/PostReply";
import CommentDisplay from "./CommentDisplay/CommentDisplay";
import CommentingButtons from "./CommentingButtons/CommentingButtons";
import { urlClick } from "../utils/ClearImageSelect";
import moment from "moment";

class PostView extends Component {
  state = {
    readComments: false,
    toggleReply: false,
    replyCount: ""
  };

  toggleComments = () => {
    this.setState({ readComments: !this.state.readComments });
  };

  toggleReply = () => {
    this.setState({ toggleReply: !this.state.toggleReply });
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
              {this.props.userState.id === this.props.postData.creator._id ? <i className="fas fa-edit" onClick={this.props.editThisPost}></i> : null}

              <span className="timePosted">{moment(this.props.postData.dateCreated).fromNow(true)}</span>
              {!this.props.postData.photos[0] == "" ? (
                <div className="postPhotos">
                  <img alt="" src={this.props.postData.photos} />
                </div>
              ) : null}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: urlClick(this.props.postData.msg)
              }}
            />
          </div>
          <CommentingButtons
            dataId={this.props.postData._id}
            toggleComments={this.toggleComments}
            toggleReply={this.toggleReply}
            replyCount={this.props.replyCount}
          />
        </div>
        {this.state.toggleReply ? (
          <Replyform
            loading={this.props.loading}
            toggleLoading={this.props.toggleLoading}
            userState={this.props.userState}
            postId={this.props.postData._id}
            closeForm={this.toggleReply}
            readComments={this.state.readComments}
            toggleComments={this.toggleComments}

          />
        ) : null}
        {this.state.readComments
          ? this.props.postData.replies.map(comment => (
              <CommentDisplay key={comment.dateCreated} comments={comment} />
            ))
          : null}
      </div>
    );
  }
}

export default PostView;
