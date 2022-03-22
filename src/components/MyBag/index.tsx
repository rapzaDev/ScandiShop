import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';

// GRAPHQL
import { ProductDataType } from '../../services/graphql/types';
// REDUX
import MyBagContext from '../../services/redux/contexts/MyBag';
import { RootState } from '../../services/redux/store';
// UTILS
import { calculatePriceIndex } from '../../utils/functions';
// COMPONENTS
import CartProductsContent from '../CartProducts';
import DefaultButton from '../DefaultButton';
// STYLES
import { MyBagContainer } from './styles';

interface IMyBagProps extends PropsFromRedux {
  location: string;
}

type MyBagState = {
  redirectCartPage: boolean;
  TOTAL: number;
};

export type MyBagProps = {
  isVisible: boolean;
};

class MyBag extends PureComponent<IMyBagProps, MyBagState> {
  constructor(props: IMyBagProps) {
    super(props);

    this.state = {
      redirectCartPage: false,
      TOTAL: 0,
    } as MyBagState;
  }

  componentDidMount() {
    this.setState(() => ({
      TOTAL: this.settingTotalPrice(),
    }));
  }

  componentDidUpdate() {
    this.setState(() => ({
      TOTAL: this.settingTotalPrice(),
    }));
  }

  handleClickMyBag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  /** @description Returns the total value of all products on cart. */
  settingTotalPrice(): number {
    const { cartProducts } = this.props;

    // CURRENCIES STATES
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    const data = localStorage.getItem('@scandishop/cartProducts');
    const cartProductsLocalStorage: ProductDataType[] = data
      ? JSON.parse(data)
      : [];

    const CART_PRODUCTS = cartProducts.length
      ? cartProducts
      : cartProductsLocalStorage;

    const priceIndex = calculatePriceIndex(USD, GBP, AUD, JPY, RUB);

    let totalData = 0;

    CART_PRODUCTS.forEach((product) => {
      totalData += product.prices[priceIndex].amount * product.quantity;
    });

    totalData = Number(totalData.toFixed(2));

    return totalData;
  }

  handleClickViewBagButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    const { location, handleChangeMyBagState } = this.props;

    if (location === '/cart') handleChangeMyBagState();
    else {
      this.setState(({ redirectCartPage }) => ({
        redirectCartPage: !redirectCartPage,
      }));
    }
  }

  render() {
    const { bagVisible, cartProducts } = this.props;

    console.log(cartProducts);

    // CURRENCIES STATES
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    const { TOTAL } = this.state;

    const priceIndex = calculatePriceIndex(USD, GBP, AUD, JPY, RUB);

    // Trick to show the current symbol and label.
    let symbol = '';
    let label = '';
    if (cartProducts.length) {
      symbol = cartProducts[0].prices[priceIndex].currency.symbol;
      label = cartProducts[0].prices[priceIndex].currency.label;
    }

    /**
     * @description
     * variable to show the quantity of products in cart.
     * */
    const amount = cartProducts.length;

    const { redirectCartPage } = this.state;

    return (
      <>
        <MyBagContainer
          id="my-bag"
          isVisible={bagVisible}
          onClick={(e) => this.handleClickMyBag(e)}
        >
          <div className="bag-description">
            <strong>My Bag, </strong>
            <span>{amount} items</span>
          </div>

          <CartProductsContent origin="MyBag" MyBagproducts={cartProducts} />

          <div className="total-price">
            <span>Total</span>
            <span>
              {symbol}
              {`${label} `}
              {TOTAL || '0.00'}
            </span>
          </div>

          <div className="bag-buttons">
            <DefaultButton
              className="default-button"
              color="default"
              onClick={(e) => this.handleClickViewBagButton(e)}
            >
              VIEW BAG
            </DefaultButton>
            <DefaultButton className="default-button" color="green">
              CHECK OUT
            </DefaultButton>
          </div>
        </MyBagContainer>

        {redirectCartPage && <Redirect to="/cart" />}
      </>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const {
  activateMyBagComponent,
  deactivateMyBagComponent,
  handleChangeMyBagState,
} = MyBagContext.actions;

const mapState = (state: RootState) => ({
  //  MY BAG STATE
  bagVisible: state.myBag.value,
  // CART PRODUCTS STATE
  cartProducts: state.products.cartProducts,
  //  CURRENCIES STATES
  USD: state.currencies.USD,
  GBP: state.currencies.GBP,
  AUD: state.currencies.AUD,
  JPY: state.currencies.JPY,
  RUB: state.currencies.RUB,
});

const mapDispatch = {
  //  MY BAG FUNCTIONS
  activateMyBagComponent,
  deactivateMyBagComponent,
  handleChangeMyBagState,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyBag);

// -------------------------------- REDUX CONFIG -------------------------------- //
