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
    parrentComment: "",
    preview: ""
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

  fileChangeHandler = e => {
    let file = e.target.files[0];
    this.setState({
      photos: file
    });
    this.preview(file);

  };

  preview = (file) => {
    let preview = {};
    let previewTemp = document.createElement("img");
    previewTemp.file = file;
    // console.log(previewTemp.file);
    
    const reader = new FileReader();
    reader.onload = (function(aImg){ return function(e) { 
      aImg.src =  e.target.result;
      this.setState({preview: aImg.src});
      };
    })(preview).bind(this);
    reader.readAsDataURL(file);

  //  console.log(previewTemp);
    // document.querySelector("#previewDiv").appendChild(previewTemp)
   
    this.setState({preview:preview.src});
  };

  //want to prevent the default of form submit which is to just refresh the page
  submitHandler = e => {
    e.preventDefault();
    if (!this.state.msg) {
    console.log("What did you want to say?");
    return;
  };

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

    axios({
      method: "post",
      url: `/api/${route}`,
      data: postData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        this.props.toggleLoading();
        this.props.closeForm();
      })
      .catch(err => console.log(err));
  };

  // savePost = postData => {

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
              className="clearfix"
              name="msg"
              value={this.state.msg}
              onChange={this.changeHandler}
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
      </div>        
    );
  };
}

export default PostForm;
