import React, { Component } from "react";
import Auth from "../utils/Auth";
import axios from "axios";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      address: "",
      lat: "",
      lon: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    if (this.state.title && this.state.description) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${this.state.address}&key=73b2bdf763ad428694bf092b08ad995d&language=es&pretty=1`
        )
        .then(data => {
          console.log(data);
          this.setState({
            lat: data.data.results[0].geometry.lat,
            lon: data.data.results[0].geometry.lng
          });
          console.log(this.state.lat);
          console.log(this.state.lon);
          Auth.event(
            this.state.title,
            this.state.description,
            this.state.address,
            this.state.lat,
            this.state.lon,
            response => {
              this.context.setUser(response);
              console.log(response);
              this.props.history.push("/");
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }

    axios.get("api/all").then(function(data2) {
      console.log(data2);
    });
  };

  render() {
    const { title, description, address } = this.state;
    return (
      <div className="container">
        <div className="columns is-centered is-vcentered">
          <div className="column box">
            <form onSubmit={this.submitHandler}>
              <div className="field">
                <label className="label">Name of event</label>
                <div className="control">
                  <input
                    type="text"
                    className="control"
                    name="title"
                    placeholder="Title of the event"
                    value={title}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description of event</label>
                <div className="control">
                  <input
                    type="text"
                    className="textarea"
                    name="description"
                    placeholder="Description of the event"
                    value={description}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="field">
                  <label className="label">Address of event</label>
                  <div className="control">
                    <input
                      type="text"
                      name="address"
                      placeholder="address"
                      value={address}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>

              <button className="button is-primary is-small" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
