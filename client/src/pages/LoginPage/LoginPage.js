import React from "react";
import { Redirect } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";
import LoginForm from "../../components/LoginForm";
import authenticatedAxios from "../../utils/AuthenticatedAxios";
import "./loginPage.scss"

class LoginPage extends React.Component {
  state = {
    isRegister: false,
    loggedIn: false
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    let bodyHeight = window.innerHeight;
    this.resizeVh(bodyHeight);
    window.addEventListener("resize", this.resizeVh.bind(this));
    
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

  resizeVh = bodyHeight => {
    bodyHeight = window.innerHeight;
    // bodyHeight = window.innerHeight;
    document.documentElement.style.setProperty(
      "--bodyHeight",
      `${bodyHeight}px`
    );
  };

  render() {
    const { isRegister } = this.state;
    return (
      <div id="wrap">
        {this.state.loggedIn ? <Redirect to="/mainpage" /> : null}

        <nav>
          <h1 id="main-name">UnKnowd</h1>
        </nav>
        <div className="loginBody">
          <h2 id="quote">Bringing community back to community</h2>
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
      </div>
    );
  }
}

export default LoginPage;
