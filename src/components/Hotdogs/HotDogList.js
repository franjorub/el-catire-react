import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class HotDogList extends Component {
  state = {
    hotdogs: []
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:4000/hotdog");

      this.setState({
        hotdogs: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { hotdogs } = this.state;

    return (
      <div>
        <h3>Hotdogs</h3>
        <ul>
          <li>
            <Link to="/hotdog/create">Create</Link>
          </li>
        </ul>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {hotdogs.map((hotdog, index) => (
              <tr key={hotdog._id}>
                <th scope="row">{index}</th>
                <th>{hotdog.name}</th>
                <th className={hotdog.description ? "" : "text-muted"}>
                  {hotdog.description || "Empty description"}
                </th>
                <th>{hotdog.price}</th>
                <th>
                  <Link to={`/hotdog/edit/${hotdog._id}`}>Update</Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
