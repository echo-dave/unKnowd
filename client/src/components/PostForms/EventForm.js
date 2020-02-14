import React, { Component } from "react";
import authenticatedAxios from "../../utils/AuthenticatedAxios"
import DatePicker from "react-datepicker";
import { clearImageSelect, fileChange } from "../../utils/ClearImageSelect";
import PhotoInput from "../PhotoInput/PhotoInput";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import Spinner from "../Spinner/Spinner";

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
      creator: "",
      preview: ""
    };
  }
  componentDidMount() {
    this.setState({creator: this.props.userState.id});
    this.clearImageSelect = clearImageSelect.bind(this);
    this.fileChange = fileChange.bind(this);
  }
  fileChangeHandler = event => this.fileChange(event, "img");

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

  submitHandler = e => {
    e.preventDefault();

    if (this.state.title && this.state.description) {
      let eventData = new FormData();
      eventData.append("title", this.state.title);
      eventData.append("description", this.state.description);
      eventData.append("address", this.state.address);
      eventData.append("date.start", this.state.start);
      eventData.append("creator", this.state.creator);
      eventData.append("img", this.state.img);

      this.props.toggleLoading();

      authenticatedAxios
        .post("/api/event", eventData)
        .then(() => {
          if (!this.props.eventShow) this.props.togglePostEventViews();
          this.props.closeForm();
        })
        .catch(err => console.log(err.response));
    }
  };

  render() {
    const { title, description, address } = this.state;
    return (
      <div id="eventForm">
        <button className="button close is-smaller" onClick={this.props.closeForm}>
          X
        </button>
        <div className="post box clearfix">
          <form onSubmit={this.submitHandler}>
            {/* title */}
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Title of the event"
              value={title}
              onChange={this.changeHandler}
            />
            <div style={{position:"relative"}}>
              <DatePicker
                selected={this.state.start}
                onChange={this.handleDateChange}
                className="input"
              />

              {/* address */}
              <input
                id="eventAddress"
                className="input"
                type="text"
                name="address"
                placeholder="address"
                value={address}
                onChange={this.changeHandler}
              />
            </div>
            {!this.state.preview == "" ? (
            <div className="postPhotos">
              <img alt="" src={this.state.preview} />
            </div>
              ) : null}
              <PhotoInput
              fileChangeHandler={this.fileChangeHandler}
              removeImage={this.removeImage}
              fileName="img"
              photoFileName={this.state.img.name}
            />

            <textarea
              type="text"
              className="textarea clearfix"
              rows="4"
              name="description"
              placeholder="Description of the event"
              value={description}
              onChange={this.changeHandler}
            />
            {/* <PhotoInput
              fileChangeHandler={this.fileChangeHandler}
              removeImage={this.removeImage}
              fileName="img"
              photoFileName={this.state.img.name}
            /> */}
            <button
              id="submitEvent"
              className="button newPost is-small"
              type="submit"
            >
              Submit
            </button>
            {this.props.loading ? <Spinner /> : null}
          </form>
        </div>
      </div>
    );
  }
}

export default EventForm;
