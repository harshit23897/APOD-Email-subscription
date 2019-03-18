import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Landing from "./components/Landing";
import Unsubscribe from "./components/Unsubscribe";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/unsubscribe/:email/:hash"
            component={Unsubscribe}
          />
        </div>
      </Router>
    );
  }
}

export default App;
