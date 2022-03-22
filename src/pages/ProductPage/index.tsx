import parse from 'html-react-parser';
import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// COMPONENTS
import CurrencyOptions from '../../components/CurrencyOptions';
import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import ImagesContainer from '../../components/ImagesContainer';
import MyBag from '../../components/MyBag';
import ProductAttributes from '../../components/ProductAttributes';
import ShadowWrapper from '../../components/ShadowWrapper';
// GRAPHQL
import { getProduct } from '../../services/graphql/pages/ProductPage/Queries';
import { AttributeType, ProductDataType } from '../../services/graphql/types';
// REDUX
import CartProductsContext from '../../services/redux/contexts/CartProducts';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';
import { RootState } from '../../services/redux/store';
import {
  addProductToCartControl,
  ADD_PRODUCT_TO_CART,
} from '../../utils/functions';
// STYLES
import {
  ProductPageContainer,
  Main,
  ProductContainer,
  ProductContent,
} from './styles';

interface IProductPageProps extends PropsFromRedux {
  ID: string;
  location: string;
}

type ProductPageState = {
  product: ProductDataType;
};

class ProductPage extends PureComponent<IProductPageProps, ProductPageState> {
  constructor(props: IProductPageProps) {
    super(props);

    this.state = {
      product: {},
    } as ProductPageState;
  }

  componentDidMount() {
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

    const { ID } = this.props;

    getProduct(ID).then((data) =>
      this.setState(() => ({
        product: data,
      }))
    );
  }

  handleClickOnScreen() {
    const {
      bagVisible,
      currencyEnabled,
      handleChangeMyCurrencyOptionsState,
      handleChangeMyBagState,
    } = this.props;

    const verificationControl = {
      currencyOptions: currencyEnabled,
      myBag: bagVisible,
    };

    if (verificationControl.currencyOptions)
      handleChangeMyCurrencyOptionsState();

    if (verificationControl.myBag) handleChangeMyBagState();
  }

  /** @description Returns a product with the selected textAttributes and swatchAttributes choosen on PDP. */
  settingProductData(currentProduct: ProductDataType) {
    const { TEXT_ATTRIBUTES, COLOR_ATTRIBUTES } = this.props;

    // eslint-disable-next-line prefer-const
    let productData = {} as ProductDataType;
    productData.attributes = [];

    currentProduct.attributes.forEach((attribute) => {
      if (attribute.type === 'text') {
        const TEXT_ATTRIBUTE = TEXT_ATTRIBUTES.find(
          (textAttribute) => attribute.name === textAttribute.name
        );

        if (TEXT_ATTRIBUTE !== undefined) {
          const item = TEXT_ATTRIBUTE.items.find(
            (target) => target.value === true
          );

          if (item !== undefined) {
            const itemsData: AttributeType[] =
              TEXT_ATTRIBUTE.items.map<AttributeType>((target) => ({
                id: target.name,
                value: target.name,
                selected: target.value,
              }));

            productData.attributes.push({
              id: attribute.id,
              name: attribute.name,
              type: attribute.type,
              items: itemsData,
            });

            return attribute;
          }
        }
      }

      if (attribute.type === 'swatch') {
        const COLOR_ATTRIBUTE = COLOR_ATTRIBUTES.find(
          (colorAttribute) => colorAttribute.selected === true
        );

        if (COLOR_ATTRIBUTE !== undefined) {
          const itemsData: AttributeType[] = COLOR_ATTRIBUTES.map(
            (colorAttribute) => ({
              id: colorAttribute.id,
              value: colorAttribute.value,
              selected: colorAttribute.selected,
            })
          );

          productData.attributes.push({
            id: attribute.id,
            name: attribute.name,
            type: attribute.type,
            items: itemsData,
          });

          return attribute;
        }
      }
    });

    Object.assign(productData, {
      ...currentProduct,
      attributes: productData.attributes,
      quantity: 1,
    });

    Object.assign(productData, {
      ...productData,
      KEY_ID:
        JSON.stringify(productData.id) + JSON.stringify(productData.attributes),
    });

    return productData;
  }

  handleClickAddToCartButton(currentProduct: ProductDataType) {
    const {
      addProductToCart,
      increaseCartProductQuantity,
      cartProducts,
      handleChangeMyBagState,
    } = this.props;

    const product = this.settingProductData(currentProduct);

    // product verification
    const productIsNewOnCart = addProductToCartControl(product, cartProducts);

    ADD_PRODUCT_TO_CART(
      productIsNewOnCart,
      product,
      addProductToCart,
      increaseCartProductQuantity
    );

    handleChangeMyBagState();
  }

  renderMyBag() {
    const { bagVisible, location } = this.props;

    if (bagVisible) return <MyBag location={location} />;
  }

  renderCurrencyOptions() {
    const { currencyEnabled } = this.props;

    if (currencyEnabled) return <CurrencyOptions />;
  }

  renderProduct() {
    // PRODUCT STATE
    const { product } = this.state;

    if (!product.name) return;

    // CURRENCIES STATES
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    // MY BAG PROP
    const { bagVisible } = this.props;

    const priceIndex =
      (USD && 0) || (GBP && 1) || (AUD && 2) || (JPY && 3) || (RUB && 4) || 0;

    // TITLE LOGIC
    const title = product.name.split(' ');
    let strongTitle = title[0];
    let restOfTitle = title.filter((title) => title !== strongTitle);

    // Cheking if the first word of the var restOfTitle is a number
    if (Number(restOfTitle[0])) {
      strongTitle += ` ${restOfTitle[0]}`;
      restOfTitle.splice(0);
    }

    restOfTitle = restOfTitle.map((word) => `${word} `);

    return (
      <ProductContainer>
        <ImagesContainer images={product.gallery} shadow={bagVisible} />

        <ProductContent className="product-content">
          <span className="product-title">
            <strong>{strongTitle}</strong>
            <span>{restOfTitle}</span>
            <span>- {product.brand}</span>
          </span>

          <ProductAttributes
            productAttributes={product.attributes}
            origin="ProductPage"
          />

          <div className="product-price">
            <span>PRICE:</span>
            <span>
              {product.prices[priceIndex].currency.symbol}
              {product.prices[priceIndex].currency.label}
              {` ${product.prices[priceIndex].amount}`}
            </span>
          </div>

          <DefaultButton
            className="add-cart-button"
            color="green"
            style={bagVisible ? { filter: 'brightness(0.78)' } : {}}
            onClick={() => this.handleClickAddToCartButton(product)}
            disabled={!product.inStock}
          >
            <span>{product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
          </DefaultButton>

          <div className="product-info">
            <div>{parse(product.description)}</div>
          </div>
        </ProductContent>
      </ProductContainer>
    );
  }

  render() {
    const { bagVisible, location } = this.props;

    return (
      <ProductPageContainer
        id="product-page"
        onClick={() => this.handleClickOnScreen()}
      >
        <Header location={location} />

        {this.renderCurrencyOptions()}

        {this.renderMyBag()}

        <ShadowWrapper active={bagVisible} />

        <Main>{this.renderProduct()}</Main>
      </ProductPageContainer>
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

const { addProductToCart, increaseCartProductQuantity } =
  CartProductsContext.actions;

const mapState = (state: RootState) => ({
  //  MY BAG COMPONENT STATES
  bagVisible: state.myBag.value,
  bagActive: state.myBag.bagActive,
  //  CURRENCY OPTIONS COMPONENT STATES
  currencyEnabled: state.currencyOptions.value,
  currencyOptionsActive: state.currencyOptions.currencyOptionsActive,
  //  CURRENCIES STATES
  USD: state.currencies.USD,
  GBP: state.currencies.GBP,
  AUD: state.currencies.AUD,
  JPY: state.currencies.JPY,
  RUB: state.currencies.RUB,
  //  PRODUCT TEXT ATTRIBUTES STATE
  TEXT_ATTRIBUTES: state.textAttributes.textAttributes,
  //  PRODUCT COLOR ATTRIBUTES STATE
  COLOR_ATTRIBUTES: state.colorAttributes.colorAttributes,
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
  addProductToCart,
  increaseCartProductQuantity,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);

// -------------------------------- REDUX CONFIG -------------------------------- //
