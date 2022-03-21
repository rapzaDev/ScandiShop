import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//  GRAPHQL
import { ProductDataType } from '../../services/graphql/types';
//  REDUX
import { RootState } from '../../services/redux/store';
//  STYLES
import { Container } from './styles';

type BagAmountState = {
  products: ProductDataType[];
};

class BagAmount extends PureComponent<PropsFromRedux, BagAmountState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      products: [],
    } as BagAmountState;
  }

  componentDidMount() {
    const { cartProducts } = this.props;

    this.setState(() => ({
      products: cartProducts,
    }));
  }

  componentDidUpdate(prevProps: PropsFromRedux, prevState: BagAmountState) {
    const { cartProducts } = this.props;
    if (prevState.products !== cartProducts) {
      this.setState(() => ({
        products: cartProducts,
      }));
    }
  }

  render() {
    const { products } = this.state;

    const cartProducts = products;

    // const data = localStorage.getItem('@scandishop/cartProducts');
    // const cartProductsLocalStorage: ProductDataType[] = data
    //   ? JSON.parse(data)
    //   : [];

    // const amount = cartProducts.length
    //   ? cartProducts.length
    //   : cartProductsLocalStorage.length;

    const amount = cartProducts.length;

    return (
      <Container id="bag-amount">
        <span>{amount}</span>
      </Container>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const mapState = (state: RootState) => ({
  // CART PRODUCTS STATE
  cartProducts: state.products.cartProducts,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BagAmount);

// -------------------------------- REDUX CONFIG -------------------------------- //
