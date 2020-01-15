import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";

class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    user: ""
  };

  setUser = user => {
    this.setState({ user });
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
        console.log(this.state.user);
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
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
            <h1>Password</h1>
            <input
              className="input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
          </div>
          <button
            id="loginButton"
            className="button is-primary is-small"
            type="submit"
          >
            Login
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(LoginForm);
