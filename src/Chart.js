import React from "react";
import Plot from "react-plotly.js";
const https = require("https");

const options = {
  hostname: "financialmodelingprep.com",
  port: 443,
  path: "/api/v3/quote-short/AAPL",
  method: "GET",
};

const req = https.request(options, (res) => {
  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
class Chart extends React.Component {
  render() {
    return (
      <Plot
        style={{
          marginLeft: "30px",
          width: "95%",
          height: "100%",
        }}
        data={[
          {
            x: this.props.stockChartValueX,
            y: this.props.stockChartValueY,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "purple" },
          },
        ]}
        layout={{
          height: 500,
          title: this.props.stockName,
          autosize: true,
        }}
        config={{
          responsive: true,
        }}
      />
    );
  }
}
export default Chart;
