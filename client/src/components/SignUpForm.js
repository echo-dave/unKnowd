import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";

class SignUpForm extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photo: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  fileChangeHandler = event => {
    var file = event.target.files[0];
    // console.log(file);
    this.setState({
      photo: file
    });
  };
  submitHandler = e => {
    e.preventDefault();
    const { email, password, firstName, lastName, photo } = this.state;

    const userData = new FormData(document.querySelector("#newUserForm"));

    if (email && password && firstName && lastName) {
      Auth.register(email, password, firstName, lastName, photo, response => {
        this.context.setUser(response);
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <form id="newUserForm" onSubmit={this.submitHandler}>
        <div className="field">
          <h1>First Name</h1>
          <input
            type="text"
            name="firstName"
            value={this.state.first}
            onChange={this.changeHandler}
          />
        </div>
        <div className="field">
          <h1>Last Name</h1>
          <input
            type="text"
            name="lastName"
            value={this.state.last}
            onChange={this.changeHandler}
          />
        </div>
        <div className="field">
          <h1>Password (min of 8 characters)</h1>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
        </div>
        <div className="field">
          <h1>Email</h1>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="photo">
            Photo
          </label>
          <div className="control">
            <span id="imageRemove">X</span>
            <input
              className="input"
              name="photo"
              type="file"
              // value={this.state.photo}
              onChange={this.fileChangeHandler}
            />
          </div>
        </div>

        <button className="button is-primary is-small" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}

export default withRouter(SignUpForm);
