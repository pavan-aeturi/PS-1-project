import React from "react";
import Chart from "./Chart";
import Loader from "react-loader-spinner";
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
        //console.log(data);
        for (var key in data["Time Series (Daily)"]) {
          stockValuesX.push(key);
          stockValuesY.push(data["Time Series (Daily)"][key]["1. open"]);
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
        <Chart
          stockName={this.props.stockName}
          stockChartValueX={this.state.stockChartValueX}
          stockChartValueY={this.state.stockChartValueY}
        ></Chart>
      );
  }
}
export default Screener;
