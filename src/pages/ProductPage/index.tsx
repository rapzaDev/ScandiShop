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
import TextAttributes from '../../components/TextAttributes';
import ImagesContainer from '../../components/ImagesContainer';
import ColorAttributes from '../../components/ColorAttributes';

//STYLES
import {
    ProductPageContainer,
    Main,
    ProductContainer,
    ProductContent,
    ProductAttributes,
} from './styles';


class ProductPage extends PureComponent<PropsFromRedux> {

    constructor(props: PropsFromRedux) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
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

    renderProductAttributes(productAttributes: AttributeSetType[]) {

        const textAttributes = productAttributes.filter( attribute => attribute.type === 'text' );
    
        const [ colorAttribute ] = productAttributes.filter( attribute => attribute.type === 'swatch' );

        return (
            <ProductAttributes className="product-attributes">

                { colorAttribute && <ColorAttributes swatchAttibute={colorAttribute} origin='ProductPage' /> }

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
                <ProductContainer>

                    <ImagesContainer images={product.gallery}/>

                    <ProductContent className="product-content">

                        <span className="product-title">
                            <strong>{strongTitle}</strong>
                            <span>{restOfTitle}</span>
                            <span>- {product.brand}</span>
                        </span>

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
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                    </ProductContent>

                </ProductContainer>
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

