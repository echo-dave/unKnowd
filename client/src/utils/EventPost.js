import axios from "axios";

function eventPost(title, description, address, lat, lon, cb) {
  console.log("Event Created");
  axios
    .post("/api/EventForm", {
      title: title,
      description: description,
      address: address,
      lat: lat,
      lon: lon
    })
    .then(function(data) {
      console.log(data);
      alert("Success!");
      window.location = "/mainpage";
    })
    .catch(function(err) {
      console.log(err);
    });
}

export default eventPost;
