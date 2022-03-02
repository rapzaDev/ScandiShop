import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../services/redux/store';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';

import arrowLeft from '../../assets/images/arrow-left.svg';
import arrowRight from '../../assets/images/arrow-right.svg';

import Header  from '../../components/Header';
import OptionButton from '../../components/OptionButton';
import MyBag from '../../components/MyBag';
import CurrencyOptions from '../../components/CurrencyOptions';
import ShadowWrapper from '../../components/ShadowWrapper';

import {
    CartPageContainer,
    Main,
    CartProducts,
    CartProductWrapper,
    CartProductContainer,
    CartProductInfo,
    CartProductSizes,
    ProductSelectQuantity,
    ProductImage,
} from './styles';

type SizesType = {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
}

type CartPageState = {
    size: SizesType;
}

class CartPage extends PureComponent<PropsFromRedux, CartPageState> {

    constructor(props: PropsFromRedux) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: CartPageState = {
        size: {
            XS:false,
            S:true,
            M: false,
            L: false
        },
    }
 
    componentDidMount() {

        window.scrollTo(0, 0);

        document.getElementById('cart-page')?.addEventListener('click', this.handleClickOnScreen);

        const { 
            bagVisible, 
            handleChangeMyBagState ,
            currencyEnabled,
            handleChangeMyCurrencyOptionsState
        } = this.props;

        // Cheking if MyBag component was rendered before page rendering
            if ( bagVisible ) handleChangeMyBagState();

        // Cheking if CurrencyOptions component was rendered before page rendering
            if ( currencyEnabled ) handleChangeMyCurrencyOptionsState();
            
    }    

    handleClickOnScreen() {
        const { 
            bagVisible, 
            bagActive, 
            currencyEnabled,
            currencyOptionsActive,
            handleChangeMyCurrencyOptionsState, 
            handleChangeMyBagState,
        } = this.props;

        const verificationControl = {
            currencyOptions: currencyEnabled && ( currencyOptionsActive === false ),
            myBag: bagVisible && ( bagActive === false ),
        }

        if ( verificationControl.currencyOptions ) 
            handleChangeMyCurrencyOptionsState();

        if ( verificationControl.myBag ) 
            handleChangeMyBagState();
  
    }

    handleClickSizeXS() {

        if ( !this.state.size.XS ){

            this.setState(({size}) => ({
                size: {
                    XS: !size.XS,
                    S: false,
                    M: false,
                    L: false,
                },
            }));

        }
            
    }

    handleClickSizeS() {

        if ( !this.state.size.S ){

            this.setState(({size}) => ({
                size: {
                    XS: false,
                    S: !size.S,
                    M: false,
                    L: false,
                },
            }));
            
        }

    }
    
    handleClickSizeM() {

        if ( !this.state.size.M ){

            this.setState(({size}) => ({
                size: {
                    XS: false,
                    S: false,
                    M: !size.M,
                    L: false,
                },
            }));
            
        }

    }

    handleClickSizeL() {

        if ( !this.state.size.L ){

            this.setState(({size}) => ({
                size: {
                    XS: false,
                    S: false,
                    M: false,
                    L: !size.L,
                },
            }));
            
        }

    }



    renderMyBag() {

        const { bagVisible } = this.props;

        if ( bagVisible)
            return <MyBag />

    }

    renderCurrencyOptions() {
        const { currencyEnabled } = this.props;

        if ( currencyEnabled ) 
            return <CurrencyOptions />
    }

    render() {

        return (
            

            <CartPageContainer id="cart-page">
                
                <Header />

                    { this.renderCurrencyOptions() }

                    { this.renderMyBag() }

                <ShadowWrapper active={this.props.bagVisible}/>
                    
                    <Main>

                        <h2>CART</h2>

                        <CartProducts className="cart-products">

                            <CartProductWrapper className="cart-product-wrapper">

                                <CartProductContainer className="cart-product-container">

                                    <CartProductInfo className="cart-product-info">
                                        <strong>Apollo</strong>
                                        <span>Running Short</span>

                                        <span>$50.00</span>

                                        <CartProductSizes className="cart-product-sizes">
                                            <OptionButton
                                                origin="CartPage"
                                                active={false}
                                                onClick={() => {}}
                                                value='S'
                                            >
                                                <span>S</span>
                                            </OptionButton>

                                            <OptionButton
                                                origin="CartPage"
                                                active={true}
                                                onClick={() => {}}
                                                value='M'
                                            >
                                                <span>M</span>
                                            </OptionButton>
                                        </CartProductSizes>

                                    </CartProductInfo>

                                    <ProductSelectQuantity className="select-quantity">
                                        <div className="option-sign">
                                            <span>+</span>
                                        </div>
                                            <span className="quantity-number">1</span>
                                        <div className="option-sign">
                                            <span>-</span>
                                        </div>
                                    </ProductSelectQuantity>
                                    
                                </CartProductContainer>

                                <ProductImage className="product-image">
                                    <img className="arrow-image" src={arrowLeft} alt="Arrow left icon" />
                                    <img className="arrow-image" src={arrowRight} alt="Arrow right icon" />
                                </ProductImage>

                            </CartProductWrapper>

                            <CartProductWrapper className="cart-product-wrapper">

                                <CartProductContainer className="cart-product-container">

                                    <CartProductInfo className="cart-product-info">
                                        <strong>Jupiter</strong>
                                        <span>Wayfarer</span>

                                        <span>$75.00</span>

                                        <CartProductSizes className="cart-product-sizes">
                                            <OptionButton
                                                origin="CartPage"
                                                active={false}
                                                onClick={() => {}}
                                                value='S'
                                            >
                                                <span>S</span>
                                            </OptionButton>

                                            <OptionButton
                                                origin="CartPage"
                                                active={true}
                                                onClick={() => {}}
                                                value='M'
                                            >
                                                <span>M</span>
                                            </OptionButton>
                                        </CartProductSizes>

                                    </CartProductInfo>

                                    <ProductSelectQuantity className="select-quantity">
                                        <div className="option-sign">
                                                <span>+</span>
                                        </div>
                                            <span className="quantity-number">2</span>
                                        <div className="option-sign">
                                            <span>-</span>
                                        </div>
                                    </ProductSelectQuantity>
                                    
                                </CartProductContainer>

                                <ProductImage className="product-image">
                                    <img className="arrow-image" src={arrowLeft} alt="Arrow left icon" />
                                    <img className="arrow-image" src={arrowRight} alt="Arrow right icon" />
                                </ProductImage>

                            </CartProductWrapper>

                        </CartProducts>

                    </Main>

            </CartPageContainer>
        );

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const { 
    handleChangeMyBagState,
    activateMyBagComponent,
    deactivateMyBagComponent
} = MyBagContext.actions;

const {
    handleChangeMyCurrencyOptionsState,
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent
} = CurrencyOptionsContext.actions;


const mapState = ( state: RootState )  => ({  
    bagVisible: state.myBag.value,
    bagActive: state.myBag.bagActive,
    currencyEnabled: state.currencyOptions.value,
    currencyOptionsActive: state.currencyOptions.currencyOptionsActive, 
})

const mapDispatch = {
    handleChangeMyBagState,
    activateMyBagComponent,
    deactivateMyBagComponent,
    handleChangeMyCurrencyOptionsState,
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartPage);

// -------------------------------- REDUX CONFIG -------------------------------- //

