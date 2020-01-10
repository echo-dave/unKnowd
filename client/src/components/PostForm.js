import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import axios from "axios";
import socketIOClient from "socket.io-client";

class PostForm extends Component {
  //settting compoent forms initial structure
  state = {
    msg: "",
    creator: this.props.userState.id,
    dateCreated: "",
    photos: ""
  };

  componentDidMount() {
    console.log("post form user", this.props.userState);
  }
  // socket = socketIOClient();

  //this gets the value and name of the inputs that triggered the change
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  fileChangeHandler = event => {
    var file = event.target.files[0];
    // console.log(file);
    this.setState({
      photos: file
    });
  };

  //want to prevent the default of form submit which is to just refresh the page
  submitHandler = e => {
    e.preventDefault();
    // console.log(Auth.getToken());
    let currentDate = new Date();

    let formPostData = new FormData();
    formPostData.set("creator", this.state.creator);
    formPostData.append("photos", this.state.photos);
    formPostData.append("msg", this.state.msg);
    formPostData.append("dateCreated", currentDate);

    // console.log("form data for axios");
    // for (var [key, value] of formPostData.entries()) {
    //   console.log(key, value);
    // }

    this.savePost(formPostData);
  };

  savePost = postData => {
    axios({
      method: "post",
      url: "/api/post",
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        this.props.closeForm();
        // this.setState({
        //   msg: "",
        //   photos: ""
        // });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="postform">
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
          <div className="field">
            <label className="label" htmlFor="photo">
              Photo
            </label>
            <div className="control">
              {/* <span id="imageRemove">X</span> */}
              <input
                className="input"
                name="photo"
                type="file"
                // value={this.state.photos}
                onChange={this.fileChangeHandler}
              />
            </div>
          </div>
          <button className="button is-primary is-small" type="submit">
            Post!
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
