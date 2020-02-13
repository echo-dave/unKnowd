import React, { Component } from "react";
import UserDisplay from "../UserDisplay/UserDisplay";
import "./commentDisplay.scss";
import { urlClick } from "../../utils/ClearImageSelect";
import moment from "moment";

class CommentDisplay extends Component {
  render() {
    const { _id, creator, photos, msg, dateCreated } = this.props.comments;
    return (
      <div className="post comments box clearfix" data-id={_id}>
        <UserDisplay
          firstName={creator.firstName}
          creatorPhoto={creator.photo}
        />
        <span className="timePosted">{moment(dateCreated).fromNow()}</span>

        {photos ? (
          <div className="postPhotos">
            <img alt="" className="commentPhotos" src={photos} />
          </div>
        ) : null}
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
