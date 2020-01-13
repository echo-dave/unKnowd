import React, { Component } from "react";

class CommentingButtons extends Component {
  render() {
    return (
      <div className="commentingButtons">
        <button
          className="button is-smaller"
          style={{ marginRight: ".5rem" }}
          onClick={this.props.toggleReply}
        >
          Reply
        </button>
        <button
          className="button is-smaller"
          data-id={this.props.dataId}
          onClick={this.props.toggleComments}
        >
          Comments
        </button>
      </div>
    );
  }
}

export default CommentingButtons;
