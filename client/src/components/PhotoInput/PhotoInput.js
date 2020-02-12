import React, { Component } from "react";
import "./PhotoInput.scss";

class PhotoInput extends Component {
  render() {
    return (
      <div className="file has-name is-fullwidth is-primary photoInput clearfix">
        <label className="file-label">
          <input
            id="imageSelect"
            className="file-input"
            type="file"
            name={this.props.fileName}
            onChange={this.props.fileChangeHandler}
          />
          <span className="file-cta">
            <span className="file-label">+ Photo</span>
          </span>
          <span className="file-name">{this.props.photoFileName}</span>
        </label>
        <span id="imageRemove" onClick={this.props.removeImage}>
          x
        </span>
      </div>
    );
  }
}

export default PhotoInput;
