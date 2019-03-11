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
      <div className="container">
        <img
          src={this.state.dict.hdurl}
          alt="Italian Trulli"
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="email-form">
          <h3>
            Do you want NASA's Astronomy Picture of the Day in you Email
            everyday?
          </h3>
          <form className="newsletter-subscription">
            <input
              className="email"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="button"
              value="subscribe"
              className="submit"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}
