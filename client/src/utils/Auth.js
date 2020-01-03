import axios from "axios";

function Auth() {
  function logIn(username, password, cb) {
    //code goes here
    axios
      .post("/api/authenticate", { username: username, password: password })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        cb(response.data);
      });
  }

  function register(username, password, cb) {
    // go to stuff with axios
  }

  function logOut(cb) {
    localStorage.removeItem("token");
    cb();
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  return {
    isLoggedIn,
    logIn,
    logOut,
    getToken,
    register
  };
}

export default Auth();
