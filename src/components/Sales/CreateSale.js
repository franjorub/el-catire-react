import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

export default class CreateSale extends Component {
  state = {
    sale: {
      date: "",
      order: [],
      totalPrice: 0
    },
    selectedHotdogs: [],
    createSuccess: false,
    responseSuccess: null
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:4000/hotdog");
      const selectedHotdogs = data.map((item, index) => {
        return {
          isSelected: false,
          item,
          quantity: 0
        };
      });
      this.setState({
        selectedHotdogs
      });
    } catch (err) {
      console.log(err);
    }
  }

  onChangeDate = value => {
    this.setState(state => {
      const sale = { ...state.sale };
      sale.date = value;
      return {
        sale
      };
    });
  };

  onChangeHotdogQuantity = (index, quantity) => {
    this.setState(state => {
      const selectedHotdogs = [...state.selectedHotdogs];
      const sale = { ...state.sale };
      selectedHotdogs[index].quantity = parseInt(quantity);
      sale.totalPrice = state.sale.order.reduce((acc, current) => {
        return acc + current.quantity * current.item.price;
      }, 0);
      return {
        selectedHotdogs,
        sale
      };
    });
  };

  onChangeHotdogSelection = (index, value) => {
    console.log(value, index);
    this.setState(state => {
      const selectedHotdogs = [...state.selectedHotdogs];
      const sale = { ...state.sale };
      selectedHotdogs[index].isSelected = value;
      sale.order = selectedHotdogs.filter(hotdog => hotdog.isSelected);
      return {
        selectedHotdogs,
        sale
      };
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const sale = { ...this.state.sale };
    sale.order = sale.order.map(hotdog => _.omit(hotdog, ["isSelected"]));
    try {
      const { data } = await axios.post(
        "http://localhost:4000/sales/create",
        sale
      );
      console.log(data);
      this.setState(
        {
          createSuccess: true,
          responseSuccess: data
        },
        () => {
          setTimeout(() => {
            this.setState({ createSuccess: false });
          }, 5000);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      sale,
      selectedHotdogs,
      createSuccess,
      responseSuccess
    } = this.state;

    return (
      <div style={{ marginTop: 10 }}>
        {createSuccess && (
          <div className="alert alert-success" role="alert">
            Sale created with success ! id: {responseSuccess._id}
          </div>
        )}
        <h3>Create a new Sale!!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Date: </label>
            <input
              type="date"
              className="form-control"
              value={sale.date}
              onChange={({ target: { value } }) => this.onChangeDate(value)}
            />
          </div>

          <div className="row mb-5">
            <div className="col-sm-12">
              <div className="h3">Available Hotdogs</div>
            </div>
            {selectedHotdogs.map((hotdog, index) => {
              return (
                <div className="col-sm-6 mt-2" key={hotdog.item._id}>
                  <div className="card mb-2">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">{hotdog.item.name}</li>
                      <li className="list-group-item">
                        {hotdog.item.description}
                      </li>
                      <li className="list-group-item">{hotdog.item.price}</li>
                    </ul>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Quantity: </label>
                        <input
                          type="number"
                          className="form-control"
                          value={hotdog.quantity}
                          onChange={({ target: { value } }) =>
                            this.onChangeHotdogQuantity(index, value)
                          }
                        />
                        <label className="mt-2">
                          Select
                          <input
                            type="checkbox"
                            name="selected"
                            value="select"
                            onChange={({ target: { checked } }) =>
                              this.onChangeHotdogSelection(index, checked)
                            }
                            className="ml-2"
                            checked={hotdog.isSelected}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h4>Total price: {sale.totalPrice}</h4>
          <div className="form-group">
            <input
              type="submit"
              value="Create sale"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
