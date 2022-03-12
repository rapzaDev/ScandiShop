import { ProductDataType } from "../../services/graphql/types";

// /** Verify if the choosen product is already added on cart with the same attributes, and returns true if
// *   is a new product or false if is already in the cart. */
// export function addProductToCartControl( PRODUCT: ProductDataType, cartProducts: ProductDataType[]  ): boolean {

//     //CONTROL VARIABLES
//     let same_product: boolean[] = [];
//     let productIsNewOnCart: boolean = true; // start with true 
     
//     let PRODUCT_ATTRIBUTES = PRODUCT.attributes; ////

//     //If the array is empty, the selected product is always new.
//     if ( cartProducts.length === 0 ) productIsNewOnCart = true;
//     else {
        
//         cartProducts.forEach( 
//             product => {

//                 if ( product.id !== PRODUCT.id ) return;

//                 if ( ( product.id === PRODUCT.id ) && ( product.attributes.length > 0 ) ) {
                    
//                     product.attributes.forEach( 

//                         attribute => {

//                             const currentAttribute = PRODUCT_ATTRIBUTES.find(
//                                 currentAttribute => attribute.name === currentAttribute.name
//                             )

//                             if ( currentAttribute ) {

//                                 /**item of the attribute's product in the cart that's setted as true */
//                                 const productCartItem = attribute.items.find(
//                                     item => item.selected === true
//                                 )

//                                 /**item of the attributes's PRODUCTS that's setted as true */ 
//                                 const productItem = currentAttribute.items.find(
//                                     item => item.selected === true
//                                 )

//                                 // if the both exists
//                                 if ( productItem && productCartItem ) {

//                                     if ( productCartItem.id === productItem.id ) same_product.push(true);
//                                     else same_product.push(false);

//                                 }

//                             }

//                         }
                        
//                     )

//                 }

//                 /**For products that doesn't have attributes */
//                 if ( product.id === PRODUCT.id && ( !product.attributes.length ) ) same_product.push(true);


//                 /** If same_productVerification is empty, the product already exists on cartProducts bacause all attributes
//                  *  are the same and will there no one setted as false. 
//                 **/
//                 const same_productVerification = same_product.filter( target => target === false );
//                 if ( !same_productVerification.length ) productIsNewOnCart = false;

                
//                 //CONTROL RESET FOR THE NEXT PRODUCT ( OF EXISTS )
//                 same_product = [];

//             } 

//         )

//     }

//     return productIsNewOnCart;

// };


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