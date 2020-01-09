import React, { Component } from "react";
import eventPost from "../utils/EventPost";
import axios from "axios";

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      address: "",
      lat: "",
      lon: "",
      start: "",
      end: "",
      img: "",
      creator: this.props.userState.id
    };
  }
  componentDidMount() {
    console.log("post form user", this.props.userState);
    console.log("creator state", this.state.creator);
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileChangeHandler = event => {
    var file = event.target.files[0];
    // console.log(file);
    this.setState({
      img: file
    });
  };

  submitHandler = e => {
    e.preventDefault();

    if (this.state.title && this.state.description) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${this.state.address}&key=73b2bdf763ad428694bf092b08ad995d&language=es&pretty=1`
        )
        .then(data => {
          console.log(data);
          this.setState({
            lat: data.data.results[0].geometry.lat,
            lon: data.data.results[0].geometry.lng
          });
          console.log(this.state.lat);
          console.log(this.state.lon);

          let eventData = new FormData();
          eventData.append("title", this.state.title);
          eventData.append("description", this.state.description);
          eventData.append("address", this.state.address);
          eventData.append("lat", this.state.lat);
          eventData.append("lon", this.state.lon);
          eventData.append("date.start", this.state.start);
          eventData.append("date.end", this.state.end);
          eventData.append("creator", this.state.creator);
          eventData.append("img", this.state.img);

          console.log("event data", eventData);

          axios
            .post("/api/event", eventData)
            .then(() =>
              this.setState({
                title: "",
                description: "",
                address: "",
                lat: "",
                lon: "",
                start: "",
                end: ""
              })
            )
            .catch(err => console.log(err));

          // eventPost(
          //   this.state.title,
          //   this.state.description,
          //   this.state.address,
          //   this.state.lat,
          //   this.state.lon,
          //   this.state.start,
          //   this.state.end,
          //   response => {
          //     this.context.setUser(response);
          //     console.log(response);
          //     this.props.history.push("/");
          //   }
          // );
        })
        .catch(error => {
          console.log(error);
        });
    }

    axios.get("api/all").then(function(data2) {
      console.log(data2);
    });
  };

  render() {
    const { title, description, address, start, end } = this.state;
    return (
      <div id="eventForm">
        <form onSubmit={this.submitHandler}>
          <div className="field">
            <label className="label">Name of event</label>
            <div className="control">
              <input
                type="text"
                className="control"
                name="title"
                placeholder="Title of the event"
                value={title}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Address of event</label>
            <div className="control">
              <input
                type="text"
                name="address"
                placeholder="address"
                value={address}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="start">
              Start Date
            </label>
            <div className="control">
              <input
                type="date"
                name="start"
                value={start}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="end">
              End Date
            </label>
            <div className="control">
              <input
                type="date"
                name="end"
                value={end}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description of event</label>
            <div className="control">
              <textarea
                type="text"
                className="textarea"
                name="description"
                placeholder="Description of the event"
                value={description}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="img">
              Photo
            </label>
            <div className="control">
              <span id="imageRemove">X</span>
              <input
                className="input"
                name="img"
                type="file"
                // value={this.state.photos}
                onChange={this.fileChangeHandler}
              />
            </div>
          </div>

          <button className="button is-primary is-small" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EventForm;
