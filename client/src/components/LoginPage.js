import React from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

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
      <>
        {isRegister ? <SignUpForm /> : <LoginForm />}
        <button onClick={this.changeForm}>
          {isRegister ? "login" : "signup"}
        </button>
      </>
    );
  }
}

export default LoginPage;
