import React, { Component } from "react";
// import chart from "./chart";
import Screener from "./Screener.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/vt.jpg";
import VirtualTrade from "./VirtualTrade";
import Navbar from "react-bootstrap/Navbar";
import { Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
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
    console.log(node);
  }
  changeAddress(node) {
    this.setState({ presentAddress: node });
  }
  render() {
    // const store = configureStore({ history });
    return (
      <div className="ScreenerNav">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route
            path="/"
            render={() => {
              return (
                <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="/">Virtual Trade</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/PS-1-project/portfolio">
                        Portfolio
                      </Nav.Link>
                      <Nav.Link href="/PS-1-project/stock">Analyse</Nav.Link>
                    </Nav>
                    {
                      <Search
                        stockName={this.state.stockName}
                        calledit={(node) => {
                          this.change(node);
                        }}
                      ></Search>
                    }
                  </Navbar.Collapse>
                </Navbar>
              );
            }}
          />{" "}
          <Route
            path="/PS-1-project/portfolio/"
            exact
            render={() => {
              return (
                <VirtualTrade
                  changeAddress={() => {
                    this.changeAddress("/portfolio");
                  }}
                ></VirtualTrade>
              );
            }}
          />
          <Route
            path="/PS-1-project/stock"
            exact
            render={() => {
              return (
                <Screener
                  changeAddress={() => {
                    this.changeAddress("/stock");
                  }}
                  stockName={this.state.stockName}
                ></Screener>
              );
            }}
          />
          <Route
            path="/"
            strict
            exact
            render={() => {
              return (
                <div>
                  <br></br>
                  <img src={logo} alt="Logo" width="800px" height="300px" />
                  <br></br>
                  <br></br>
                  <Button variant="primary">Login</Button>
                </div>
              );
            }}
          />
          {/* <chart></chart> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default ScreenNav;
