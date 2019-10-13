import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import HotDogList from "./components/Hotdogs/HotDogList";
import CreateHotDog from "./components/Hotdogs/CreateHotDog";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          El Catire
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/hotdog">
              Hotdogs <span className="sr-only">(current)</span>
            </Link>
            <Link className="nav-item nav-link" to="#">
              Features
            </Link>
            <Link className="nav-item nav-link" to="#">
              Pricing
            </Link>
            <Link className="nav-item nav-link disabled" to="#">
              Disabled
            </Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/hotdog" exact component={HotDogList} />
        <Route path="/hotdog/create" component={CreateHotDog} />
      </div>
    </Router>
  );
}

export default App;
