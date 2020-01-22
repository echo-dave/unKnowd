import React from "react";
import { Redirect } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import authenticatedAxios from "../utils/AuthenticatedAxios";

class LoginPage extends React.Component {
  state = {
    isRegister: false,
    loggedIn: false
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        this.setUser(response.data);
        if (response.data.id) this.setState({ loggedIn: true });
        // console.log(this.state.user);
      });
    }
  }

  changeForm = () => {
    this.setState({ isRegister: !this.state.isRegister });
  };

  render() {
    const { isRegister } = this.state;
    return (
      <div id="wrap">
        {this.state.loggedIn ? <Redirect to="/mainpage" /> : null}

        <nav>
          <h1 id="main-name">UnKnowd</h1>
        </nav>
        <h5 id="quote">Putting community back in community</h5>
        <div className="container" id="signup-container">
          <div className="columns is-centered is-vcentered is-mobile">
            <div className="column is-narrow box">
              {isRegister ? <SignUpForm /> : <LoginForm />}
              <a href="#" className="" id="login" onClick={this.changeForm}>
                {isRegister
                  ? "Already have an account?"
                  : "Sign up for an account"}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
