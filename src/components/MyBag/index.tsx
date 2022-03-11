import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import MyBagContext from '../../services/redux/contexts/MyBag';
import CartProductsContext from '../../services/redux/contexts/CartProducts';

//GRAPHQL
import { ProductDataType } from '../../services/graphql/types';

//COMPONENTS
import DefaultButton from '../DefaultButton';
import ProductAttributes from '../ProductAttributes';

//STYLES
import {
    MyBagContainer,
    ProductWrapper,
    ProductContainer,
    ProductInfo,
    SelectQuantity,
} from './styles';

type MyBagState = {
    redirectCartPage: boolean;
    TOTAL: number;
    CART_PRODUCTS: ProductDataType[];
}

export type MyBagProps =  {
    isVisible: boolean;
}

class MyBag extends PureComponent<PropsFromRedux, MyBagState> {

    constructor(props: PropsFromRedux) {
        super(props);
        this.pointerLeaveOfMyBagComponent = this.pointerLeaveOfMyBagComponent.bind(this);
        this.pointerEnterOfMyBagComponent = this.pointerEnterOfMyBagComponent.bind(this);
    }

    state: MyBagState = {
        redirectCartPage: false,
        TOTAL: 0,
        CART_PRODUCTS: [] as ProductDataType[],
    }

    componentDidMount() {

        this.setState(() => ({
            TOTAL: this.settingTotalPrice(),
            CART_PRODUCTS: this.settingCART_PRODUCTS()
        }))


        document.getElementById('my-bag')?.addEventListener('pointerleave', this.pointerLeaveOfMyBagComponent );

        document.getElementById('my-bag')?.addEventListener('pointerenter', this.pointerEnterOfMyBagComponent );
        
    }

    componentDidUpdate() {
        this.setState(() => ({
            TOTAL: this.settingTotalPrice()
        }))
    }


    
    pointerLeaveOfMyBagComponent() {
        const { deactivateMyBagComponent } = this.props;

        deactivateMyBagComponent();
    }

    pointerEnterOfMyBagComponent() {
        const { activateMyBagComponent } = this.props;

        activateMyBagComponent();
    }

    /**Returns cart products data. */
    settingCART_PRODUCTS(): ProductDataType[] {

        const { cartProducts } = this.props;

        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

        return ( cartProducts.length ? cartProducts : cartProductsLocalStorage )

    }

    /**Returns the total value of cart products. */
    settingTotalPrice(): number {
        
        const { cartProducts } = this.props;


        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

        const CART_PRODUCTS = ( cartProducts.length ? cartProducts : cartProductsLocalStorage );

        const priceIndex = this.calculatePriceIndex();

        let totalData = 0;

        CART_PRODUCTS.forEach(
            product => {
                totalData += ( product.prices[priceIndex].amount * product.quantity );
            }
        )

        totalData = Number( totalData.toFixed(2) );

        return totalData;

    }

    /**Return the index of current currency.*/
    calculatePriceIndex() {
        // CURRENCIES STATES
        const { USD, GBP, AUD, JPY, RUB } = this.props; 

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

    handleClickViewBagButton() {

        const windowLocation = window.location.pathname;

        if ( windowLocation === '/cart') window.location.reload();
        else {
            this.setState( ({ redirectCartPage }) => ({
                redirectCartPage: !redirectCartPage
            }));
        }

    }

    /** Increases the quantity of the product who invoke this function and set the new data on cartProducts context
     *  and localStorage.
     */
    quantity_Growth( product: ProductDataType, CART_PRODUCTS: ProductDataType[] ) {

        const { getLocalStorageDataProducts } = this.props;


        let newCartProduct = {} as ProductDataType;

        const NEW_CART_PRODUCTS = CART_PRODUCTS.map(
            cartProduct => {

                if ( cartProduct.id === product.id ) {


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
            CART_PRODUCTS: this.quantity_Growth( product, CART_PRODUCTS ),
        }))

    }



    renderMyBagProducts() {

        const { CART_PRODUCTS } = this.state;

        const priceIndex = this.calculatePriceIndex();

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

                                    <div id="attributes">
                                        <ProductAttributes productAttributes={product.attributes} origin='MyBag'/>
                                    </div>

                                </ProductInfo>

                                <SelectQuantity className="select-quantity">
                                    <button 
                                        className="plus-sign" 
                                        onClick={() => this.handleClickPlusSignButton( product ) }
                                    />
                                        <span>{product.quantity}</span>
                                    <button className="minus-sign" onClick={() => {}}/>
                                </SelectQuantity>   

                                
                                <div className="product-image">
                                    <img src={product.gallery[0]} alt={product.gallery[0]} />
                                </div>
                            

                            </ProductContainer>
                        ) 
                    )}

                </ProductWrapper>

        );

    }

    render() {

        const { bagVisible } = this.props;

        const { TOTAL } = this.state;

        const priceIndex = this.calculatePriceIndex();

        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

        
        //Trick to show the current symbol and label.
        const symbol = cartProductsLocalStorage[0].prices[priceIndex].currency.symbol;
        const label = cartProductsLocalStorage[0].prices[priceIndex].currency.label;

        /**variable to show the quantity of products in cart. */
        const amount = cartProductsLocalStorage.length;

        return (
            <>
                <MyBagContainer 
                    id="my-bag"
                    isVisible={bagVisible}
                >
                    
                    <div className="bag-description">
                        <strong>My Bag, </strong>
                        <span>{amount} items</span>
                    </div>

                    { this.renderMyBagProducts() }

                    <div className="total-price">
                        <span>Total</span>
                        <span>
                            {symbol}
                            {label + ' '}
                            {TOTAL}
                        </span>
                    </div>

                    <div className="bag-buttons">
                        <DefaultButton 
                            className="default-button"
                            color="default"
                            onClick={() => this.handleClickViewBagButton()}
                        >
                            VIEW BAG
                        </DefaultButton>
                        <DefaultButton 
                            className="default-button"
                            color="green"
                        >
                            CHECK OUT
                        </DefaultButton>
                    </div>

                </MyBagContainer>

                { this.state.redirectCartPage && <Navigate to='/cart'/>}

            </>
        ) ;

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const { 
    activateMyBagComponent,
    deactivateMyBagComponent,
    handleChangeMyBagState
} = MyBagContext.actions;


const { getLocalStorageDataProducts } = CartProductsContext.actions;

const mapState = ( state: RootState )  => ({
//  MY BAG STATE
    bagVisible: state.myBag.value,
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
//  MY BAG FUNCTIONS
    activateMyBagComponent,
    deactivateMyBagComponent,
    handleChangeMyBagState,
//  CART PRODUCTS FUNCTION
    getLocalStorageDataProducts,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyBag);

// -------------------------------- REDUX CONFIG -------------------------------- //