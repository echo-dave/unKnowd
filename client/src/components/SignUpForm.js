import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";

class SignUpForm extends Component {
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
      Auth.register(email, password, response => {
        this.context.setUser(response);
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>first name</h1>
        <input
          type="text"
          name="name.first"
          value={this.state.first}
          onChange={this.changeHandler}
        />
        <h1>last name</h1>
        <input
          type="text"
          name="name.last"
          value={this.state.last}
          onChange={this.changeHandler}
        />
        <h1>password</h1>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.changeHandler}
        />
        <h1>email</h1>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.changeHandler}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(SignUpForm);
