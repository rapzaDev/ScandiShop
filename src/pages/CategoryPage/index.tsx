/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';

// ICONS
import cartIcon from '../../assets/images/white-cart-icon.svg';
// COMPONENTS
import ColorAttributes from '../../components/ColorAttributes';
import CurrencyOptions from '../../components/CurrencyOptions';
import Header from '../../components/Header';
import MyBag from '../../components/MyBag';
import ShadowWrapper from '../../components/ShadowWrapper';
// GRAPHQL
import { getProducts } from '../../services/graphql/pages/CategoryPage/Queries';
import { AttributeType, ProductDataType } from '../../services/graphql/types';
// REDUX
import CartProductsContext from '../../services/redux/contexts/CartProducts';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';
import { RootState } from '../../services/redux/store';
// UTILS
import {
  addProductToCartControl,
  ADD_PRODUCT_TO_CART,
  calculatePriceIndex,
} from '../../utils/functions';
// STYLES
import {
  CategoryPageContainer,
  Main,
  CategoryContent,
  ProductInfo,
  ProductInfoCartButton,
} from './styles';

type CategoryPageState = {
  redirectProductPage: boolean;
  categoryProducts: ProductDataType[];
};

class CategoryPage extends PureComponent<PropsFromRedux, CategoryPageState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.handleClickOnScreen = this.handleClickOnScreen.bind(this);

    this.state = {
      redirectProductPage: false,
      categoryProducts: [],
    } as CategoryPageState;
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

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

    await this.setCategoryProducts();
  }

  async componentDidUpdate(prevProps: PropsFromRedux) {
    document
      .getElementById('category-page')
      ?.addEventListener('click', this.handleClickOnScreen);

    const { allCategory, clothesCategory, techCategory } = this.props;

    if (prevProps.allCategory !== allCategory) {
      await this.setCategoryProducts();
    }

    if (prevProps.clothesCategory !== clothesCategory) {
      await this.setCategoryProducts();
    }

    if (prevProps.techCategory !== techCategory) {
      await this.setCategoryProducts();
    }
  }

  /**
   * @description Gets the GraphQL products data, based on the current category option,
   * and sets the category products on PLP.
   */
  async setCategoryProducts() {
    // CATEGORIES STATES
    const { allCategory, clothesCategory, techCategory } = this.props;

    const selectedCategory =
      (allCategory && 'all') ||
      (clothesCategory && 'clothes') ||
      (techCategory && 'tech') ||
      'all';

    const products = await getProducts(selectedCategory);

    this.setState(() => ({
      categoryProducts: products,
    }));
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

  /** @description Redirect the user to cart page containing the selected product. */
  handleClickProductInfo(selectedProduct: ProductDataType) {
    localStorage.setItem(
      '@scandishop/selectedProduct',
      JSON.stringify(selectedProduct)
    );

    this.setState((state) => ({
      redirectProductPage: !state.redirectProductPage,
    }));
  }

  /**
   * @description Add a new porduct on Cart and MyBag component and activates MyBag component.
   * If the product is already added on cart, the selected product don't will be added again
   * and the minicart will open to show the existing products there.
   */
  handleClickProductInforCartButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: ProductDataType
  ) {
    /** Controls the click on ProductInforCartButton above ProductInfo component */
    event.stopPropagation();

    const {
      getLocalStorageDataProducts,
      cartProducts,
      handleChangeMyBagState,
    } = this.props;

    const defaultProduct = {} as ProductDataType;

    Object.assign(defaultProduct, {
      ...product,
      attributes: product.attributes.map((attribute) => ({
        ...attribute,
        items: attribute.items.map((item) => {
          if (item.id === attribute.items[0].id) {
            const newItem = {} as AttributeType;
            Object.assign(newItem, {
              ...item,
              selected: true,
            });

            return newItem;
          }

          return item;
        }),
      })),
      quantity: 1,
    });

    Object.assign(defaultProduct, {
      ...defaultProduct,
      KEY_ID:
        JSON.stringify(defaultProduct.id) +
        JSON.stringify(defaultProduct.attributes),
    });

    const productIsNewOnCart = addProductToCartControl(
      defaultProduct,
      cartProducts
    );

    ADD_PRODUCT_TO_CART(
      productIsNewOnCart,
      defaultProduct,
      getLocalStorageDataProducts
    );

    handleChangeMyBagState();
  }

  renderMyBag() {
    const { bagVisible } = this.props;

    if (bagVisible) return <MyBag />;
  }

  renderCurrencyOptions() {
    const { currencyEnabled } = this.props;

    if (currencyEnabled) return <CurrencyOptions />;
  }

  renderProductColors(product: ProductDataType) {
    const [swatchAttibute] = product.attributes.filter(
      (attribute) => attribute.type === 'swatch' && attribute
    );

    if (swatchAttibute)
      return (
        <ColorAttributes
          swatchAttibute={swatchAttibute}
          origin="CategoryPage"
        />
      );
    return <div className="empty-colors" />;
  }

  renderCategoryProducts() {
    // CURRENCIES STATES
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    const priceIndex = calculatePriceIndex(USD, GBP, AUD, JPY, RUB);

    //  MY BAG PROPS
    const { bagVisible } = this.props;

    const { categoryProducts } = this.state;

    return categoryProducts.map((product) => (
      <ProductInfo
        key={product.id}
        id="product-info"
        outOfStock={!product.inStock}
        onClick={() => this.handleClickProductInfo(product)}
      >
        <div className="product-image">
          <img
            className="image"
            src={product.gallery[0]}
            alt={`${product.name} principal image`}
          />

          {!product.inStock && <span className="outOfStock">OUT OF STOCK</span>}

          <ProductInfoCartButton
            id="product-cart-button"
            Opaque={bagVisible}
            onClick={(event) =>
              this.handleClickProductInforCartButton(event, product)
            }
          >
            <img src={cartIcon} alt="ProductInfoCartButton cart button" />
          </ProductInfoCartButton>
        </div>

        {this.renderProductColors(product)}

        <div className="product-names">
          <span className="product-title">{product.name} -</span>
          <span className="product-brand">{product.brand}</span>
        </div>

        <span className="product-price">
          {product.prices[priceIndex].currency.symbol}
          {product.prices[priceIndex].currency.label}
          {` ${product.prices[priceIndex].amount}`}
        </span>
      </ProductInfo>
    ));
  }

  render() {
    // CATEGORIES STATES
    const { allCategory, clothesCategory, techCategory } = this.props;

    const { bagVisible } = this.props;

    const { redirectProductPage } = this.state;

    return (
      <CategoryPageContainer id="category-page">
        <Header />

        <ShadowWrapper active={bagVisible} />

        {this.renderCurrencyOptions()}

        {this.renderMyBag()}

        <Main>
          <div className="category-container">
            <h2>
              {(allCategory && 'All') ||
                (clothesCategory && 'Clothes') ||
                (techCategory && 'Tech')}
            </h2>

            <CategoryContent className="category-content">
              {this.renderCategoryProducts()}
            </CategoryContent>
          </div>
        </Main>

        {redirectProductPage && <Navigate to="/product" />}
      </CategoryPageContainer>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const {
  handleChangeMyBagState,
  activateMyBagComponent,
  deactivateMyBagComponent,
} = MyBagContext.actions;

const {
  handleChangeMyCurrencyOptionsState,
  activateCurrencyOptionsComponent,
  deactivateCurrencyOptionsComponent,
} = CurrencyOptionsContext.actions;

const { getLocalStorageDataProducts } = CartProductsContext.actions;

const mapState = (state: RootState) => ({
  //  MY BAG COMPONENT STATES
  bagVisible: state.myBag.value,
  bagActive: state.myBag.bagActive,
  //  CURRENCY OPTIONS COMPONENT STATES
  currencyEnabled: state.currencyOptions.value,
  currencyOptionsActive: state.currencyOptions.currencyOptionsActive,
  //  CATEGORIES STATES
  allCategory: state.categories.all,
  clothesCategory: state.categories.clothes,
  techCategory: state.categories.tech,
  //  CURRENCIES STATES
  USD: state.currencies.USD,
  GBP: state.currencies.GBP,
  AUD: state.currencies.AUD,
  JPY: state.currencies.JPY,
  RUB: state.currencies.RUB,
  // CART PRODUCTS STATE
  cartProducts: state.products.cartProducts,
});

const mapDispatch = {
  //  MY BAG COMPONENT FUNCTIONS
  handleChangeMyBagState,
  activateMyBagComponent,
  deactivateMyBagComponent,
  //  CURRENCY OPTIONS COMPONENT FUNCTIONS
  handleChangeMyCurrencyOptionsState,
  activateCurrencyOptionsComponent,
  deactivateCurrencyOptionsComponent,
  //  CART PRODUCTS FUNCTIONS
  getLocalStorageDataProducts,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CategoryPage);

// -------------------------------- REDUX CONFIG -------------------------------- //
