import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";

class PostForm extends Component {
  //settting compoent forms initial structure
  state = {
    msg: "",
    creator: "",
    dateCreated,
    photos: ""
  };

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
  };

  render() {
    return (
      <div>
        <form className="event" onSubmit={this.submitHandler}>
          <div className="field">
            <h1>Post</h1>
            <input
              type="text"
              name="msg"
              value={this.state.msg}
              onChange={this.changeHandler}
            />
          </div>
          <div className="field">
            <h1>Photos</h1>
            <input
              type="image"
              name="photos"
              value={this.state.photos}
              onChange={this.changeHandler}
            />
          </div>
          <button className="button is-primary is-small" type="submit">
            Post!
          </button>
        </form>
      </div>
    );
  }
}
