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
    lastName: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    if (email && password && firstName && lastName) {
      Auth.register(email, password, firstName, lastName, response => {
        this.context.setUser(response);
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div class="field">
          <h1>First Name</h1>
          <input
            type="text"
            name="firstName"
            value={this.state.first}
            onChange={this.changeHandler}
          />
        </div>
        <div class="field">
          <h1>Last Name</h1>
          <input
            type="text"
            name="lastName"
            value={this.state.last}
            onChange={this.changeHandler}
          />
        </div>
        <div class="field">
          <h1>Password (min of 8 characters)</h1>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
        </div>
        <div class="field">
          <h1>Email</h1>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
        </div>
        <button class="button is-primary is-small" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}

export default withRouter(SignUpForm);
