(this.webpackJsonpmern=this.webpackJsonpmern||[]).push([[0],{114:function(e,t){},117:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(58),o=a.n(r),c=(a(67),a(2)),i=a(3),l=a(5),m=a(4),u=a(6),h=a(16),p=a(12),d=a(10),f=a.n(d),g=f.a.create({headers:{Authorization:localStorage.getItem("token")}}),v=a(15),b=Object(n.createContext)();var E={isLoggedIn:function(){return!!localStorage.getItem("token")},logIn:function(e,t,a){f.a.post("/api/authenticate",{email:e,password:t}).then((function(e){console.log(e),localStorage.setItem("token",e.data.token),a(e.data)}))},logOut:function(e){localStorage.removeItem("token"),e()},getToken:function(){return localStorage.getItem("token")},register:function(e,t,a,n,s){console.log("register"),f.a.post("/api/signup",{email:e,password:t,firstName:a,lastName:n}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},y=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={email:"",password:"",firstName:"",lastName:""},a.changeHandler=function(e){var t=e.target,n=t.name,s=t.value;a.setState(Object(v.a)({},n,s))},a.submitHandler=function(e){e.preventDefault();var t=a.state,n=t.email,s=t.password,r=t.firstName,o=t.lastName;n&&s&&r&&o&&E.register(n,s,r,o,(function(e){a.context.setUser(e),a.props.history.push("/")}))},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{onSubmit:this.submitHandler},s.a.createElement("div",{className:"field"},s.a.createElement("h1",null,"First Name"),s.a.createElement("input",{type:"text",name:"firstName",value:this.state.first,onChange:this.changeHandler})),s.a.createElement("div",{className:"field"},s.a.createElement("h1",null,"Last Name"),s.a.createElement("input",{type:"text",name:"lastName",value:this.state.last,onChange:this.changeHandler})),s.a.createElement("div",{className:"field"},s.a.createElement("h1",null,"Password (min of 8 characters)"),s.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.changeHandler})),s.a.createElement("div",{className:"field"},s.a.createElement("h1",null,"Email"),s.a.createElement("input",{type:"text",name:"email",value:this.state.email,onChange:this.changeHandler})),s.a.createElement("button",{className:"button is-primary is-small",type:"submit"},"Sign up"))}}]),t}(n.Component);y.contextType=b;var N=Object(p.e)(y),j=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={email:"",password:"",user:""},a.setUser=function(e){a.setState({user:e})},a.changeHandler=function(e){var t=e.target,n=t.name,s=t.value;a.setState(Object(v.a)({},n,s))},a.submitHandler=function(e){e.preventDefault();var t=a.state,n=t.email,s=t.password;n&&s&&E.logIn(n,s,(function(e){a.context.setUser(e),a.props.history.push("/"),console.log(a.state.user)}))},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("form",{onSubmit:this.submitHandler},s.a.createElement("div",{className:"field"},s.a.createElement("h1",null,"Email"),s.a.createElement("input",{type:"text",name:"email",value:this.state.email,onChange:this.changeHandler})),s.a.createElement("div",{className:"field"},s.a.createElement("h1",null,"Password"),s.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.changeHandler})),s.a.createElement("button",{className:"button is-primary is-small",type:"submit"},"Login")))}}]),t}(n.Component);j.contextType=b;var O=Object(p.e)(j),w=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={isRegister:!1},a.changeForm=function(){a.setState({isRegister:!a.state.isRegister})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.isRegister;return s.a.createElement("div",{id:"wrap"},s.a.createElement("nav",null,s.a.createElement("h1",{id:"main-name"},"UnKnowed")),s.a.createElement("h5",{id:"quote"},"Putting community back in community"),s.a.createElement("div",{className:"container",id:"signup-container"},s.a.createElement("div",{className:"columns is-centered is-vcentered"},s.a.createElement("div",{className:"column is-narrow box"},e?s.a.createElement(N,null):s.a.createElement(O,null),s.a.createElement("a",{className:"",id:"login",onClick:this.changeForm},e?"Already have an account?":"Sign up for an account")))))}}]),t}(s.a.Component),k=a(61),S=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"posts box"},s.a.createElement("p",null,this.props.msg),s.a.createElement("img",{alt:"",className:"postPhotos",src:this.props.photos}),s.a.createElement("div",{className:"username"},this.props.firstName),s.a.createElement("img",{alt:"",className:"userphoto",src:this.props.creatorPhoto}))}}]),t}(n.Component),C=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={events:[]},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"events box"},s.a.createElement("h2",null,this.props.title),s.a.createElement("div",{className:"postPhotos"},this.props.img),s.a.createElement("p",{className:"description"},this.props.description),s.a.createElement("span",{className:"dates"},this.props.date.start," - ",this.props.date.end),s.a.createElement("div",{className:"username"},this.props.creator.firstName),s.a.createElement("div",{className:"userphoto"},this.props.creator.photo))}}]),t}(n.Component),x=a(31),H=a.n(x),P=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={msg:"",creator:"5e13e9c75293fcd9f353d106",dateCreated:"",photos:""},a.changeHandler=function(e){var t=e.target,n=t.name,s=t.value;a.setState(Object(v.a)({},n,s))},a.submitHandler=function(e){e.preventDefault();var t=new Date,n={msg:a.state.msg,creator:a.state.creator,dateCreated:t};a.savePost(n)},a.savePost=function(e){f.a.post("/api/post",e).then((function(e){})).catch((function(e){return console.log(e)}))},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",{id:"postform"},s.a.createElement("form",{className:"event",onSubmit:this.submitHandler},s.a.createElement("div",{className:"field"},s.a.createElement("label",{className:"label",htmlFor:"msg"},"Message"),s.a.createElement("input",{type:"text",name:"msg",value:this.state.msg,onChange:this.changeHandler})),s.a.createElement("div",{className:"field"},s.a.createElement("label",{className:"label",htmlFor:"photo"},"Photo"),s.a.createElement("div",{className:"control"},s.a.createElement("span",{id:"imageRemove"},"X"),s.a.createElement("input",{className:"input",name:"photo",type:"file",value:this.state.photos,onChange:this.changeHandler}))),s.a.createElement("button",{className:"button is-primary is-small",type:"submit"},"Post!")))}}]),t}(n.Component),U=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={posts:[],events:[],user:""},a.setUser=function(e){a.setState({user:e})},a.getPosts=function(){f.a.get("/api/posts").then((function(e){console.log(e),a.setState({posts:e.data})})).catch((function(e){return console.log(e)}))},a.getEvents=function(){f.a.get("/api/events").then((function(e){return a.setState({events:e.data})})).catch((function(e){return console.log(e)}))},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getPosts(),this.getEvents(),H()("http://127.0.0.1:3001").on("new post",(function(t){console.log(t),e.setState({posts:[t].concat(Object(k.a)(e.state.posts))})})),localStorage.getItem("token")&&g.get("/api/me").then((function(t){console.log(t.data),e.setUser(t.data),console.log(e.state.user)}))}},{key:"componentWillUnmount",value:function(){this.socket.close()}},{key:"render",value:function(){return s.a.createElement("div",{className:"container main"},s.a.createElement("div",{className:"columns"},s.a.createElement("div",{className:"column posts"},this.state.posts.map((function(e){return s.a.createElement(S,{key:e._id,msg:e.msg,firstName:e.creator.firstName,creatorPhoto:e.creator.photo})}))),s.a.createElement("div",{className:"column events"},this.state.events.map((function(e){return s.a.createElement(C,{key:e._id})})))),s.a.createElement(P,null))}}]),t}(s.a.Component),I=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={user:null},a.setUser=function(e){a.setState({user:e})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;localStorage.getItem("token")&&g.get("/api/me").then((function(t){return e.setUser(t.data)}))}},{key:"render",value:function(){var e=this.state.user,t=this.setUser;return s.a.createElement(h.a,null,s.a.createElement("div",null,s.a.createElement(b.Provider,{value:{user:e,setUser:t}},s.a.createElement(p.a,{exact:!0,path:"/",component:w}),s.a.createElement(p.a,{exact:!0,path:"/mainpage",component:U}))))}}]),t}(n.Component),A=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function D(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(s.a.createElement(I,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");A?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):D(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):D(e)}))}}()},62:function(e,t,a){e.exports=a(117)},67:function(e,t,a){}},[[62,1,2]]]);
//# sourceMappingURL=main.e290b93f.chunk.js.map