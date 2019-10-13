import React, { Component } from "react";
import axios from "axios";

export default class SaleDetails extends Component {
  state = {
    sale: {}
  };
  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    try {
      const { data } = await axios.get(`http://localhost:4000/sales/${id}`);
      this.setState({
        sale: data
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { sale } = this.state;
    return (
      <div>
        <h2>Sale Details</h2>
        <ul>
          <li>Date: {sale.date}</li>
          <li>Orders: </li>
          {sale.order &&
            sale.order.map(order => (
              <div key={order.item._id}>
                <hr />
                <p>Name: {order.item.name}</p>
                <p>Description: {order.item.description}</p>
                <p>Quantity: {order.quantity}</p>
                <hr />
              </div>
            ))}
          <li>Total Price: {sale.totalPrice}</li>
        </ul>
      </div>
    );
  }
}
