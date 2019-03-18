import React, { Component } from "react";
import "../static/landing.css";

export default class Unsubscribe extends Component {
  state = {
    status: "",
    dict: {}
  };

  componentDidMount() {
    this.callAPI()
      .then(res => this.setState({ status: res }))
      .catch(err => console.log(err));

    this.callImageAPI()
      .then(res => this.setState({ dict: res }))
      .catch(err => console.log(err));
  }

  callImageAPI = async () => {
    const res = await fetch("/api");
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);

    return body;
  };

  callAPI = async () => {
    const email = this.props.match.params.email;
    const hash = this.props.match.params.hash;
    const res = await fetch("/api/unsubscribe/" + email + "/" + hash + "/");
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="container">
        <img
          src={this.state.dict.url}
          alt="Italian Trulli"
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="content">
          <h3>{this.state.status}</h3>
        </div>
      </div>
    );
  }
}
