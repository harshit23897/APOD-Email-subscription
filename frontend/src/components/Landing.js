import React, { Component } from "react";
import "../static/landing.css";

export default class Landing extends Component {
  state = {
    dict: []
  };

  componentDidMount() {
    this.callAPI()
      .then(res => this.setState({ dict: res }))
      .catch(err => console.log(err));
  }

  callAPI = async () => {
    const res = await fetch("/api");
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    return (
      <div>
        <img
          src={this.state.dict.hdurl}
          alt="Italian Trulli"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    );
  }
}
