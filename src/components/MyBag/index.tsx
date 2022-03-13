import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import MyBagContext from '../../services/redux/contexts/MyBag';
import CartProductsContext from '../../services/redux/contexts/CartProducts';

//GRAPHQL
import { ProductDataType } from '../../services/graphql/types';

//UTILS 
import { CART_PRODUCTS_DATA, calculatePriceIndex } from '../../utils/functions';

//COMPONENTS
import CartProductsContent from '../CartProducts';
import DefaultButton from '../DefaultButton';


//STYLES
import {
    MyBagContainer,
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
            CART_PRODUCTS: CART_PRODUCTS_DATA(this.props.cartProducts)
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


    /**@description Returns the total value of all products on cart. */
    settingTotalPrice(): number {
        
        const { cartProducts } = this.props;

        // CURRENCIES STATES
        const { USD, GBP, AUD, JPY, RUB } = this.props; 



        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

        const CART_PRODUCTS = ( cartProducts.length ? cartProducts : cartProductsLocalStorage );

        const priceIndex = calculatePriceIndex( USD, GBP, AUD, JPY, RUB );

        let totalData = 0;

        CART_PRODUCTS.forEach(
            product => {
                totalData += ( product.prices[priceIndex].amount * product.quantity );
            }
        )

        totalData = Number( totalData.toFixed(2) );

        return totalData;

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



    render() {

        const { bagVisible } = this.props;

        // CURRENCIES STATES
        const { USD, GBP, AUD, JPY, RUB } = this.props; 

        const { TOTAL } = this.state;



        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );

        const priceIndex = calculatePriceIndex( USD, GBP, AUD, JPY, RUB );
        
        //Trick to show the current symbol and label.
        let symbol = ''; let label = '';
        if ( cartProductsLocalStorage.length ){
            symbol = cartProductsLocalStorage[0].prices[priceIndex].currency.symbol;
            label = cartProductsLocalStorage[0].prices[priceIndex].currency.label;
        }

        /** 
         * @description 
         * variable to show the quantity of products in cart. 
         * */
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

                    <CartProductsContent origin='MyBag'/>

                    <div className="total-price">
                        <span>Total</span>
                        <span>
                            {symbol}
                            {label + ' '}
                            {TOTAL ? TOTAL : '0.00'}
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