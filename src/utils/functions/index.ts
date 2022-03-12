import { ProductDataType } from "../../services/graphql/types";

/** Verify if the choosen product is already added on cart with the same attributes, and returns true if
*   is a new product or false if is already in the cart. */
export function addProductToCartControl( PRODUCT: ProductDataType, cartProducts: ProductDataType[]  ): boolean {

    //CONTROL VARIABLES
    let productIsNewOnCart: boolean = true; // start with true 
     
    const data = cartProducts.find (
        product => product.KEY_ID === PRODUCT.KEY_ID
    )

    if ( data ) productIsNewOnCart = false;

    return productIsNewOnCart;

};

/** If productIsNewOnCart variable is true, this function adds the product to cart products and to the localStorage.
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

/**Returns cart products data. 
 * 
 * @param cartProducts 
 * cart products context state.
*/
export function CART_PRODUCTS_DATA( cartProducts: ProductDataType[] ): ProductDataType[] {

    const data = localStorage.getItem('@scandishop/cartProducts');
    const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

    return ( cartProducts.length ? cartProducts : cartProductsLocalStorage )

};