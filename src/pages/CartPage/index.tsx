import React, { PureComponent } from 'react';

import { getState, subscribe } from '../../store';
import { currencyOptionsContext } from '../../contexts/CurrencyOptionsContext';
import { myBagContext } from '../../contexts/MyBagContext';

import arrowLeft from '../../assets/images/arrow-left.svg';
import arrowRight from '../../assets/images/arrow-right.svg';

import { Header }  from '../../components/Header';
import { SizeButton } from '../../components/SizeButton';
import { MyBag } from '../../components/MyBag';
import { CurrencyOptions } from '../../components/CurrencyOptions';
import { ShadowWrapper } from '../../components/ShadowWrapper';

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
    bagVisible: boolean;
    unsubscribe: any; 
    currencyEnabled: boolean;
    size: SizesType;
}

class CartPage extends PureComponent<{}, CartPageState> {

    constructor(props: {}) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: CartPageState = {
        bagVisible: false,
        unsubscribe: undefined,
        currencyEnabled: false,
        size: {
            XS:false,
            S:true,
            M: false,
            L: false
        },
    }
 
    componentDidMount() {

        window.scrollTo(0, 0);

        const unsubscribe = subscribe( () => {
            const bagState = getState().myBag;
            const currencyOptionsState  = getState().currencyOptions;

            this.setState(() => ({
                bagVisible: bagState.value,
                currencyEnabled: currencyOptionsState.value
            }))

        });

        this.setState(() => ({
            unsubscribe: unsubscribe
        }));

    }

    
    componentDidUpdate() {
        document.getElementById('product-page')?.addEventListener('click', this.handleClickOnScreen);
    }
    
    componentWillUnmount() {
        this.state.unsubscribe();
    }
    

    handleClickOnScreen() {
        if ( this.state.currencyEnabled ) 
            currencyOptionsContext.changeMyCurrencyOptionsState();

        if ( this.state.bagVisible ) 
            myBagContext.changeMyBagState(); 
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

        if ( this.state.bagVisible)
            return <MyBag isVisible={ this.state.bagVisible } />
        else return <></>

    }

    renderCurrencyOptions() {
        if ( this.state.currencyEnabled ) 
            return <CurrencyOptions />
    }

    render() {

        return (
            

            <CartPageContainer id="product-page">
                
                <Header />

                    { this.renderCurrencyOptions() }

                    { this.renderMyBag() }

                <ShadowWrapper active={this.state.bagVisible}/>
                    
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
                                            <SizeButton
                                                origin="CartPage"
                                                unavailable={false}
                                                active={false}
                                                onClick={() => {}}
                                            >
                                                <span>S</span>
                                            </SizeButton>

                                            <SizeButton
                                                origin="CartPage"
                                                unavailable={false}
                                                active={true}
                                                onClick={() => {}}
                                            >
                                                <span>M</span>
                                            </SizeButton>
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
                                            <SizeButton
                                                origin="CartPage"
                                                unavailable={false}
                                                active={false}
                                                onClick={() => {}}
                                            >
                                                <span>S</span>
                                            </SizeButton>

                                            <SizeButton
                                                origin="CartPage"
                                                unavailable={false}
                                                active={true}
                                                onClick={() => {}}
                                            >
                                                <span>M</span>
                                            </SizeButton>
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

export { CartPage };
