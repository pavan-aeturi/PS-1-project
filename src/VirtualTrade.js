import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class VirtualTrade extends React.Component {
  componentDidMount() {
    this.props.changeAddress();
  }
  render() {
    return <div className="VirtualTrade"></div>;
  }
}

export default VirtualTrade;
