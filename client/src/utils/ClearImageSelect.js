function clearImageSelect(imageStateName) {
  document.querySelector("#imageSelect").value = "";
  this.setState({
    [imageStateName]: ""
  });
}

function fileChange(event, photoFileName) {
  var file = event.target.files[0];
  // console.log(file);
  this.setState({
    [photoFileName]: file
  });
}

export { clearImageSelect, fileChange };
