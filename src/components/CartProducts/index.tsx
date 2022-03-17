/* eslint-disable react/jsx-pascal-case */
import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//  ICONS
import arrowLeft from '../../assets/images/arrow-left.svg';
import arrowRight from '../../assets/images/arrow-right.svg';
//  GRAPHQL
import { ProductDataType } from '../../services/graphql/types';
//  REDUX
import CartProductsContext from '../../services/redux/contexts/CartProducts';
import { RootState } from '../../services/redux/store';
//  UTILS
import { calculatePriceIndex, CART_PRODUCTS_DATA } from '../../utils/functions';
//  COMPONENTS
import ProductAttributes from '../ProductAttributes';
//  STYLES
import {
  //  STYLED COMPONENTS FOR MY BAG COMPONENT
  ProductWrapper_MYBAG,
  EmptyCart_MYBAG,
  ProductContainer_MYBAG,
  ProductInfo_MYBAG,
  SelectQuantity_MYBAG,
  // STYLED COMPONENTS FOR PRODUCT PAGE
  ProductWrapper_PDP,
  EmptyCart_PDP,
  ProductContainer_PDP,
  ProductInfo_PDP,
  SelectQuantity_PDP,
} from './styles';

interface ICartProductsProps extends PropsFromRedux {
  origin: 'MyBag' | 'CartPage';
}

type ImageIndex = {
  KEY_ID: string;
  index: number;
};

type CartProductsState = {
  CART_PRODUCTS: ProductDataType[];

  /** @description Variable to control the logic of the displayed image of each product on PDP. */
  images_index: ImageIndex[];
};

/**
 * @description Component that will render the cart products based on the origin.
 * @property origin: Can be 'MyBag' or 'CartPage'.
 */
class CartProducts extends PureComponent<
  ICartProductsProps,
  CartProductsState
> {
  constructor(props: ICartProductsProps) {
    super(props);

    this.state = {
      CART_PRODUCTS: [] as ProductDataType[],
      images_index: [] as ImageIndex[],
    } as CartProductsState;
  }

  componentDidMount() {
    const { cartProducts } = this.props;

    this.setState(() => ({
      CART_PRODUCTS: CART_PRODUCTS_DATA(cartProducts),
      images_index: this.setImagesIndex(),
    }));
  }

  componentDidUpdate(_: ICartProductsProps, prevState: CartProductsState) {
    const { cartProducts } = this.props;

    const NEW_CART_PRODUCTS = CART_PRODUCTS_DATA(cartProducts);

    /** avoid infinite loop */
    if (prevState.CART_PRODUCTS.length === 0) return;

    /**
     *If the user change the quantity of any product in MyBag component, that will
     *be reflected on PDP too with this conditional.
     */
    if (prevState.CART_PRODUCTS !== NEW_CART_PRODUCTS) {
      this.setState(() => ({
        CART_PRODUCTS: CART_PRODUCTS_DATA(cartProducts),
      }));
    }
  }

  /** @description Set the inital state of images_index[ ] */
  setImagesIndex(): ImageIndex[] {
    const { cartProducts } = this.props;

    const products = CART_PRODUCTS_DATA(cartProducts);

    const images_index = products.map<ImageIndex>((product) => ({
      KEY_ID: product.KEY_ID,
      index: 0,
    }));

    return images_index;
  }

  /**
   *@description Increases the quantity of the product who invoke this function and set the new data on cartProducts context
   *and in localStorage.
   */
  increaseProductQuantity(
    product: ProductDataType,
    CART_PRODUCTS: ProductDataType[]
  ) {
    const { getLocalStorageDataProducts } = this.props;

    const newCartProduct = {} as ProductDataType;

    const NEW_CART_PRODUCTS = CART_PRODUCTS.map((cartProduct) => {
      if (cartProduct.KEY_ID === product.KEY_ID) {
        Object.assign(newCartProduct, {
          ...cartProduct,
          quantity: cartProduct.quantity + 1,
        });

        return newCartProduct;
      }

      return cartProduct;
    });

    getLocalStorageDataProducts(NEW_CART_PRODUCTS);
    localStorage.setItem(
      '@scandishop/cartProducts',
      JSON.stringify(NEW_CART_PRODUCTS)
    );

    return NEW_CART_PRODUCTS;
  }

  handleClickPlusSignButton(product: ProductDataType) {
    const { CART_PRODUCTS } = this.state;

    this.setState(() => ({
      CART_PRODUCTS: this.increaseProductQuantity(product, CART_PRODUCTS),
    }));
  }

  /**
   *  @description Decreases the quantity of the product who invoke this function and set the new data on cartProducts context
   *  and in localStorage.
   */
  decreaseProductQuantity(
    product: ProductDataType,
    CART_PRODUCTS: ProductDataType[]
  ) {
    const { getLocalStorageDataProducts } = this.props;

    const newCartProduct = {} as ProductDataType;

    let NEW_CART_PRODUCTS = CART_PRODUCTS.map((cartProduct) => {
      if (cartProduct.KEY_ID === product.KEY_ID) {
        Object.assign(newCartProduct, {
          ...cartProduct,
          quantity: cartProduct.quantity - 1,
        });

        return newCartProduct;
      }

      return cartProduct;
    });

    /** If any product had his quantity reduced to zero don't will be in the NEW_CART_PRODUCTS */
    NEW_CART_PRODUCTS = NEW_CART_PRODUCTS.filter(
      (cartProduct) => cartProduct.quantity > 0
    );

    getLocalStorageDataProducts(NEW_CART_PRODUCTS);
    localStorage.setItem(
      '@scandishop/cartProducts',
      JSON.stringify(NEW_CART_PRODUCTS)
    );

    return NEW_CART_PRODUCTS;
  }

  handleClickMinusSignButton(product: ProductDataType) {
    const { CART_PRODUCTS } = this.state;

    this.setState(() => ({
      CART_PRODUCTS: this.decreaseProductQuantity(product, CART_PRODUCTS),
    }));
  }

  getStrongProductTitle(product: ProductDataType): string {
    // TITLE LOGIC
    const title = product.name.split(' ');
    let strongTitle = title[0];
    const restOfTitle = title.filter((title) => title !== strongTitle);

    // Cheking if the first word of the var restOfTitle is a number
    if (Number(restOfTitle[0])) strongTitle += ` ${restOfTitle[0]}`;

    return strongTitle;
  }

  getRestOfProductTitle(product: ProductDataType): string[] {
    // TITLE LOGIC
    const title = product.name.split(' ');
    const strongTitle = title[0];
    let restOfTitle = title.filter((title) => title !== strongTitle);

    // Cheking if the first word of the var restOfTitle is a number
    if (Number(restOfTitle[0])) restOfTitle.splice(0);

    restOfTitle = restOfTitle.map((word) => `${word} `);

    return restOfTitle;
  }

  /** @description Controls the click on the left arrow inside the image on PDP to switch images to the left. */
  leftArrowClick(product: ProductDataType) {
    const { images_index } = this.state;

    const data = images_index.find(
      (target) => target.KEY_ID === product.KEY_ID
    );

    if (data) {
      if (data.index === 0) data.index = product.gallery.length - 1;
      else --data.index;

      const newImages_index = images_index.map((target) => {
        if (target.KEY_ID === data.KEY_ID) return data;
        return target;
      });

      this.setState(() => ({
        images_index: newImages_index,
      }));
    }
  }

  /** @description Controls the click on the right arrow inside the image on PDP to switch images to the right. */
  rightArrowClick(product: ProductDataType) {
    const { images_index } = this.state;

    const data = images_index.find(
      (target) => target.KEY_ID === product.KEY_ID
    );

    if (data) {
      if (data.index === product.gallery.length - 1) data.index = 0;
      else ++data.index;

      const newImages_index = images_index.map((target) => {
        if (target.KEY_ID === data.KEY_ID) return data;
        return target;
      });

      this.setState(() => ({
        images_index: newImages_index,
      }));
    }
  }

  renderProductImages(product: ProductDataType) {
    if (product.gallery.length === 1) {
      return (
        <div className="product-image_PDP">
          <img src={product.gallery[0]} alt={product.gallery[0]} />
        </div>
      );
    }

    const { images_index } = this.state;

    const data = images_index.find(
      (target) => target.KEY_ID === product.KEY_ID
    );

    let index = 0;

    if (data) index = data.index;

    return (
      <div className="product-image_PDP">
        <button
          type="button"
          className="left-arrow"
          onClick={() => this.leftArrowClick(product)}
        >
          <img src={arrowLeft} alt="Arrow left icon" />
        </button>

        <img src={product.gallery[index]} alt={product.gallery[index]} />

        <button
          type="button"
          className="right-arrow"
          onClick={() => this.rightArrowClick(product)}
        >
          <img src={arrowRight} alt="Arrow right icon" />
        </button>
      </div>
    );
  }

  /**
   * @description Render the cart products based on the origin.
   *
   * @var origin: Can be 'MyBag' or 'CartPage'.
   */
  // eslint-disable-next-line consistent-return
  renderCartProducts() {
    const { CART_PRODUCTS } = this.state;

    // CURRENCIES STATES
    const { USD, GBP, AUD, JPY, RUB } = this.props;

    // ORIGIN
    const { origin } = this.props;

    const priceIndex = calculatePriceIndex(USD, GBP, AUD, JPY, RUB);

    // --------- RENDER FOR MY BAG COMPONENT ---------
    if (origin === 'MyBag') {
      if (CART_PRODUCTS.length) {
        return (
          <ProductWrapper_MYBAG className="product-wrapper_MYBAG">
            {CART_PRODUCTS.map((product) => (
              <ProductContainer_MYBAG
                className="product-container_MYBAG"
                key={
                  JSON.stringify(product.id) +
                  JSON.stringify(product.attributes)
                }
              >
                <ProductInfo_MYBAG className="product-info_MYBAG">
                  <span className="product-title_MYBAG">
                    {product.name}
                    {` - ${product.brand}`}
                  </span>
                  <div className="product-price_MYBAG">
                    <span>
                      {product.prices[priceIndex].currency.symbol}
                      {`${product.prices[priceIndex].currency.label} `}
                      {product.prices[priceIndex].amount}
                    </span>
                  </div>

                  <div id="attributes_MYBAG">
                    <ProductAttributes
                      origin="MyBag"
                      productAttributes={product.attributes}
                    />
                  </div>
                </ProductInfo_MYBAG>

                <SelectQuantity_MYBAG className="select-quantity_MYBAG">
                  <button
                    aria-label="plus-sign"
                    type="button"
                    className="plus-sign_MYBAG"
                    onClick={() => this.handleClickPlusSignButton(product)}
                  />
                  <span>{product.quantity}</span>
                  <button
                    aria-label="minus-sign"
                    type="button"
                    className="minus-sign_MYBAG"
                    onClick={() => this.handleClickMinusSignButton(product)}
                  />
                </SelectQuantity_MYBAG>

                <div className="product-image_MYBAG">
                  <img src={product.gallery[0]} alt={product.gallery[0]} />
                </div>
              </ProductContainer_MYBAG>
            ))}
          </ProductWrapper_MYBAG>
        );
      }
      return (
        <EmptyCart_MYBAG className="empty-cart_MYBAG">
          <span>YOUR BAG IS EMPTY</span>
          <span>Add Products</span>
        </EmptyCart_MYBAG>
      );
    }

    // --------- RENDER FOR CART PAGE ---------
    if (origin === 'CartPage') {
      if (CART_PRODUCTS.length) {
        return (
          <ProductWrapper_PDP className="product-wrapper_PDP">
            {CART_PRODUCTS.map((product) => (
              <ProductContainer_PDP
                className="product-container_PDP"
                key={
                  JSON.stringify(product.id) +
                  JSON.stringify(product.attributes)
                }
                style={
                  // eslint-disable-next-line react/destructuring-assignment
                  this.props.bagVisible ? { filter: 'brightness(0.78)' } : {}
                }
              >
                <ProductInfo_PDP className="product-info_PDP">
                  <div className="product-title_PDP">
                    <strong>{this.getStrongProductTitle(product)}</strong>
                    <span>{this.getRestOfProductTitle(product)}</span>
                    <span>{` - ${product.brand}`}</span>
                  </div>

                  <div className="product-price_PDP">
                    <span>
                      {product.prices[priceIndex].currency.symbol}
                      {`${product.prices[priceIndex].currency.label} `}
                      {product.prices[priceIndex].amount}
                    </span>
                  </div>

                  <div id="attributes_PDP">
                    <ProductAttributes
                      origin="CartPage"
                      productAttributes={product.attributes}
                    />
                  </div>
                </ProductInfo_PDP>

                <SelectQuantity_PDP className="select-quantity_PDP">
                  <button
                    aria-label="plus-sign"
                    type="button"
                    className="plus-sign_PDP"
                    onClick={() => this.handleClickPlusSignButton(product)}
                  />
                  <span>{product.quantity}</span>
                  <button
                    aria-label="minus-sign"
                    type="button"
                    className="minus-sign_PDP"
                    onClick={() => this.handleClickMinusSignButton(product)}
                  />
                </SelectQuantity_PDP>

                {this.renderProductImages(product)}
              </ProductContainer_PDP>
            ))}
          </ProductWrapper_PDP>
        );
      }
      return (
        <EmptyCart_PDP className="empty-cart_PDP">
          <span>YOUR BAG IS EMPTY</span>
          <span>Add Products</span>
        </EmptyCart_PDP>
      );
    }
  }

  render() {
    return this.renderCartProducts();
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getLocalStorageDataProducts } = CartProductsContext.actions;

const mapState = (state: RootState) => ({
  //  MY BAG COMPONENT STATES
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
  //  CART PRODUCTS FUNCTION
  getLocalStorageDataProducts,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartProducts);

// -------------------------------- REDUX CONFIG -------------------------------- //
