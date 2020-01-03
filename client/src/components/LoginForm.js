import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";

class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      Auth.logIn(email, password, response => {
        this.context.setUser(response);
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <input
            label="email"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
          <h1>password</h1>
          <input
            label="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default withRouter(LoginForm);
