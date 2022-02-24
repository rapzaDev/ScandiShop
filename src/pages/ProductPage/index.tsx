import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../services/redux/store';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';


import Header from '../../components/Header';
import DefaultButton from '../../components/DefaultButton';
import MyBag from '../../components/MyBag';
import CurrencyOptions from '../../components/CurrencyOptions';

import ShadowWrapper from '../../components/ShadowWrapper';

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
    size: SizesType;
}

class ProductPage extends PureComponent<PropsFromRedux, ProductPageState> {

    constructor(props: PropsFromRedux) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: ProductPageState = {
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

    }
    

    handleClickOnScreen() {
        const { 
            bagVisible, 
            bagActive, 
            currencyEnabled, 
            currencyOptionsActive,
            handleChangeMyCurrencyOptionsState,
            handleChangeMyBagState
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

        const {  bagVisible } = this.props;

        if ( bagVisible)
            return <MyBag />

    }

    renderCurrencyOptions() {
        const {  currencyEnabled } = this.props;

        if ( currencyEnabled ) 
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

                <ShadowWrapper active={this.props.bagVisible}/>
                    
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

                                <DefaultButton 
                                    className="add-cart-button" 
                                    color="green"
                                    style={ this.props.bagVisible ? {filter: 'brightness(0.9)'} : {} }
                                >
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

export default connector(ProductPage);

// -------------------------------- REDUX CONFIG -------------------------------- //

