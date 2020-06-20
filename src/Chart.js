import React from "react";
import Plot from "react-plotly.js";
class Chart extends React.Component {
  render() {
    return (
      <div>
        <h1>Stock Screener</h1>
        <Plot
          data={[
            {
              x: this.props.stockChartValueX,
              y: this.props.stockChartValueY,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "purple" },
            },
          ]}
          layout={{ width: 1000, height: 500, title: this.props.stockName }}
        />
      </div>
    );
  }
}
export default Chart;
