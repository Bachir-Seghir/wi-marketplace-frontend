import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HomePage from "./HomePage";

import "../styles/App.css";
import Products from "./Products";
import Product from "./Product";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Switch>
          <Route path="/signin">
            <h1>Signin Page</h1>
          </Route>

          <Route path="/checkout">
            <h1>checkout page</h1>
          </Route>
          <Route path="/products">
            <Header />
            <Products />
          </Route>
          <Route path="/product">
            <Header />
            <Product />
          </Route>
          <Route path="/">
            <Header />
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
