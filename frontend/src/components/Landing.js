import React, { Component } from "react";

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
    console.log(this.state.dict);
    return (
      <div>
        <img src={this.state.dict.hdurl} alt="Italian Trulli" />
      </div>
    );
  }
}
