import React, { Component } from "react";
import Nav from "./Nav/Nav";
import axios from "axios";
import authenticatedAxios from "../utils/AuthenticatedAxios";
// import Auth from "../utils/Auth";

class UpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      img: "",
      info: "",
      user: ""
    };
  }

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        // console.log(response);
        this.setState({ user: response.data });
        // console.log(this.state.user);
      });
    }

    // console.log("post form user", this.props.userState);
    // console.log("creator state", this.state.creator);
    authenticatedAxios
      .get("/api/userInfo", this.state.user.id)
      .then(response => {
        console.log(response);
        this.setState({ info: response.data });
        console.log(this.state.info);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    //bild data set to update
    let updatingUser = new FormData();
    if (this.state.email) updatingUser.append("email", this.state.email);
    if (this.state.firstName)
      updatingUser.append("firstName", this.state.firstName);
    if (this.state.lastName)
      updatingUser.append("lastName", this.state.lastName);
    updatingUser.append("photo", document.querySelector("#userPhoto").value);
    updatingUser.append("id", this.state.user.id);

    authenticatedAxios
      .post("/api/userInfoUpdate", updatingUser)
      .then(updatedInfo => {
        console.log(updatedInfo.data);
        this.setState({ info: updatedInfo.data });
      })
      .catch(function(err) {
        console.log(err);
      });

    // if (this.state.email) {
    //   Auth.update(
    //     this.state.email,
    //     this.state.firstName,
    //     this.state.lastName,

    //     response => {
    //       this.context.setUser(response);
    //       this.props.history.push("/");
    //       console.log(this.state.user);
    // alert("You updated your profile");
    // window.location.reload();
    //     }
    //   );
    // } else {
    //   console.log("no");
    // }
  };

  render() {
    return (
      <>
        <Nav />
        <div className="container">
          <div className="box">
            <header className="">
              <p className="">Information</p>
            </header>
            <div className="">
              <div className="content">
                Your email is: {this.state.info.email} <br />
                Your first name is: {this.state.info.firstName}
                <br />
                Your last name is: {this.state.info.lastName}
              </div>
            </div>
          </div>
          <br />
          <form id="newUserForm" className="box" onSubmit={this.submitHandler}>
            <div className="field">
              <h1>Update your profile!</h1>
              <br />
              <h1>First Name</h1>
              <input
                className="input"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.changeHandler}
              />
            </div>
            <div className="field">
              <h1>Last Name</h1>
              <input
                className="input"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.changeHandler}
              />
            </div>
            <div className="field">
              <h1>Email</h1>
              <input
                className="input"
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
                  id="userPhoto"
                  className="input"
                  name="photo"
                  type="file"
                  // value={this.state.photo}
                  onChange={this.fileChangeHandler}
                />
              </div>
            </div>

            <button className="button is-primary is-small" type="submit">
              Update
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default UpdateForm;
