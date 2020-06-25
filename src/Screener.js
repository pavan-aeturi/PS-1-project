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
      presentPrice: 0,
      change: 0,
      changepercent: 0,
      QuoteX: [],
      QuoteY: [],
      padding: ["4px", "4px", "4px"],
      inProgress: true,
      count: 0,
    };
  }
  componentDidMount() {
    pointerTothis = this;
    // this.props.changeAddress();
    this.fetchCost();
  }

  fetchCost() {
    const APIKEY = "P61KNOCIG0KT699C";
    console.log(this.props.stockName);
    let API_CALL =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
      this.props.stockName +
      ".BSE&outputsize=compact&apikey=" +
      APIKEY;
    let QUOTE_CALL =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
      this.props.stockName +
      ".BSE&apikey=Q6U0M2QAI2PDHCXI";
    let stockValuesX = [];
    let stockValuesY = [];
    let quotex = [];
    let quotey = [];
    fetch(QUOTE_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        quotex = [
          "symbol",
          "open",
          "high",
          "low",
          "price",
          "volume",
          "latest trading day",
          "previous close",
          "change",
          "change percent",
        ];
        for (var key in data["Global Quote"]) {
          quotey.push(data["Global Quote"][key]);
        }
        pointerTothis.setState({
          QuoteX: quotex,
          QuoteY: quotey,
          presentPrice: quotey[4],
          change: quotey[8],
          changepercent: quotey[9],
        });

        if (parseFloat(pointerTothis.state.change) < 0) {
          let k = ["8px", "4px", "4px"];
          pointerTothis.setState({ padding: k });
          pointerTothis.setState({ color: "#e75757" });
        } else if (parseFloat(pointerTothis.state.change) === 0) {
          let k = ["4px", "8px", "4px"];
          pointerTothis.setState({ padding: k });
        } else {
          let k = ["4px", "4px", "8px"];
          pointerTothis.setState({ padding: k });
          pointerTothis.setState({ color: "#2BAD60" });
        }
        // pointerTothis.setState({ inProgress: false });
      });
    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        datal = [];
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

        stockValuesY = [];
        stockValuesX = [];
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
          <div
            style={{
              display: "inline-block",
              float: "left",
              fontFamily: "Helvetica",
            }}
          >
            <span>
              {this.props.stockName}:{" "}
              <span style={{ color: this.state.color }}>
                {this.state.presentPrice}
              </span>{" "}
              INR{" "}
              <span style={{ color: this.state.color }}>
                {" "}
                {this.state.change}{" "}
              </span>
              ({this.state.changepercent})
            </span>
          </div>
          <br></br>
          <br></br>
          <div
            style={{
              display: "inline-block",
              float: "left",
              // marginBottom: "12px",

              fontFamily: "Helvetica",
              color: "white",
            }}
          >
            <span
              style={{
                backgroundColor: "#e75757",
                padding: this.state.padding[0],
                borderRadius: "4px",
              }}
            >
              Sell
            </span>
            <span
              style={{
                backgroundColor: "#f4c430",
                padding: this.state.padding[1],
                borderRadius: "4px",
              }}
            >
              Hold
            </span>
            <span
              style={{
                backgroundColor: "#2BAD60",
                padding: this.state.padding[2],
                borderRadius: "4px",
              }}
            >
              Buy
            </span>
          </div>
          <br></br>
          <br></br>
          <div style={{ display: "inline-center" }}>
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
