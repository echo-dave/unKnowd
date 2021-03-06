function clearImageSelect(imageStateName) {
  document.querySelector("#imageSelect").value = "";
  this.setState({
    [imageStateName]: "",
    preview:""
  });
}

function fileChange(event, photoFileName) {
  let file = event.target.files[0];
  this.setState({
    [photoFileName]: file
  });

  let preview = {};  
  const reader = new FileReader();
  reader.onload = (function(aImg){ return function(e) { 
    aImg.src =  e.target.result;
    this.setState({preview: aImg.src});
    };
  })(preview).bind(this);
  reader.readAsDataURL(file);   
}

function urlClick(para) {
  let url = /(https?:\/\/\S*)/i;
  let newPar = para.split(url);
  let parIndex;
  for (let i = 0; i < newPar.length; i++) {
    if (newPar[i].match(url)) {
      parIndex = i;

      newPar[
        parIndex
      ] = `<a alt="" rel="noopener" target="_blank" href="${newPar[parIndex]}">${newPar[parIndex]}</a>`;
    }
  }
  let strgPar = "";

  for (let i = 0; i < newPar.length; i++) {
    strgPar += newPar[i];
  }

  return [strgPar];
}

export { clearImageSelect, fileChange, urlClick };
