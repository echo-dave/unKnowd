import React, { Component } from "react";

import axios from "axios";

import Auth from "../utils/Auth";

class UpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      img: "",
      info: ""
    };
  }

  setUser = user => {
    this.setState({ user });
    setTimeout(() => console.log("****STATE", this.state), 100);
  };

  componentDidMount() {
    // console.log("post form user", this.props.userState);
    // console.log("creator state", this.state.creator);
    axios
      .get("/api/findupdate", { query: { user: this.state.info } })
      .then(response => {
        console.log(response);
        this.setState({ info: response.data[0] });
        console.log(this.state.info);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    if (this.state.email) {
      Auth.update(
        this.state.email,
        this.state.firstName,
        this.state.lastName,

        response => {
          this.context.setUser(response);
          this.props.history.push("/");
          console.log(this.state.user);
          alert("You updated your profile");
          window.location.reload();
        }
      );
    } else {
      console.log("no");
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="card">
            <header class="card-header">
              <p class="card-header-title">Information</p>
            </header>
            <div className="card-content">
              <div class="content">
                Your email is: {this.state.info.email} <br />
                Your first name is: {this.state.info.firstName}
                <br />
                Your last name is: {this.state.info.lastName}
              </div>
            </div>
          </div>
          <br />
          <form id="newUserForm" onSubmit={this.submitHandler}>
            <div className="field">
              <h1>Update your profile!</h1>
              <br />
              <h1>First Name</h1>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.changeHandler}
              />
            </div>
            <div className="field">
              <h1>Last Name</h1>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
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
        </div>
      </>
    );
  }
}

export default UpdateForm;
