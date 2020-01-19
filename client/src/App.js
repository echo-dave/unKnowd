import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import authenticatedAxios from "./utils/AuthenticatedAxios";
import LoginPage from "./pages/LoginPage";
import UserContext from "./context/UserContext";
import Mainpage from "./pages/Main";
import Viewer from "./pages/Viewer";
import UpdateForm from "./components/UpdateProfile";
import "./app.scss";

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
            <Switch>
              <ProtectedRoute exact path="/mainpage" component={Mainpage} />
              {/* <Route exact path="/map" component={EventMap} /> */}
              {/* <Route exact path="/event" component={EventForm} /> */}
              <Route exact path="/viewer" component={Viewer} />
              <ProtectedRoute exact path="/profile" component={UpdateForm} />
              <Route path="/" user={this.state.user} component={LoginPage} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
