function clearImageSelect(imageStateName) {
  document.querySelector("#imageSelect").value = "";
  this.setState({
    [imageStateName]: ""
  });
}

export default clearImageSelect;
