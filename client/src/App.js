import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import authenticatedAxios from "./utils/AuthenticatedAxios";
import LoginPage from "./components/LoginPage";
import UserContext from "./context/UserContext";
import Main from "./components/Main";
import PostForm from "./components/EventForm";

class App extends Component {
  state = {
    user: null
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios
        .get("/api/me")
        .then(response => this.setUser(response.data));
    }
  }

  render() {
    const { user } = this.state;
    const setUser = this.setUser;
    return (
      <Router>
        <div>
          <UserContext.Provider
            value={{
              user: user,
              setUser: setUser
            }}
          >
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/event" component={PostForm} />
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
