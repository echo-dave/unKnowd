import React, { Component } from "react";
import UserDisplay from "./UserDisplay";

class CommentDisplay extends Component {
  state = {
    comments: []
  };

  componentDidMount = () => {
    // setTimeout(() => console.log("display", this.props.comments), 500);
  };

  render() {
    const { _id, creator, photos, msg } = this.props.comments;
    return (
      <div className="post comments box clearfix" data-id={_id}>
        <div className="imageGroup">
          <UserDisplay
            firstName={creator.firstName}
            creatorPhoto={creator.photo}
          />
          <img alt="" className="postPhotos" src={photos} />
        </div>
        <p>{msg}</p>
      </div>
    );
  }
}
export default CommentDisplay;
