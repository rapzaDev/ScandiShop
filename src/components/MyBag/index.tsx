import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import MyBagContext from '../../services/redux/contexts/MyBag';

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
    ProductInfo
} from './styles';


type MyBagState = {
    redirectCartPage: boolean;
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
    }

    componentDidMount() {

        const { cartProducts } = this.props;
        console.log(cartProducts);

        document.getElementById('my-bag')?.addEventListener('pointerleave', this.pointerLeaveOfMyBagComponent );

        document.getElementById('my-bag')?.addEventListener('pointerenter', this.pointerEnterOfMyBagComponent );
        
    }

    
    pointerLeaveOfMyBagComponent() {
        const { deactivateMyBagComponent } = this.props;

        deactivateMyBagComponent();
    }

    pointerEnterOfMyBagComponent() {
        const { activateMyBagComponent } = this.props;

        activateMyBagComponent();
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

    getLocalStorageCartProducts(): ProductDataType[] {
        const cartProducts = localStorage.getItem('@scandishop/cartProducts') as string;

        if ( cartProducts ) return JSON.parse(cartProducts);
        else return [] as ProductDataType[];
    }

    renderMyBagProducts() {

        var CART_PRODUCTS = [] as ProductDataType[];

        const { cartProducts } = this.props;

        CART_PRODUCTS = cartProducts;

        return (
                <ProductWrapper className="product-wrapper">

                    { CART_PRODUCTS.map( 
                        product => 
                        (  
                            <ProductContainer className="product-container" key={product.id}>
                                <ProductInfo className="product-info">
                                    <span className="product-title">
                                        {product.name}
                                        {' - ' + product.brand}
                                    </span>
                                    <div className="product-price">
                                        <span>
                                            {product.prices[0].currency.symbol}
                                            {product.prices[0].currency.label}
                                            {product.prices[0].amount}
                                        </span>
                                    </div>

                                    <div id="attributes">
                                        <ProductAttributes productAttributes={product.attributes} origin='MyBag'/>
                                    </div>

                                </ProductInfo>

                                <div className="select-quantity">
                                    <div className="option-sign">+</div>
                                        <span>1</span>
                                    <div className="option-sign">-</div>
                                </div>   

                                
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

        return (
            <>
                <MyBagContainer 
                    id="my-bag"
                    isVisible={bagVisible}
                >
                    
                    <div className="bag-description">
                        <strong>My Bag, </strong>
                        <span>2 items</span>
                    </div>

                    { this.renderMyBagProducts() }

                    <div className="total-price">
                        <span>Total</span>
                        <span>$100.00</span>
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

const mapState = ( state: RootState )  => ({
//  MY BAG STATE
    bagVisible: state.myBag.value,
// CART PRODUCTS STATE
    cartProducts: state.products.cartProducts
})

const mapDispatch = {
    activateMyBagComponent,
    deactivateMyBagComponent,
    handleChangeMyBagState
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MyBag);

// -------------------------------- REDUX CONFIG -------------------------------- //