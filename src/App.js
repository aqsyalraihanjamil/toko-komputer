import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from "./pages/Login"
import Product from "./pages/Product"
import Customer from "./pages/Customer"
import Transaction from "./pages/Transaction"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/product" component={Product} />
        <Route path="/customer" component={Customer} />
        <Route exact path="/transaction" component={Transaction} />
        <Route exact path="/admin" component={Admin} />

      </Switch>
    )
  }
}
