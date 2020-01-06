import React, { Component } from "react";

class Event extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get("/api/events")
      .then(res => this.setState({ events: res.data }))
      .cach(err => console.log(err));
  };

  render() {
    return (
      <div class="events box">
        <h2>{this.props.title}</h2>
        <div class="postPhotos">{this.props.img}</div>
        <p class="description">{this.props.description}</p>
        <span class="dates">
          {this.props.date.start} - {this.props.date.end}
        </span>
        <div class="username">{this.props.creator.firstName}</div>
        <div class="userphoto">{this.props.creator.photo}</div>
      </div>
    );
  }
}

export default Event;
