import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

class SalesReport extends Component {
  state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      // {
      //   name: "series-1",
      //   data: [30, 40, 45, 50, 49, 60, 70, 91]
      // }
    ]
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:4000/reports");
      console.log(data);
      this.setState({
        series: [
          {
            data: data.map(item => ({
              x: item._id,
              y: item.total
            }))
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container mt-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 style={{ textAlign: "center" }}>Sales / day</h3>

            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SalesReport;
