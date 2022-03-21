import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';

//  ICONS
import cartIcon from '../../assets/images/cart-icon.svg';
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import scandishopLogo from '../../assets/images/scandishop-logo.svg';
import arrowUpIcon from '../../assets/images/up-arrow-icon.svg';
// GRAPHQL
import {
  getCategoryNames,
  getCurrenciesSymbols,
} from '../../services/graphql/components/Header/Queries';
// REDUX
import CategoriesContext from '../../services/redux/contexts/Categories';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';
import { RootState } from '../../services/redux/store';
//  UTILS
import { calculatePriceIndex } from '../../utils/functions';
// COMPONENTS
import BagAmount from '../BagAmount';
import SelectCategoryButton from '../SelectCategoryButton';
// STYLES
import {
  HeaderComponent,
  CurrencyAndCart,
  CurrencyButton,
  CartContainer,
} from './styles';

type HeaderState = {
  categoryNames: string[];
  redirectCartPage: boolean;
  currencySymbol: string;
};

class Header extends PureComponent<PropsFromRedux, HeaderState> {
  constructor(props: PropsFromRedux) {
    super(props);

    this.state = {
      categoryNames: [],
      redirectCartPage: false,
      currencySymbol: '',
    } as HeaderState;
  }

  async componentDidMount() {
    const categoryNamesData = await getCategoryNames();

    const symbol = await this.getCurrencySymbol();

    this.setState(() => ({
      categoryNames: categoryNamesData,
      currencySymbol: symbol,
    }));
  }

  async componentDidUpdate(prevProps: PropsFromRedux) {
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    if (
      prevProps.USD !== USD ||
      prevProps.GBP !== GBP ||
      prevProps.AUD !== AUD ||
      prevProps.JPY !== JPY ||
      prevProps.RUB !== RUB
    ) {
      const symbol = await this.getCurrencySymbol();

      this.setState(() => ({
        currencySymbol: symbol,
      }));
    }
  }

  /**
   * @returns The current currency symbol
   */
  async getCurrencySymbol() {
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    const index = calculatePriceIndex(USD, GBP, AUD, JPY, RUB);

    const currenciesSymbols = await getCurrenciesSymbols();

    return currenciesSymbols[index].symbol;
  }

  /**
   * @description Changes the selected category button. If the user clicks on any category button
   * and the current page isn't PLP, the user will be redirected to PLP after that.
   */
  handleClickCategoryButton(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const { setAllCategory, setClothesCategory, setTechCategory } = this.props;
    const { value } = e.currentTarget;

    switch (value) {
      case 'all':
        setAllCategory();
        break;

      case 'clothes':
        setClothesCategory();
        break;

      case 'tech':
        setTechCategory();

        break;

      default:
        break;
    }

    const windowLocation = window.location.pathname;

    if (windowLocation === '/') window.scrollTo(0, 0);
    else {
      this.setState(({ redirectCartPage }) => ({
        redirectCartPage: !redirectCartPage,
      }));
    }
  }

  handleCurrencyButton() {
    const { handleChangeMyCurrencyOptionsState } = this.props;
    handleChangeMyCurrencyOptionsState();
  }

  handleClickCartButton() {
    const { handleChangeMyBagState } = this.props;
    handleChangeMyBagState();
  }

  renderCategoryButtons() {
    const { categoryNames } = this.state;
    const { allCategory, clothesCategory, techCategory } = this.props;

    return (
      <div className="category-buttons">
        {categoryNames.map((categoryName) => (
          <SelectCategoryButton
            key={categoryName}
            onClick={(e) => this.handleClickCategoryButton(e)}
            value={categoryName}
            isSelected={
              (categoryName === 'all' && allCategory) ||
              (categoryName === 'clothes' && clothesCategory) ||
              (categoryName === 'tech' && techCategory)
            }
          >
            {categoryName}
          </SelectCategoryButton>
        ))}
      </div>
    );
  }

  renderCurrencyButton() {
    const { currencyEnabled } = this.props;

    const { currencySymbol } = this.state;

    return (
      <div className="currency">
        <CurrencyButton onClick={() => this.handleCurrencyButton()}>
          <span>{currencySymbol}</span>
        </CurrencyButton>
        {currencyEnabled ? (
          <img src={arrowUpIcon} alt="Arrow Up Icon" />
        ) : (
          <img src={arrowDownIcon} alt="Arrow Down Icon" />
        )}
      </div>
    );
  }

  renderCart() {
    return (
      <CartContainer className="cart">
        <button type="button" onClick={() => this.handleClickCartButton()}>
          <img src={cartIcon} alt="Cart Icon" />
        </button>

        <BagAmount />
      </CartContainer>
    );
  }

  render() {
    const { redirectCartPage } = this.state;

    return (
      <>
        <HeaderComponent>
          {this.renderCategoryButtons()}

          <div className="logo-div">
            <img src={scandishopLogo} alt="Website Logo icon" />
          </div>

          <CurrencyAndCart className="currency-and-cart">
            {this.renderCurrencyButton()}

            {this.renderCart()}
          </CurrencyAndCart>
        </HeaderComponent>

        {redirectCartPage && <Redirect to="/" />}
      </>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const { handleChangeMyBagState } = MyBagContext.actions;

const { handleChangeMyCurrencyOptionsState } = CurrencyOptionsContext.actions;

const { setAllCategory, setClothesCategory, setTechCategory } =
  CategoriesContext.actions;

const mapState = (state: RootState) => ({
  //  CURRENCY OPTIONS COMPONENT STATES
  currencyEnabled: state.currencyOptions.value,
  //  CATEGORIES STATES
  allCategory: state.categories.all,
  clothesCategory: state.categories.clothes,
  techCategory: state.categories.tech,
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
  //  MY BAG COMPONENT FUNCTION
  handleChangeMyBagState,
  //  CURRENCY OPTIONS COMPONENT FUNCTION
  handleChangeMyCurrencyOptionsState,
  //  CATEGORIES FUNCTIONS
  setAllCategory,
  setClothesCategory,
  setTechCategory,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);

// -------------------------------- REDUX CONFIG -------------------------------- //
