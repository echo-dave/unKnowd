import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import authenticatedAxios from "../../utils/AuthenticatedAxios";
import UserDisplay from "../../components/UserDisplay/UserDisplay";
import Auth from "../../utils/Auth";
import clearImageSelect from "../../utils/ClearImageSelect";
import "./UpdateProfile.scss";
// import Auth from "../utils/Auth";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      photo: "",
      info: "",
      user: "",
      currentPassword: "",
      // new password
      password: "",
      passwordCheck: ""
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

    this.clearImageSelect = clearImageSelect.bind(this);
  }

  removeImage = () => {
    this.clearImageSelect("photo");
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

  logout = () => {
    Auth.logOut(() => (window.location = "/"));
  };

  submitHandler = e => {
    e.preventDefault();

    //build data set to update
    let updatingUser = new FormData();
    if (this.state.email) updatingUser.append("email", this.state.email);
    if (this.state.firstName)
      updatingUser.append("firstName", this.state.firstName);
    if (this.state.lastName)
      updatingUser.append("lastName", this.state.lastName);
    if (this.state.photo) updatingUser.append("photo", this.state.photo);
    updatingUser.append("id", this.state.user.id);

    //authenticated posting of user updates
    authenticatedAxios
      .post("/api/userInfoUpdate", updatingUser)
      .then(updatedInfo => {
        console.log(updatedInfo.data);
        this.setState({ info: updatedInfo.data });
        this.setState({
          email: "",
          firstName: "",
          lastName: "",
          photo: ""
        });
      })
      .catch(function(err) {
        console.log(err.response);
      });
  };

  render() {
    return (
      <>
        <Nav logout={this.logout} />
        <div id="profile" className="container">
          <div className="columns">
            <div className="column">
              <div className="box">
                <h2>Current Info:</h2>
                <UserDisplay creatorPhoto={this.state.info.photo} />
                <table>
                  <tbody>
                    <tr>
                      <td>First Name:</td>
                      <td>{this.state.info.firstName}</td>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <td>{this.state.info.lastName}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{this.state.info.email}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <p>First Name: {this.state.info.firstName}</p>
                <p>Last Name: {this.state.info.lastName}</p>
                <p>Email: {this.state.info.email}</p> */}
              </div>
              <form
                id="updateUserForm"
                className="box"
                onSubmit={this.submitHandler}
              >
                <div className="field">
                  <h2>Update your info:</h2>
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
                    <span id="imageRemove" onClick={this.removeImage}>
                      x
                    </span>
                    <input
                      id="imageSelect"
                      // id="userPhoto"
                      className="input"
                      name="photo"
                      type="file"
                      // value={this.state.photo}
                      onChange={this.fileChangeHandler}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="password">
                    New Password
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                      required
                      pattern=".{8,}"
                      placeholder="min 8 chars"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="passwordCheck">
                    New Password Again
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="passwordCheck"
                      name="password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                      required
                      pattern=".{8,}"
                      placeholder="min 8 chars"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="currentPassword"
                      value={this.state.currentPassword}
                      onChange={this.changeHandler}
                      required
                      pattern=".{8,}"
                      placeholder="min 8 chars"
                    />
                  </div>
                </div>

                <button
                  id="updateInfo"
                  className="button is-primary is-small"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateProfile;
