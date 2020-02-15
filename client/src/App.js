import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import authenticatedAxios from "./utils/AuthenticatedAxios";
import LoginPage from "./pages/LoginPage";
import UserContext from "./context/UserContext";
import axios from "axios";
import "./app.scss";
const Mainpage = lazy(() => import("./pages/Main/Main"));
const Viewer = lazy(() => import("./pages/Viewer"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile/UpdateProfile"));


const NotFound = () => (
  <div
    className="container is-center"
    style={{
      height: "100vh",
      maxWidth: "600px",
      paddingTop: "0",
      marginTop: "0"
    }}
  >
    <div className="columns is-vcentered" style={{ height: "100%" }}>
      <div className="column">
        <div className="box">
          <h1>404 NOT FOUND</h1>
          <h3>Looks like you got lost along the way</h3>
        </div>
      </div>
    </div>
  </div>
);
class App extends Component {
  state = {
    user: null
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    axios
      .get("/api/mapsecretkeys")
      .then(key => {
        this.setState(key.data);
      })
      .catch(err => console.log(err));

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
          <Suspense fallback={<div>Loading...</div>}>
            <UserContext.Provider
              value={{
                user: user,
                setUser: setUser,
                mapKey: this.state.mapKey
              }}
            >
              <Switch>
                <ProtectedRoute exact path="/mainpage" component={Mainpage} />
                <Route exact path="/viewer" component={Viewer} />
                <ProtectedRoute exact path="/profile" component={UpdateProfile} />
                <Route
                  exact
                  path="/"
                  user={this.state.user}
                  component={LoginPage}
                />
                <Route component={NotFound} />
              </Switch>
            </UserContext.Provider>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
