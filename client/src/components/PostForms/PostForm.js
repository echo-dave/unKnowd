import React, { Component } from "react";
import authenticatedAxios from "../../utils/AuthenticatedAxios"
import { clearImageSelect, fileChange } from "../../utils/ClearImageSelect";
import PhotoInput from "../PhotoInput/PhotoInput";
import "./styles.scss";
import Spinner from "../Spinner/Spinner";

class PostForm extends Component {
  //settting compoent forms initial structure
  state = {
    msg: "",
    creator: "",
    dateCreated: "",
    photos: "",
    preview: ""
  };

  componentDidMount() {
    this.setState({creator: this.props.userState.id});
    this.clearImageSelect = clearImageSelect.bind(this);
    this.fileChange = fileChange.bind(this);

    if (this.props.postData){
      this.setState({
        msg: this.props.postData.msg,
        preview: this.props.postData.photos[0]
      })
    }
  }
  // socket = socketIOClient();
  fileChangeHandler = event => this.fileChange(event, "photos");

  removeImage = () => {
    this.clearImageSelect("photos");
  };

  //this gets the value and name of the inputs that triggered the changes
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  //want to prevent the default of form submit which is to just refresh the page
  submitHandler = e => {
    e.preventDefault();
    let currentDate = new Date();

    let url;
    let method;
    let date;
    if (!this.props.postData) {
      date = "dateCreated";
      url = "post";
      method = "post";
    } else {
      date = "lastEdit"
      url = "post/update";
      method = "put";
    };

    let formPostData = new FormData();
    if (!this.props.postData) formPostData.set("creator", this.state.creator);
    if (this.state.photos != "" || !this.state.photos && !this.state.preview) formPostData.append("photos", this.state.photos);
    formPostData.append("msg", this.state.msg);
    formPostData.append( date , currentDate);
    if (this.props.postData) formPostData.append("postId", this.props.postData._id);

    // console.log("form data for axios");
    // for (var [key, value] of formPostData.entries()) {
    //   console.log(key, value);
    // }
    this.props.toggleLoading();
    this.savePost(formPostData, url, method);
  };

  savePost = (postData, url, method) => {
    authenticatedAxios({
      method: method,
      url: `/api/${url}`,
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        this.props.toggleLoading();
        this.props.closeForm ? this.props.closeForm() : this.props.editThisPost();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="postForm">
        <button className="button close is-smaller" onClick={!this.props.editThisPost ? this.props.closeForm : this.props.editThisPost}>
          X
        </button>
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
              className="textarea clearfix"
              name="msg"
              value={this.state.msg}
              onChange={this.changeHandler}
            />
            <button
              id="submitPost"
              className="button newPost is-small"
              type="submit"
            >
              {!this.props.postData ? <>Post!</> : <>Update!</> }
            </button>
            {this.props.loading ? <Spinner /> : null}
          </form>
        </div>
      </div>
    );
  }
}

export default PostForm;
