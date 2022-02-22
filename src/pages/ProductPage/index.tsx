import React, { PureComponent } from 'react';

import { getState, subscribe } from '../../store';
import { currencyOptionsContext } from '../../contexts/CurrencyOptionsContext';
import { myBagContext } from '../../contexts/MyBagContext';


import { Header }  from '../../components/Header';
import { DefaultButton } from '../../components/DefaultButton';
import { MyBag } from '../../components/MyBag';
import { CurrencyOptions } from '../../components/CurrencyOptions';

import { ShadowWrapper } from '../../components/ShadowWrapper';

import {
    ProductPageContainer,
    Main,
    SmallImage,
    ProductContainer,
    BigImage,
    ProductContent,
    ProductSize,
    Size
} from './styles';

type SizesType = {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
}

type ProductPageState = {
    bagVisible: boolean;
    bagIsActive: boolean;
    unsubscribe: any; 
    currencyEnabled: boolean;
    currencyOptionsActive: boolean;
    size: SizesType;
}

class ProductPage extends PureComponent<{}, ProductPageState> {

    constructor(props: {}) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: ProductPageState = {
        bagVisible: false,
        bagIsActive: false,
        unsubscribe: undefined,
        currencyEnabled: false,
        currencyOptionsActive: false,
        size: {
            XS:false,
            S:true,
            M: false,
            L: false
        },
    }
 
    componentDidMount() {

        window.scrollTo(0, 0);

        document.getElementById('product-page')?.addEventListener('click', this.handleClickOnScreen);

        const unsubscribe = subscribe( () => {
            const bagState = getState().myBag;
            const currencyOptionsState  = getState().currencyOptions;

            this.setState(() => ({
                bagVisible: bagState.value,
                bagIsActive: bagState.bagActive,
                currencyEnabled: currencyOptionsState.value,
                currencyOptionsActive: currencyOptionsState.currencyOptionsActive
            }))

        });

        this.setState(() => ({
            unsubscribe: unsubscribe
        }));

    }
    
    componentWillUnmount() {
        this.state.unsubscribe();
    }
    

    handleClickOnScreen() {
        const { bagVisible, bagIsActive, currencyEnabled, currencyOptionsActive } = this.state;

        const verificationControl = {
            myBag: bagVisible && ( bagIsActive === false ),
            currencyOptions: currencyEnabled && ( currencyOptionsActive === false ),
        }

        if ( verificationControl.currencyOptions ) 
            currencyOptionsContext.changeMyCurrencyOptionsState();

        if ( verificationControl.myBag ) 
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

    renderProductSize() {

        const { size } = this.state;

        return (
            <ProductSize className="product-size">
                <span>SIZE:</span>
                <div className="size-options">

                    <Size 
                        origin="ProductPage"
                        unavailable={false}
                        active={size.XS}
                        onClick={() => this.handleClickSizeXS()}
                    >
                        <span>XS</span>
                    </Size>
                
                
                    <Size 
                        origin="ProductPage"
                        unavailable={false}
                        active={size.S}
                        onClick={() => this.handleClickSizeS()}
                    >
                        <span>S</span>
                    </Size>
                
                
                    <Size 
                        origin="ProductPage"
                        unavailable={false}
                        active={size.M}
                        onClick={() => this.handleClickSizeM()}
                    >
                        <span>M</span>
                    </Size>
                
                
                    <Size 
                        origin="ProductPage"
                        unavailable={false}
                        active={size.L}
                        onClick={() => this.handleClickSizeL()}
                    >
                        <span>L</span>
                    </Size>

                </div>

            </ProductSize>
        );
    }


    render() {

        return (
            

            <ProductPageContainer id="product-page">
                
                <Header />

                    { this.renderCurrencyOptions() }

                    { this.renderMyBag() }

                <ShadowWrapper active={this.state.bagVisible}/>
                    
                    <Main>

                        <aside className="product-images">
                            <SmallImage className="small-image"/> {/**later i'll change to real images */}
                            <SmallImage className="small-image"/> {/**later i'll change to real images */}
                            <SmallImage className="small-image"/> {/**later i'll change to real images */}
                        </aside>
                            
                        <ProductContainer>

                            <BigImage className="big-image"/> {/**later i'll change to real images */}


                            <ProductContent className="product-content">

                                <span className="product-title">
                                    <strong>Apollo</strong>
                                    <span>Running Short</span>
                                </span>

                                { this.renderProductSize() }

                                <div className="product-price">
                                    <span>PRICE:</span>
                                    <span>$50.00</span>
                                </div>

                                <DefaultButton className="add-cart-button" color="green">
                                    <span>ADD TO CART</span>
                                </DefaultButton>

                                <div className="product-info">
                                    <p>Find stunning women's cocktail dresses and party dresses. 
                                        Stand out in lace and metallic cocktail dresses and party
                                        dresses from all your favorite brands.
                                    </p>
                                </div>

                            </ProductContent>

                        </ProductContainer>

                    </Main>

            </ProductPageContainer>
        );

    }

};

export { ProductPage };
