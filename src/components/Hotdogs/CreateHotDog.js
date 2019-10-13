import React, { Component } from "react";
import axios from "axios";

export default class CreateHotDog extends Component {
  state = {
    name: "",
    description: "",
    price: 0
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  onChangePrice = e => {
    this.setState({
      price: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const newHotdog = { ...this.state };

    console.log(`Form submitted:`);
    console.log("Name", this.state.name);
    console.log("Description", this.state.description);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/hotdog/create",
        newHotdog
      );
      console.log(data);
      this.setState({
        name: "",
        description: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create a new Hotdog!!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div className="form-group">
            <label>Price: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Hotdog"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
