import React from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

class LoginPage extends React.Component {
  state = {
    isRegister: false
  };
  changeForm = () => {
    this.setState({ isRegister: !this.state.isRegister });
  };
  render() {
    const { isRegister } = this.state;
    return (
      <div id="wrap">
        <nav>
          <h1 id="main-name">UnKnowd</h1>
        </nav>
        <h5 id="quote">Putting community back in community</h5>
        <div className="container" id="signup-container">
          <div className="columns is-centered is-vcentered is-mobile">
            <div className="column is-narrow box">
              {isRegister ? <SignUpForm /> : <LoginForm />}
              <a className="" id="login" onClick={this.changeForm}>
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
