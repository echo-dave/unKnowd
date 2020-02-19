import React from "react";
import Nav from "../../components/Nav/Nav";
import axios from "axios";
import "./resetPassword.scss";

class PassReset extends React.Component {
    state = {
        password: "",
        email: "",
        token: "",
    };

componentDidMount() {
    let bodyHeight = window.innerHeight;
    this.resizeVh(bodyHeight);
    window.addEventListener("resize", this.resizeVh.bind(this));

    if (this.props.match.params.token) {
        this.setState({
            token: this.props.match.params.token,
            email: this.props.match.params.email
        })
    }
}
  resizeVh = bodyHeight => {
    bodyHeight = window.innerHeight;
    document.documentElement.style.setProperty(
      "--bodyHeight",
      `${bodyHeight}px`
    );
  };

    changeHandler = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      };

    submitHandler = (e) => {
        //use token to get user
        e.preventDefault();
        if (this.state.email && this.state.token && this.state.password) {
            axios.post("/api/user/reset",{email:this.state.email,token:this.state.token,password:this.state.password}).then(response => {
                this.setState({email: "", token: "", password: "", newToken: "", statusMsg: response.data.message});
            })
        } else if (this.state.email) {
            axios.get("/api/user/requestreset",{params: {email: this.state.email}}).then(statusMsg => {
                this.setState({statusMsg: statusMsg.data.message})
            })      
        }
    }

    render() {
        return (
            <div className="container passwordReset">
                        <Nav />
                <div className="columns">
                    <div className="column ">
                        <div className="box" style={{marginTop: "1rem"}}><p>Submit your email for a reset token</p></div>
                        <div className="box">
                            <form id="pReset" className="pReset" onSubmit={this.submitHandler}>
                                <label className="label">Email</label>
                                <input className="input" value={this.state.email} type="email" id="pEmail" name="email" onChange={this.changeHandler}/>
                                <label className="label" >Token</label>
                                <input className="input" value={this.state.token} type="text" id="ptoken" name="token" onChange={this.changeHandler}/>
                                <label className="label">New Password</label>
                                <input className="input" value={this.state.password} type="password" id="pNew" name="password" onChange={this.changeHandler}pattern=".{8,}"
                      placeholder="min 8 chars"/>
                                <button className="button is-small" type="submit" style={{marginTop: "1rem"}}>Submit</button>
                            </form>
                        </div>
                        {this.state.newToken ?  
                            <div className="box">
                                <p className="tokenText">{this.state.newToken}</p>
                             </div> 
                        : null }
                        {this.state.statusMsg ? 
                            <div className="box">
                                <p className="tokenText">{this.state.statusMsg}</p>
                            </div>
                        : null }
                    </div>
                  
                </div>
            </div>
        )
    }
}

export default PassReset