import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';

//GRAPHQL
import { AttributeSetType } from '../../services/graphql/types';

//COMPONENTS
import Header from '../../components/Header';
import DefaultButton from '../../components/DefaultButton';
import MyBag from '../../components/MyBag';
import CurrencyOptions from '../../components/CurrencyOptions';
import ShadowWrapper from '../../components/ShadowWrapper';
import OptionButton from '../../components/OptionButton';
import TextAttributes from '../../components/TextAttributes';

//STYLES
import {
    ProductPageContainer,
    Main,
    SmallImage,
    ProductContainer,
    BigImage,
    ProductContent,
    ProductSize,
    Size,
    ProductAttributes,
    // TextAttributes
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
     


        const { product } = this.props;

        console.log(product);

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
                        active={size.XS}
                        onClick={() => this.handleClickSizeXS()}
                        value='XS'
                    >
                        <span>XS</span>
                    </Size>
                
                
                    <Size 
                        origin="ProductPage"
                        active={size.S}
                        onClick={() => this.handleClickSizeS()}
                        value='S'
                    >
                        <span>S</span>
                    </Size>
                
                
                    <Size 
                        origin="ProductPage"
                        active={size.M}
                        onClick={() => this.handleClickSizeM()}
                        value='M'
                    >
                        <span>M</span>
                    </Size>
                
                
                    <Size 
                        origin="ProductPage"
                        active={size.L}
                        onClick={() => this.handleClickSizeL()}
                        value='L'
                    >
                        <span>L</span>
                    </Size>

                </div>

            </ProductSize>
        );
    }

    renderProductAttributes(productAttributes: AttributeSetType[]) {

        const textAttributes = productAttributes.filter( attribute => attribute.type === 'text' );
    

        return (
            <ProductAttributes className="product-attributes">

                <TextAttributes textAttributes={textAttributes} origin="ProductPage"/>

            </ProductAttributes>  

        );

    }

    renderProduct() {
        
        // PRODUCT STATE
        const { product } = this.props;

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

        const title = product.name.split(' ');
        const strongTitle = title[0];
        const restOfTitle = title.filter( title => title !== strongTitle );

        return (
            <>
                <aside className="product-images">
                    <SmallImage className="small-image"/> {/**later i'll change to real images */}
                    <SmallImage className="small-image"/> {/**later i'll change to real images */}
                    <SmallImage className="small-image"/> {/**later i'll change to real images */}
                </aside>

                <ProductContainer>

                    <BigImage className="big-image">
                        <img src={product.gallery[0]} alt={`${product.name} image 0`} />
                    </BigImage> 


                    <ProductContent className="product-content">

                        <span className="product-title">
                            <strong>{strongTitle}</strong>
                            <span>{restOfTitle}</span>
                        </span>

                        {/* { this.renderProductSize() } */}

                        { this.renderProductAttributes(product.attributes) }

                        <div className="product-price">
                            <span>PRICE:</span>
                            <span>
                                {product.prices[priceIndex].currency.symbol}
                                {product.prices[priceIndex].currency.label}
                                {" " + product.prices[priceIndex].amount}
                            </span>
                        </div>

                        <DefaultButton 
                            className="add-cart-button" 
                            color="green"
                            style={ this.props.bagVisible ? {filter: 'brightness(0.9)'} : {} }
                        >
                            <span>ADD TO CART</span>
                        </DefaultButton>

                        <div className="product-info">
                            {product.description}
                        </div>

                    </ProductContent>

                </ProductContainer>
            </>
        )

    }

    render() {

        return (
            

            <ProductPageContainer id="product-page">
                
                <Header />

                    { this.renderCurrencyOptions() }

                    { this.renderMyBag() }

                <ShadowWrapper active={this.props.bagVisible}/>
                    
                    <Main>

                        { this.renderProduct() }

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
//  MY BAG COMPONENT STATES
    bagVisible: state.myBag.value,
    bagActive: state.myBag.bagActive,
//  CURRENCY OPTIONS COMPONENT STATES 
    currencyEnabled: state.currencyOptions.value,
    currencyOptionsActive: state.currencyOptions.currencyOptionsActive, 
//  CURRENCIES STATES
    USD: state.currencies.USD, 
    GBP: state.currencies.GBP,
    AUD: state.currencies.AUD,
    JPY: state.currencies.JPY,
    RUB: state.currencies.RUB,
//  PRODUCT STATE
    product: state.product.value,
})

const mapDispatch = {
//  MY BAG COMPONENT FUNCTIONS
    handleChangeMyBagState,
    activateMyBagComponent,
    deactivateMyBagComponent,
//  CURRENCY OPTIONS COMPONENT FUNCTIONS
    handleChangeMyCurrencyOptionsState,
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);

// -------------------------------- REDUX CONFIG -------------------------------- //

