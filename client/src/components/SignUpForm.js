import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import { clearImageSelect } from "../utils/ClearImageSelect";
import PhotoInput from "./PhotoInput/PhotoInput";
import Spinner from "../components/Spinner/Spinner";

class SignUpForm extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photo: "",
    loading: false,
    error: ""
  };

  componentDidMount() {
    this.clearImageSelect = clearImageSelect.bind(this);
  }

  removeImage = () => this.clearImageSelect("photo");

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  emailChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  fileChangeHandler = event => {
    var file = event.target.files[0];
    // console.log(file);
    this.setState({
      photo: file
    });
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  submitHandler = e => {
    e.preventDefault();
    this.setState({ email: this.state.email.toLowerCase() });
    const { email, password, firstName, lastName } = this.state;

    const userData = new FormData(document.querySelector("#newUserForm"));
    userData.set("email", this.state.email.toLowerCase());

    this.toggleLoading();

    if (email && password && firstName && lastName) {
      Auth.register(userData, response => {
        if (response.data) {
          this.context.setUser(response.data);
          this.props.history.push("/");
          window.location = "/mainpage";
        } else {
          console.log(response.response.status, response.response.data);
          this.setState({
            loading: !this.state.loading,
            error: `${response.response.status} | ${response.response.data.error}`
          });
        }
      });

      // Auth.register(email, password, firstName, lastName, photo, response => {
      //   this.context.setUser(response);
      //   this.props.history.push("/");
      // });
    }
  };

  render() {
    return (
      <form id="newUserForm" onSubmit={this.submitHandler}>
        <div className="field">
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="firstName"
              value={this.state.first}
              onChange={this.changeHandler}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="lastName"
              value={this.state.last}
              onChange={this.changeHandler}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
              required
              pattern=".+@.+\..+"
            />
          </div>
        </div>
        <PhotoInput
          fileName="photo"
          fileChangeHandler={this.fileChangeHandler}
          photoFileName={this.state.photo.name}
          removeImage={this.removeImage}
        />

        <div className="field">
          <label className="label" htmlFor="password">
            Password (min of 8 characters)
          </label>
          <div className="contol">
            <input
              className="input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
              required
              pattern=".{8,}"
            />
          </div>
        </div>

        <button
          id="signupButton"
          className="button is-primary is-small"
          type="submit"
        >
          Sign up
        </button>
        {this.state.loading ? <Spinner /> : null}
        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
      </form>
    );
  }
}

export default withRouter(SignUpForm);
