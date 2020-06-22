import React from "react";
import Chart from "./Chart";
import { CSVLink } from "react-csv";
// import { Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
let datal = [];
let pointerTothis;
class Screener extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stockChartValueX: [],
      stockChartValueY: [],
      stockName: this.props.stockName,
      inProgress: true,
    };
  }
  componentDidMount() {
    pointerTothis = this;
    // this.props.changeAddress();
    this.fetchCost();
  }

  fetchCost() {
    const APIKEY = "2RON97OB1OCVMAXA";
    let API_CALL =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
      this.props.stockName +
      ".BSE&outputsize=compact&apikey=" +
      APIKEY;
    let stockValuesX = [];
    let stockValuesY = [];
    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        datal.push([
          "date",
          "open",
          "high",
          "low",
          "close",
          "adjusted close",
          "volume",
          "dividend amount",
          "split coefficient",
        ]);
        for (var key in data["Time Series (Daily)"]) {
          let k = [];
          k.push(key);
          k.push(data["Time Series (Daily)"][key]["1. open"]);
          k.push(data["Time Series (Daily)"][key]["2. high"]);
          k.push(data["Time Series (Daily)"][key]["3. low"]);
          k.push(data["Time Series (Daily)"][key]["4. close"]);
          k.push(data["Time Series (Daily)"][key]["5. adjusted close"]);
          k.push(data["Time Series (Daily)"][key]["6. volume"]);
          k.push(data["Time Series (Daily)"][key]["7. dividend amount"]);
          k.push(data["Time Series (Daily)"][key]["8. split coefficient"]);
          stockValuesX.push(key);
          stockValuesY.push(data["Time Series (Daily)"][key]["4. close"]);
          datal.push(k);
        }
        pointerTothis.setState({
          stockChartValueX: stockValuesX,
          stockChartValueY: stockValuesY,
        });
        pointerTothis.setState({ inProgress: false });
      });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.stockName !== prevProps.stockName) {
      this.setState({ inProgress: true });
      this.fetchCost();
    }
  }
  render() {
    if (this.state.inProgress) {
      return (
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      );
    } else
      return (
        <div>
          {/* <strong>STOCK SCREENER</strong> */}

          <div style={{ display: "inline-block", float: "right" }}>
            <CSVLink
              data={datal}
              asyncOnClick={true}
              filename={"Times series" + this.props.stockName + ".csv"}
            >
              import csv
            </CSVLink>
          </div>
          <br></br>
          <div>
            <Chart
              stockName={this.props.stockName}
              stockChartValueX={this.state.stockChartValueX}
              stockChartValueY={this.state.stockChartValueY}
            ></Chart>
            <p>
              These are the closing prices of {this.props.stockName} plotted for
              last 100 days
            </p>
          </div>
        </div>
      );
  }
}
export default Screener;
