import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//  GRAPHQL
import { ProductDataType } from '../../services/graphql/types';
//  REDUX
import CartProductsContext from '../../services/redux/contexts/CartProducts';
import { RootState } from '../../services/redux/store';
//  STYLES
import { Container } from './styles';

class BagAmount extends PureComponent<PropsFromRedux> {
  componentDidMount() {
    const { cartProducts, getLocalStorageDataProducts } = this.props;

    const data = localStorage.getItem('@scandishop/cartProducts');
    const cartProductsLocalStorage: ProductDataType[] = data
      ? JSON.parse(data)
      : [];

    if (cartProductsLocalStorage.length && !cartProducts.length) {
      getLocalStorageDataProducts(cartProductsLocalStorage);
    }
  }

  render() {
    const { cartProducts } = this.props;

    const data = localStorage.getItem('@scandishop/cartProducts');
    const cartProductsLocalStorage: ProductDataType[] = data
      ? JSON.parse(data)
      : [];

    const amount = cartProducts.length
      ? cartProducts.length
      : cartProductsLocalStorage.length;

    return (
      <Container id="bag-amount">
        <span>{amount}</span>
      </Container>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getLocalStorageDataProducts } = CartProductsContext.actions;

const mapState = (state: RootState) => ({
  // CART PRODUCTS STATE
  cartProducts: state.products.cartProducts,
});

const mapDispatch = {
  //  CART PRODUCTS FUNCTION
  getLocalStorageDataProducts,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BagAmount);

// -------------------------------- REDUX CONFIG -------------------------------- //
