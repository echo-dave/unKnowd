import React, { Component } from "react";
import UserDisplay from "../UserDisplay/UserDisplay";
import "./commentDisplay.scss";
import { urlClick } from "../../utils/ClearImageSelect";

class CommentDisplay extends Component {
  render() {
    const { _id, creator, photos, msg } = this.props.comments;
    return (
      <div className="post comments box clearfix" data-id={_id}>
        <UserDisplay
          firstName={creator.firstName}
          creatorPhoto={creator.photo}
        />
        {photos ? <img alt="" className="postPhotos" src={photos} /> : null}
        <p
          className={!photos == "" ? "clearRight description" : "description"}
          dangerouslySetInnerHTML={{
            __html: urlClick(msg)
          }}
        />
      </div>
    );
  }
}
export default CommentDisplay;
