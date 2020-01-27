import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";

class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    user: "",
    badlogin: ""
  };

  componentDidMount() {
    let bodyHeight = window.innerHeight;
    this.resizeVh(bodyHeight);
    window.addEventListener("resize", this.resizeVh.bind(this));
  }

  resizeVh = bodyHeight => {
    console.log("rezize");
    bodyHeight = window.innerHeight;
    // bodyHeight = window.innerHeight;
    document.documentElement.style.setProperty(
      "--bodyHeight",
      `${bodyHeight}px`
    );
  };

  setUser = user => {
    this.setState({ user });
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  badlogin = msg => {
    this.setState({ badlogin: msg });
  };

  submitHandler = e => {
    e.preventDefault();
    this.setState({ badlogin: "" });
    const { email, password } = this.state;
    if (email && password) {
      Auth.logIn(email, password, response => {
        if (response.status === 200) {
          // console.log("submit", response.data);
          this.context.setUser(response.data);
          this.props.history.push("/");
          // console.log(this.state.user);
          window.location = "/mainpage";
        }
        if (response.status === 401) {
          this.badlogin(response.data.msg);
        }
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
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
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <button
            id="loginButton"
            className="button is-primary is-small"
            type="submit"
          >
            Login
          </button>
        </form>
        {!this.state.badlogin == "" ? (
          <p className="badlogin">{this.state.badlogin}</p>
        ) : null}
      </>
    );
  }
}

export default withRouter(LoginForm);
