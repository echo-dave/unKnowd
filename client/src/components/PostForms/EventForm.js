import React, { Component } from "react";
// import eventPost from "../utils/EventPost";
import axios from "axios";
import DatePicker from "react-datepicker";
import clearImageSelect from "../../utils/ClearImageSelect";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      address: "",
      lat: "",
      lon: "",
      start: new Date(),
      img: "",
      creator: this.props.userState.id
    };
  }
  componentDidMount() {
    this.clearImageSelect = clearImageSelect.bind(this);
  }

  removeImage = () => {
    this.clearImageSelect("img");
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = date => {
    this.setState({
      start: date
    });
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
          // console.log(this.state.lat);
          // console.log(this.state.lon);

          let eventData = new FormData();
          eventData.append("title", this.state.title);
          eventData.append("description", this.state.description);
          eventData.append("address", this.state.address);
          eventData.append("lat", this.state.lat);
          eventData.append("lon", this.state.lon);
          eventData.append("date.start", this.state.start);
          eventData.append("creator", this.state.creator);
          eventData.append("img", this.state.img);

          axios
            .post("/api/event", eventData)
            .then(() => {
              if (!this.props.eventShow) this.props.togglePostEventViews();
              this.props.closeForm();
            })
            .catch(err => console.log(err.response));
        })
        .catch(error => {
          console.log(error);
        });
    }

    // map stuff
    // axios.get("api/maps").then(function(data2) {
    //   console.log(data2);
    // });
  };

  render() {
    const { title, description, address } = this.state;
    return (
      <div id="eventForm">
        <button className="button is-smaller" onClick={this.props.closeForm}>
          X
        </button>
        <form onSubmit={this.submitHandler}>
          <div className="field">
            <label className="label">Name of event</label>
            <div className="control">
              <input
                className="input"
                type="text"
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
                className="input"
                type="text"
                name="address"
                placeholder="address"
                value={address}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <h1 className="label">Date</h1>
          <DatePicker
            selected={this.state.start}
            onChange={this.handleDateChange}
          />

          <div className="field">
            <label className="label">Description of event</label>
            <div className="control">
              <textarea
                type="text"
                className="textarea"
                rows="3"
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
              {!this.state.img == "" ? (
                <span
                  id="imageRemove"
                  className="imageRemovePopupForms"
                  onClick={this.removeImage}
                >
                  x
                </span>
              ) : null}
              <input
                id="imageSelect"
                className="input"
                name="img"
                type="file"
                // value={this.state.photos}
                onChange={this.fileChangeHandler}
              />
            </div>
          </div>

          <button
            id="submitEvent"
            className="button newPost is-small"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EventForm;
