import React, { Component } from 'react'
import {Switch, Route} from "react-router-dom"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Product from "./pages/Product"
import Transaction from "./pages/Transaction"

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Product}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/transaction" component={Transaction}/>
        <Route path ="/login" component={Login}/>
      </Switch>
    )
  }
}

