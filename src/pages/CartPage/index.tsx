import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// COMPONENTS
import CartProductsContent from '../../components/CartProducts';
import CurrencyOptions from '../../components/CurrencyOptions';
import Header from '../../components/Header';
import MyBag from '../../components/MyBag';
import ShadowWrapper from '../../components/ShadowWrapper';
// REDUX
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';
import { RootState } from '../../services/redux/store';
// STYLES
import { CartPageContainer, Main } from './styles';

class CartPage extends PureComponent<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    document
      .getElementById('cart-page')
      ?.addEventListener('click', this.handleClickOnScreen);

    const {
      bagVisible,
      handleChangeMyBagState,
      currencyEnabled,
      handleChangeMyCurrencyOptionsState,
    } = this.props;

    // Cheking if MyBag component was rendered before page rendering
    if (bagVisible) handleChangeMyBagState();

    // Cheking if CurrencyOptions component was rendered before page rendering
    if (currencyEnabled) handleChangeMyCurrencyOptionsState();
  }

  handleClickOnScreen() {
    const {
      bagVisible,
      bagActive,
      currencyEnabled,
      currencyOptionsActive,
      handleChangeMyCurrencyOptionsState,
      handleChangeMyBagState,
    } = this.props;

    const verificationControl = {
      currencyOptions: currencyEnabled && currencyOptionsActive === false,
      myBag: bagVisible && bagActive === false,
    };

    if (verificationControl.currencyOptions)
      handleChangeMyCurrencyOptionsState();

    if (verificationControl.myBag) handleChangeMyBagState();
  }

  renderMyBag() {
    const { bagVisible } = this.props;

    if (bagVisible) return <MyBag />;
  }

  renderCurrencyOptions() {
    const { currencyEnabled } = this.props;

    if (currencyEnabled) return <CurrencyOptions />;
  }

  render() {
    const { bagVisible } = this.props;

    return (
      <CartPageContainer id="cart-page">
        <Header />

        {this.renderCurrencyOptions()}

        {this.renderMyBag()}

        <ShadowWrapper active={bagVisible} />

        <Main>
          <h2>CART</h2>

          <CartProductsContent origin="CartPage" />
        </Main>
      </CartPageContainer>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const { handleChangeMyBagState, activateMyBagComponent } = MyBagContext.actions;

const { handleChangeMyCurrencyOptionsState } = CurrencyOptionsContext.actions;

const mapState = (state: RootState) => ({
  //  MY BAG COMPONENT STATES
  bagVisible: state.myBag.value,
  bagActive: state.myBag.bagActive,
  //  CURRENCY OPTIONS COMPONENT STATES
  currencyEnabled: state.currencyOptions.value,
  currencyOptionsActive: state.currencyOptions.currencyOptionsActive,
});

const mapDispatch = {
  //  MY BAG COMPONENT FUNCTIONS
  handleChangeMyBagState,
  activateMyBagComponent,
  //  CURRENCY OPTIONS COMPONENT FUNCTION
  handleChangeMyCurrencyOptionsState,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartPage);

// -------------------------------- REDUX CONFIG -------------------------------- //
