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
      start: null,
      img: "",
      creator: "",
      preview: ""
    };
  }
  componentDidMount() {
    this.setState({creator: this.props.userState.id, start: new Date()});
    this.clearImageSelect = clearImageSelect.bind(this);
    this.fileChange = fileChange.bind(this);

    if (this.props.eventData) {
      const {eventData} = this.props
      this.setState({
        title: eventData.title,
        description: eventData.description,
        address: eventData.address,
        preview: eventData.img,
        start: new Date(eventData.date.start)
      })
    }
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

    let url;
    let method;
    if (!this.props.eventData){
      method = "post";
      url = "event";
    } else {
      method = "put";
      url = "event/update";
    };
 
    if (this.state.title && this.state.description) {
      let eventData = new FormData();
      eventData.append("title", this.state.title);
      eventData.append("description", this.state.description);
      eventData.append("address", this.state.address);
      eventData.append("date.start", this.state.start);
      if (!this.props.eventData) eventData.append("creator", this.state.creator);
      if (this.state.img != "" || !this.state.img && !this.state.preview) eventData.append("img", this.state.img);
      if (this.props.eventData) eventData.append("eventId", this.props.eventData._id);

      this.props.toggleLoading();

      authenticatedAxios({
        method: method,
        url: `/api/${url}`,
        data: eventData,
        headers: {"Content-Type": "multipart/form-data"}
      }).then(() => {
          if (!this.props.eventShow) this.props.togglePostEventViews();
          this.props.closeForm ? this.props.closeForm() : this.props.editThisEvent();
        })
        .catch(err => {
          console.log(err.response.data.err.json.error_message);
        this.setState({err: err.response.data.err.json.error_message})
        this.props.toggleLoading();
        });
    }
  };

  render() {
    const { title, description, address } = this.state;
    return (
      <div id="eventForm">
        <button className="button close is-smaller" onClick={!this.props.editThisEvent ? this.props.closeForm : this.props.editThisEvent}>
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
            {this.state.err ? <p className="error">{this.state.err}</p> : null }
            <button
              id="submitEvent"
              className="button newPost is-small"
              type="submit"
            >
              {!this.props.eventData ? <>Submit</> : <>Update</>}
            </button>
            {this.props.loading ? <Spinner /> : null}
          </form>
        </div>
      </div>
    );
  }
}

export default EventForm;
