import React, { Component } from "react";
import axios from "axios";
import "../app.scss";

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
               console.log(response);
                this.setState({email: "", token: "", password: "", token: "", newToken: ""});
                this.setState({status:response.data.message});
            })
        } else {
            axios.get("/api/user/requestreset",{params: {email: this.state.email}}).then(newToken => {
                console.log(newToken);
                console.log(newToken.data.resetToken);
                this.setState({newToken: newToken.data[0].resetToken})
            })      
        }
    }

    render() {
        return (
            <div className="container" style={{width:"600px"}}>
                <div className="columns">
                    <div className="column ">
                        <div className="box">
                            <form id="pReset" className="pReset" onSubmit={this.submitHandler}>
                                <label className="label">email</label>
                                <input className="input" value={this.state.email} type="email" id="pEmail" name="email" onChange={this.changeHandler}/>
                                <label className="label" >token</label>
                                <input className="input" value={this.state.token} type="text" id="ptoken" name="token" onChange={this.changeHandler}/>
                                <label className="label">New Password</label>
                                <input className="input" value={this.state.password} type="password" id="pNew" name="password" onChange={this.changeHandler}/>
                                <button className="button is-small" type="submit" style={{marginTop: "1rem"}}>Submit</button>
                            </form>
                        </div>
                        {this.state.newToken ?  
                            <div className="box">
                                <p className="tokenText">{this.state.newToken}</p>
                             </div> 
                        : null }
                        {this.state.newToken ? 
                            <div className="box">
                                <p className="tokenText">{this.state.status}</p>
                            </div>
                        : null }
                    </div>
                  
                </div>
            </div>
        )
    }
}

export default PassReset