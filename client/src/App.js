import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import authenticatedAxios from "./utils/AuthenticatedAxios";
import LoginPage from "./pages/LoginPage";
import UserContext from "./context/UserContext";
import Mainpage from "./pages/Main";
//rename these to something more descriptive to what they are

import Viewer from "./pages/Viewer";

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
            <ProtectedRoute exact path="/mainpage" component={Mainpage} />
            {/* <Route exact path="/map" component={EventMap} /> */}
            {/* <Route exact path="/event" component={EventForm} /> */}
            <Route exact path="/viewer" component={Viewer} />
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
