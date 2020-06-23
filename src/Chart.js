import React from "react";
import Plot from "react-plotly.js";

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
