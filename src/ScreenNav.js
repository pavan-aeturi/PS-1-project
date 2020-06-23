import React, { Component } from "react";
// import chart from "./chart";
import Screener from "./Screener.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar } from "react-bootstrap";
import { Route } from "react-router-dom";
import Login from "./login";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Nav } from "react-bootstrap";
import Search from "./search.js";
import { BrowserRouter } from "react-router-dom";
class ScreenNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockName: "NCC",
      presentAddress: "/",
    };
  }
  change(node) {
    this.setState({ stockName: node });
    //console.log(node);
  }
  // changeAddress(node) {
  //   this.setState({ presentAddress: node });
  // }
  render() {
    // const store = configureStore({ history });
    return (
      <div className="ScreenerNav">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route
            path="/"
            render={() => {
              return (
                <div>
                  <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#">SCREENER</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="https://docs.google.com/spreadsheets/d/1ymMHn4gE9Gjjtvw3bGVlD_9CbdfDm01_cLBRd5nRN_M/edit#gid=1328995412">
                          Browse
                        </Nav.Link>
                      </Nav>

                      <Search
                        stockName={this.state.stockName}
                        calledit={(node) => {
                          this.change(node);
                        }}
                      ></Search>

                      {"  "}
                      <Login></Login>
                    </Navbar.Collapse>
                  </Navbar>
                  <Screener
                    changeAddress={() => {
                      this.changeAddress("/stock");
                    }}
                    stockName={this.state.stockName}
                  ></Screener>
                </div>
              );
            }}
          />{" "}
        </BrowserRouter>
      </div>
    );
  }
}

export default ScreenNav;
