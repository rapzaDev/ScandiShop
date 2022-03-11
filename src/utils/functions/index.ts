import { AttributeType, ProductDataType } from "../../services/graphql/types";

interface ProductItem extends AttributeType {
    attributeName: string;
};

/** Verify if the choosen product is already added on cart with the same attributes, and returns true if
*   is a new product or false if is already in the cart. */
export function addProductToCartControl( PRODUCT: ProductDataType, cartProducts: ProductDataType[]  ): boolean {

    //CONTROL VARIABLES
    let same_product: boolean[] = [];
    let productIsNewOnCart: boolean = true; // start with true 

    /**Contains all items of the product selected and his respective attributes names*/
    const PRODUCT_Items = [] as ProductItem[]; 
    
    //Filling PRODUCT_Items:
    PRODUCT.attributes.forEach( 
        attribute => attribute.items.forEach( 
            item => PRODUCT_Items.push({
                attributeName: attribute.name,
                ...item
            })
        )
    )

    //If the array is empty, the selected product is always new.
    if ( cartProducts.length === 0 ) productIsNewOnCart = true;
    else {
        
        cartProducts.forEach( 
            product => {

                console.log('inside addProductToCartControl utils. product.id', product.id);
                console.log('inside addProductToCartControl utils. PRODUCT.id', PRODUCT.id);

                if ( product.id !== PRODUCT.id ) return;

                if ( ( product.id === PRODUCT.id ) && ( product.attributes.length > 0 ) ) {
                    
                    product.attributes.forEach( 

                        attribute => attribute.items.forEach(
                            item => {

                                // const value = PRODUCT_Items.find(
                                //     PRODUCT_Item =>  {
                                        
                                //         if ( PRODUCT_Item.attributeName === attribute.name ) {

                                //             if ( item.value === PRODUCT_Item.value ) return PRODUCT_Item;

                                //         }
                                    
                                //     }
                                // )
                                let value = false;

                                PRODUCT_Items.forEach(
                                    PRODUCT_Item =>  {
                                        
                                        if ( PRODUCT_Item.attributeName === attribute.name ) {

                                            if ( item.value === PRODUCT_Item.value ) value = true;

                                        }
                                    
                                    }
                                )
                                
                                console.log(`inside addProductToCartControl utils. value of comparison between PRODUCT_Item =>  item.value === PRODUCT_Item.value`, value);
                                console.log(`item.value of ${attribute.name} = `, item.value);

                                if ( value === false ) same_product.push(false);
                                else same_product.push(true);

                            }
                        )
                        
                    )

                }

                /**For products that doesn't have attributes */
                if ( product.id === PRODUCT.id && ( !product.attributes.length ) ) same_product.push(true);


                /** If same_productVerification is empty, the product already exists on cartProducts bacause all attributes
                 *  are the same. 
                **/
                const same_productVerification = same_product.filter( target => target === false );
                if ( !same_productVerification.length ) productIsNewOnCart = false;

                
                //CONTROL RESET FOR THE NEXT PRODUCT ( OF EXISTS )
                same_product = [];

            } 

        )

    }

    console.log(productIsNewOnCart);

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