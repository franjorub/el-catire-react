import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SalesList extends Component {
  state = {
    sales: []
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:4000/sales");

      this.setState({
        sales: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { sales } = this.state;

    return (
      <div>
        <h3>Sales</h3>
        <ul>
          <li>
            <Link to="/sales/create">Create</Link>
          </li>
        </ul>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Total Price</th>
              <th scopte="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={sale._id}>
                <th scope="row">{index}</th>
                <th>{sale.date}</th>
                <th>{sale.totalPrice}</th>
                <th>
                  <Link to={`/sales/details/${sale._id}`}>Details</Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
