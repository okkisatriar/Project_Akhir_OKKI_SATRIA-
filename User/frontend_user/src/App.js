import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';
import Cart from './component/Cart';
import Content from './component/Content';
import Checkout from './component/Checkout';
import Invoice from './component/Invoice';
import Login from './component/Login';
import Product_detail from './component/Product_detail';
import Products from './component/Products';
import Register from './component/Register';
import Logout from './component/Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Content}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/Checkout" component={Checkout}/>
        <Route path="/Invoice" component={Invoice}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Product_detail" component={Product_detail}/>
        <Route path="/Products" component={Products}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Logout" component={Logout}/>
      </div>
    );
  }
}

export default App;
