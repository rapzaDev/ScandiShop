import { ProductDataType } from "../../services/graphql/types";

/** 
* @description Verify if the choosen product is already added on cart with the same attributes, and returns true if
*   is a new product or false if is already in the cart. */
export function addProductToCartControl( PRODUCT: ProductDataType, cartProducts: ProductDataType[]  ): boolean {

    //CONTROL VARIABLES
    let productIsNewOnCart: boolean = true;
     
    const data = cartProducts.find (
        product => product.KEY_ID === PRODUCT.KEY_ID
    )

    if ( data ) productIsNewOnCart = false;

    return productIsNewOnCart;

};


/** 
 * @description If productIsNewOnCart variable is true, this function adds the product to cart products and to the localStorage.
*   Otherwise, it does nothing.

    @param getLocalStorageDataProducts
    getLocalStorageDataProducts: ActionCreatorWithPreparedPayload<   
    [ products: ProductDataType[ ] ], 
    ProductDataType[ ], 
    string, 
    never, 
    never > 
*/
export function ADD_PRODUCT_TO_CART( productIsNewOnCart: boolean, PRODUCT: ProductDataType, getLocalStorageDataProducts: any) {


    if ( productIsNewOnCart ) {

        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

        cartProductsLocalStorage.push(PRODUCT); // pushing a new value to localStorage data array.

        getLocalStorageDataProducts(cartProductsLocalStorage); //adding all data of local storage on cartProducts array.

        localStorage.setItem('@scandishop/cartProducts', JSON.stringify(cartProductsLocalStorage) );

    }

};


/**
 * @description Returns cart products data. 
 * 
 * @param cartProducts 
 * cart products context state.
*/
export function CART_PRODUCTS_DATA( cartProducts: ProductDataType[] ): ProductDataType[] {

    const data = localStorage.getItem('@scandishop/cartProducts');
    const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

    return ( cartProducts.length ? cartProducts : cartProductsLocalStorage )

};


/**
 * @description Return the index of current currency.
 * 
 * @param USD if true returns 0
 * @param GBP if true returns 1
 * @param AUD if true returns 2
 * @param JPY if true returns 3
 * @param RUB if true returns 4
*/
export function calculatePriceIndex( USD: boolean, GBP: boolean, AUD: boolean, JPY: boolean, RUB: boolean ): number {

    const priceIndex = (  
        ( USD && 0 ) ||
        ( GBP && 1 ) ||
        ( AUD && 2 ) ||
        ( JPY && 3 ) ||
        ( RUB && 4 ) ||
        0
    );

    return priceIndex;

}