import axios from "axios";

function Auth() {
  function register(userData, cb) {
    console.log("start register");
    let email = userData.get("email");
    let password = userData.get("password");
    // console.log("login", email, password);

    axios
      .post("/api/signup", userData)
      .then(function(data) {
        logIn(email, password, cb);
      })
      .catch(function(err) {
        //   console.log(err.response.status, err.response.data);
        cb(err);
      });
  }

  function logIn(email, password, cb) {
    axios
      .post("/api/authenticate", { email: email, password: password })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        cb(response);
      })
      .catch(function(err) {
        if (err.response.status === 401) cb(err.response);
      });
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
