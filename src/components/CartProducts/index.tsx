import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import CartProductsContext from '../../services/redux/contexts/CartProducts';

//GRAPHQL
import { ProductDataType } from '../../services/graphql/types';

//UTILS
import { calculatePriceIndex, CART_PRODUCTS_DATA } from '../../utils/functions';

//COMPONENTS
import ProductAttributes from '../ProductAttributes';

//STYLES
import {
    ProductWrapper,
    EmptyCart,
    ProductContainer,
    ProductInfo,
    SelectQuantity,
} from './styles';


type CartProductsState = {
    CART_PRODUCTS: ProductDataType[];
}

class CartProducts extends PureComponent<PropsFromRedux, CartProductsState> {

    constructor(props: PropsFromRedux) {
        super(props);
    }

    state: CartProductsState = {
        CART_PRODUCTS: [] as ProductDataType[],
    }

    componentDidMount() {

        this.setState(() => ({
            CART_PRODUCTS: CART_PRODUCTS_DATA(this.props.cartProducts)
        }))

    }



    /** Increases the quantity of the product who invoke this function and set the new data on cartProducts context
     *  and in localStorage.
     */
     increaseProductQuantity( product: ProductDataType, CART_PRODUCTS: ProductDataType[] ) {

        const { getLocalStorageDataProducts } = this.props;


        let newCartProduct = {} as ProductDataType;

        const NEW_CART_PRODUCTS = CART_PRODUCTS.map(
            cartProduct => {

                if ( cartProduct.KEY_ID === product.KEY_ID ) {


                    Object.assign( newCartProduct, {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1,
                    } )

                    return newCartProduct;                        

                }

                return cartProduct;

            }
        )

        getLocalStorageDataProducts(NEW_CART_PRODUCTS);
        localStorage.setItem('@scandishop/cartProducts', JSON.stringify(NEW_CART_PRODUCTS) );

        return NEW_CART_PRODUCTS;

    }

    handleClickPlusSignButton( product: ProductDataType ) {
        
        const { CART_PRODUCTS } = this.state;

        this.setState(() => ({
            CART_PRODUCTS: this.increaseProductQuantity( product, CART_PRODUCTS ),
        }))

    }


    /** Decreases the quantity of the product who invoke this function and set the new data on cartProducts context
     *  and in localStorage.
     */
     decreaseProductQuantity( product: ProductDataType, CART_PRODUCTS: ProductDataType[] ) {

        const { getLocalStorageDataProducts } = this.props;


        let newCartProduct = {} as ProductDataType;

        let NEW_CART_PRODUCTS = CART_PRODUCTS.map(
            cartProduct => {

                if ( cartProduct.KEY_ID === product.KEY_ID ) {

                    Object.assign( newCartProduct, {
                        ...cartProduct,
                        quantity: cartProduct.quantity - 1,
                    } )

                    return newCartProduct;                        

                }

                return cartProduct;

            }
        )

        /**If any product had his quantity reduced to zero don't will be in the NEW_CART_PRODUCTS*/
        NEW_CART_PRODUCTS = NEW_CART_PRODUCTS.filter(
            cartProduct => cartProduct.quantity > 0
        )


        getLocalStorageDataProducts(NEW_CART_PRODUCTS);
        localStorage.setItem('@scandishop/cartProducts', JSON.stringify(NEW_CART_PRODUCTS) );

        return NEW_CART_PRODUCTS;

    }

    handleClickMinusSignButton( product: ProductDataType ) {
        
        const { CART_PRODUCTS } = this.state;

        this.setState(() => ({
            CART_PRODUCTS: this.decreaseProductQuantity( product, CART_PRODUCTS ),
        }))

    }    



    renderCartProducts() {

        const { CART_PRODUCTS } = this.state;

        // CURRENCIES STATES
        const { USD, GBP, AUD, JPY, RUB } = this.props; 

        const priceIndex = calculatePriceIndex( USD, GBP, AUD, JPY, RUB );

        if ( CART_PRODUCTS.length )
        return (
                <ProductWrapper className="product-wrapper">

                    { CART_PRODUCTS.map( 
                        product => 
                        (  
                            <ProductContainer 
                                className="product-container" 
                                key={ JSON.stringify(product.id) + JSON.stringify(product.attributes) }
                            >
                                <ProductInfo className="product-info">
                                    <span className="product-title">
                                        {product.name}
                                        {' - ' + product.brand}
                                    </span>
                                    <div className="product-price">
                                        <span>
                                            {product.prices[priceIndex].currency.symbol}
                                            {product.prices[priceIndex].currency.label + ' '}
                                            {product.prices[priceIndex].amount}
                                        </span>
                                    </div>

                                    { 
                                        <div id="attributes">
                                            <ProductAttributes 
                                                origin='MyBag'
                                                productAttributes={product.attributes}
                                            />
                                        </div>
                                    }

                                </ProductInfo>

                                <SelectQuantity className="select-quantity">
                                    <button 
                                        className="plus-sign" 
                                        onClick={() => this.handleClickPlusSignButton( product ) }
                                    />
                                        <span>{product.quantity}</span>
                                    <button 
                                        className="minus-sign" 
                                        onClick={() => this.handleClickMinusSignButton( product ) }
                                    />
                                </SelectQuantity>   

                                
                                <div className="product-image">
                                    <img src={product.gallery[0]} alt={product.gallery[0]} />
                                </div>
                            

                            </ProductContainer>
                        ) 
                    )}

                </ProductWrapper>

        );
        else return (

            <EmptyCart className="empty-cart">
                <span>YOUR BAG IS EMPTY</span>
                <span>Add Products</span>
            </EmptyCart>

        );

    }


    render() {

        return this.renderCartProducts();

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getLocalStorageDataProducts } = CartProductsContext.actions;

const mapState = ( state: RootState )  => ({
// CART PRODUCTS STATE
    cartProducts: state.products.cartProducts,
//  CURRENCIES STATES
    USD: state.currencies.USD, 
    GBP: state.currencies.GBP,
    AUD: state.currencies.AUD,
    JPY: state.currencies.JPY,
    RUB: state.currencies.RUB,
})

const mapDispatch = {
//  CART PRODUCTS FUNCTION
    getLocalStorageDataProducts,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartProducts);

// -------------------------------- REDUX CONFIG -------------------------------- //



