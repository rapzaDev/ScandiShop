/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDataType } from '../../services/graphql/types';

/**
 * @description Verify if the choosen product is already added on cart with the same attributes, and returns true if
 *   is a new product or false if is already in the cart. */
export function addProductToCartControl(
  PRODUCT: ProductDataType,
  cartProducts: ProductDataType[]
): boolean {
  // CONTROL VARIABLES
  let productIsNewOnCart = true;

  const data = cartProducts.find(
    (product) => product.KEY_ID === PRODUCT.KEY_ID
  );

  if (data) productIsNewOnCart = false;

  return productIsNewOnCart;
}

/**
 *@description Increases the quantity of the product who invoke this function and set the new data on cartProducts context
 *and in localStorage.

 @param getLocalStorageDataProducts
    ActionCreatorWithPreparedPayload< [ products: ProductDataType[] ], ProductDataType[], string, never, never >
 */
export function increaseProductQuantity(
  product: ProductDataType,
  CART_PRODUCTS: ProductDataType[],
  getLocalStorageDataProducts: any
) {
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

/** 
 * @description If productIsNewOnCart variable is true, this function adds the product to cart products and to the localStorage.
*   Otherwise, increases the quantity of the product already existent on cart by 1.

    @param getLocalStorageDataProducts
    getLocalStorageDataProducts: ActionCreatorWithPreparedPayload<   
    [ products: ProductDataType[ ] ], 
    ProductDataType[ ], 
    string, 
    never, 
    never > 
*/
export function ADD_PRODUCT_TO_CART(
  productIsNewOnCart: boolean,
  PRODUCT: ProductDataType,
  getLocalStorageDataProducts: any
) {
  const data = localStorage.getItem('@scandishop/cartProducts');
  const cartProductsLocalStorage: ProductDataType[] = data
    ? JSON.parse(data)
    : [];

  if (productIsNewOnCart) {
    // pushing a new value to localStorage array.
    cartProductsLocalStorage.push(PRODUCT);

    // adding all data of local storage on cartProducts context array.
    getLocalStorageDataProducts(cartProductsLocalStorage);

    localStorage.setItem(
      '@scandishop/cartProducts',
      JSON.stringify(cartProductsLocalStorage)
    );
  } else {
    increaseProductQuantity(
      PRODUCT,
      cartProductsLocalStorage,
      getLocalStorageDataProducts
    );
  }
}

/**
 * @description Returns cart products data.
 *
 * @param cartProducts
 * cart products context state.
 */
export function CART_PRODUCTS_DATA(
  cartProducts: ProductDataType[]
): ProductDataType[] {
  const data = localStorage.getItem('@scandishop/cartProducts');
  const cartProductsLocalStorage: ProductDataType[] = data
    ? JSON.parse(data)
    : [];

  return cartProducts.length ? cartProducts : cartProductsLocalStorage;
}

/**
 * @description Return the index of current currency.
 *
 * @param USD if true returns 0
 * @param GBP if true returns 1
 * @param AUD if true returns 2
 * @param JPY if true returns 3
 * @param RUB if true returns 4
 */
export function calculatePriceIndex(
  USD: boolean,
  GBP: boolean,
  AUD: boolean,
  JPY: boolean,
  RUB: boolean
): number {
  const priceIndex =
    (USD && 0) || (GBP && 1) || (AUD && 2) || (JPY && 3) || (RUB && 4) || 0;

  return priceIndex;
}
