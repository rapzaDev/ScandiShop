import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CartPage from '../pages/CartPage';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';

class Router extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CategoryPage} />
          <Route
            path="/product/:id"
            render={(props) => <ProductPage ID={props.match.params.id} />}
          />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { Router };
