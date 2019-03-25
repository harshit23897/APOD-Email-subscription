import React, { Component } from "react";
import "../static/landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.saveEmail = this.saveEmail.bind(this);
  }

  saveEmail = async e => {
    // Prevent form from reloading.
    e.preventDefault();
    var email = document.getElementById("email").value;

    const rawResponse = await fetch("/api/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    });
    const content = await rawResponse.json();

    document.getElementById("form").innerHTML = content;
  };

  state = {
    dict: []
  };

  componentDidMount() {
    this.callAPI()
      .then(res => this.setState({ dict: res[0] }))
      .catch(err => console.log(err));
  }

  callAPI = async () => {
    const res = await fetch("/api");
    const body = await res.json();

    if (res.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="container">
        <img
          src={this.state.dict.hdurl}
          alt="Italian Trulli"
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="content">
          <h3>
            Subscribe if you want NASA's Astronomy Picture of the Day in you
            Email everyday?
          </h3>
          <div id="form">
            <form className="newsletter-subscription" onSubmit={this.saveEmail}>
              <input
                className="email"
                type="email"
                id="email"
                placeholder="Email"
                required
              />
              <input
                className="button submit"
                value="subscribe"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
