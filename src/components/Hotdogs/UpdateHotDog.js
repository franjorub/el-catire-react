import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class UpdateHotDog extends Component {
  state = {
    hotdog: {
      name: "",
      description: "",
      price: 0
    }
  };
  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const { data } = await axios.get(`http://localhost:4000/hotdog/${id}`);
      this.setState({
        hotdog: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  onChangeDescription = value => {
    this.setState(state => {
      const hotdog = { ...state.hotdog };
      hotdog.description = value;
      return {
        hotdog
      };
    });
  };

  onChangeName = value => {
    this.setState(state => {
      const hotdog = { ...state.hotdog };
      hotdog.name = value;
      return {
        hotdog
      };
    });
  };

  onChangePrice = value => {
    this.setState(state => {
      const hotdog = { ...state.hotdog };
      hotdog.price = value;
      return {
        hotdog
      };
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { hotdog } = this.state;

    try {
      await axios.post(
        `http://localhost:4000/hotdog/update/${hotdog._id}`,
        hotdog
      );
      this.props.history.push("/hotdog");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { hotdog } = this.state;
    return (
      <div>
        <h3>Update a new Hotdog!!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={hotdog.description}
              onChange={({ target: { value } }) =>
                this.onChangeDescription(value)
              }
            />
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={hotdog.name}
              onChange={({ target: { value } }) => this.onChangeName(value)}
            />
          </div>

          <div className="form-group">
            <label>Price: </label>
            <input
              type="number"
              className="form-control"
              value={hotdog.price}
              onChange={({ target: { value } }) => this.onChangePrice(value)}
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

export default withRouter(UpdateHotDog);
