import React, { Component } from "react";
import axios from "axios";
import { clearImageSelect, fileChange } from "../../utils/ClearImageSelect";
import PhotoInput from "../PhotoInput/PhotoInput";
import "./styles.scss";
import Spinner from "../Spinner/Spinner";

class PostForm extends Component {
  //settting compoent forms initial structure
  state = {
    msg: "",
    creator: this.props.userState.id,
    dateCreated: "",
    photos: "",
    parrentComment: ""
  };

  componentDidMount() {
    this.setState({
      parrentComment: this.props.postId
    });
    this.clearImageSelect = clearImageSelect.bind(this);
    this.fileChange = fileChange.bind(this);
  }
  fileChangeHandler = event => this.fileChange(event, "photo");

  removeImage = () => this.clearImageSelect("photos");

  //this gets the value and name of the inputs that triggered the change
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  fileChangeHandler = event => {
    var file = event.target.files[0];
    this.setState({
      photos: file
    });
  };

  //want to prevent the default of form submit which is to just refresh the page
  submitHandler = e => {
    e.preventDefault();
    let currentDate = new Date();

    let formPostData = new FormData();
    formPostData.set("creator", this.state.creator);
    formPostData.append("photos", this.state.photos);
    formPostData.append("msg", this.state.msg);
    formPostData.append("dateCreated", currentDate);
    formPostData.append("commentId", this.state.parrentComment);

    // console.log("form data for axios");
    // for (var [key, value] of formPostData.entries()) {
    //   console.log(key, value);
    // }

    this.props.toggleLoading();

    this.props.eventShow
      ? this.saveEvent(formPostData)
      : this.savePost(formPostData);
  };

  saveEvent = postData => {
    console.log("save event reply");

    axios({
      method: "post",
      url: "/api/replyEventComment",
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        this.props.closeForm();
      })
      .catch(err => console.log(err));
  };

  savePost = postData => {
    axios({
      method: "post",
      url: "/api/replyComment",
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        // this.props.refreshComments();
        this.props.closeForm();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="postform">
        <button className="button is-smaller" onClick={this.props.closeForm}>
          X
        </button>
        <form className="event" onSubmit={this.submitHandler}>
          <div className="field">
            <label className="label" htmlFor="msg">
              Message
            </label>
            <textarea
              placeholder="message to community"
              type="text"
              rows="3"
              className="textarea"
              name="msg"
              value={this.state.msg}
              onChange={this.changeHandler}
            />
          </div>
          <PhotoInput
            fileChangeHandler={this.fileChangeHandler}
            removeImage={this.removeImage}
            fileName="photos"
            photoFileName={this.state.photos.name}
          />
          <button
            id="replyButton"
            className="button is-primary is-small"
            type="submit"
          >
            Post!
          </button>
          {this.props.loading ? <Spinner /> : null}
        </form>
      </div>
    );
  }
}

export default PostForm;
