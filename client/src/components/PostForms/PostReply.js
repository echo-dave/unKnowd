import React, { Component } from "react";
import authenticatedAxios from "../../utils/AuthenticatedAxios"
import { clearImageSelect, fileChange } from "../../utils/ClearImageSelect";
import PhotoInput from "../PhotoInput/PhotoInput";
import "./styles.scss";
import Spinner from "../Spinner/Spinner";

class ReplyForm extends Component {
  //settting compoent forms initial structure
  state = {
    msg: "",
    creator: "",
    dateCreated: "",
    photos: "",
    parrentComment: "",
    preview: ""
  };

  componentDidMount() {
    this.setState({
      parrentComment: this.props.postId,
      creator: this.props.userState.id
    });
    this.clearImageSelect = clearImageSelect.bind(this);
    this.fileChange = fileChange.bind(this);
  }

  //stores file changes in state and builds preview images
  fileChangeHandler = event => this.fileChange(event, "photos");

  removeImage = () => this.clearImageSelect("photos");

  //this gets the value and name of the inputs that triggered the change
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  //want to prevent the default of form submit which is to just refresh the page
  submitHandler = e => {
    e.preventDefault();
    if (!this.state.msg) {
    console.log("What did you want to say?");
    return;
  }

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

//consolidated to single savePost function. true saves event reply, false saves post reply
    this.props.eventShow
      ? this.savePost(formPostData, "replyEventComment")
      : this.savePost(formPostData, "replyComment");
  };

  savePost = (postData, route) => {

    authenticatedAxios({
      method: "post",
      url: `/api/${route}`,
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        this.props.toggleLoading();
        if (!this.props.readComments) this.props.toggleComments();
        this.props.closeForm();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="replyform">
        {/* <button className="button is-smaller" onClick={this.props.closeForm}>
          X
        </button> */}

        <div className="post box clearfix">
          <form className="event" onSubmit={this.submitHandler}>

            {!this.state.preview == "" ? (
            <div className="postPhotos">
              <img alt="" src={this.state.preview} />
            </div>
              ) : null}
              <PhotoInput
              fileChangeHandler={this.fileChangeHandler}
              removeImage={this.removeImage}
              fileName="photos"
              photoFileName={this.state.photos.name}
            />
             
            <textarea 
              placeholder="message to community"
              type="text"
              rows="4"
              className="clearfix textarea"
              name="msg"
              value={this.state.msg}
              onChange={this.changeHandler}
            />
       
            <button
              id="replyButton"
              className="button newComment is-small"
              type="submit"
            >
            Post!
            </button>
            {this.props.loading ? <Spinner /> : null}
          </form>
        </div>
      </div>        
    );
  }
}

export default ReplyForm;
