import React, { Component } from "react";
import axios from "axios";

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
  }

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
    formPostData.append("commentId", this.state.parrentComment);

    // console.log("form data for axios");
    // for (var [key, value] of formPostData.entries()) {
    //   console.log(key, value);
    // }
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
    console.log("save post reply");

    axios({
      method: "post",
      url: "/api/replyComment",
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        this.props.closeForm();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="postform">
        <button onClick={this.props.closeForm}>X</button>
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
