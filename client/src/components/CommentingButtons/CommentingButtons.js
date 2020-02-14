import React, { Component } from "react";
import Auth from "../../utils/Auth";
import "./CommentingButtons.scss";
class CommentingButtons extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    this.setState({
      loggedIn: Auth.isLoggedIn()
    });
  }

  render() {
    return (
      <>
        {this.state.loggedIn ? (
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
              <div className="commentCount">
                <span> {this.props.replyCount} </span>
              </div>
            </button>
          </div>
        ) : null}
      </>
    );
  }
}

export default CommentingButtons;
