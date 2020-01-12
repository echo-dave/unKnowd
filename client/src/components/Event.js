import React, { Component } from "react";
import UserDisplay from "./UserDisplay";

class Event extends Component {
  componentDidMount() {
    // console.log(this.props.eventData);
  }

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

        {/* <div className="username">{creator.firstName}</div>
        <div
          className="userphoto"
          style={{ backgroundImage: `url(${creator.photo})` }}
        ></div> */}
      </div>
    );
  }
}

export default Event;
