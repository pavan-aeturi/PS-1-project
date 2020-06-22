import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
let myptr;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockName: this.props.stockName,
    };
  }
  componentDidMount() {
    this.divRef = React.createRef();
    myptr = this;
  }
  callit(e) {
    myptr.props.calledit(myptr.state.stockName);
  }
  mychangeHandler(e) {
    let val = e.target.value;
    myptr.setState({ stockName: val });
    // console.log(myptr.state.stockName);
  }

  render() {
    return (
      <Form inline>
        <FormControl
          type="text"
          onChange={this.mychangeHandler}
          placeholder="Search Stock"
          className="mr-sm-2"
        />
        <Button variant="primary" onClick={this.callit}>
          Search
        </Button>
      </Form>
    );
  }
}
export default Search;
