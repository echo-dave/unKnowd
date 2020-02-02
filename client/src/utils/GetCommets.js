import axios from "axios";

getComments = () => {
  // let id = this.getAttribute("data-id");
  // setTimeout(() => console.log("id", this.props._id), 200);

  axios
    .get("/api/getComments", { params: { _id: this.props.postData._id } })
    .then(comments => {
      // console.log("comment.data", comments.data);
      this.setState({ comments: comments.data });
      // console.log("comment data", this.state.comments);
    });
};

export default getComments();
