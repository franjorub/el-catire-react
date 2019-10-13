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
        <h2>Details</h2>
        <p className="h3">Date:</p>
        <p>{sale.date}</p>
        <p className="h3">Orders</p>
        {sale.order &&
          sale.order.map(order => (
            <>
              <p>{order.item.name}</p>
              <p>{order.item.description}</p>
              <p>{order.quantity}</p>
            </>
          ))}
      </div>
    );
  }
}
