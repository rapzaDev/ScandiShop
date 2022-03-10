import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';

//GRAPHQL
import { ProductDataType } from '../../services/graphql/types';

//COMPONENTS
import Header from '../../components/Header';
import DefaultButton from '../../components/DefaultButton';
import MyBag from '../../components/MyBag';
import CurrencyOptions from '../../components/CurrencyOptions';
import ShadowWrapper from '../../components/ShadowWrapper';
import ImagesContainer from '../../components/ImagesContainer';
import ProductAttributes from '../../components/ProductAttributes';

//STYLES
import {
    ProductPageContainer,
    Main,
    ProductContainer,
    ProductContent,
} from './styles';

type ProductPageState = {
    product: ProductDataType;
}


class ProductPage extends PureComponent<PropsFromRedux, ProductPageState> {

    constructor(props: PropsFromRedux) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: ProductPageState = {
        product: this.getSelectedProduct(),
    }
 
    componentDidMount() {

        window.scrollTo(0, 50);

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

    componentDidUpdate() {

        document.getElementById('product-page')?.addEventListener('click', this.handleClickOnScreen);
    }
    
    /**Get the selected product data from localStorage */
    getSelectedProduct(): ProductDataType {
        const selectedProduct = ( localStorage.getItem('@scandishop/selectedProduct')) as string;

        return JSON.parse(selectedProduct);
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

    handleClickAddToCartButton() {

        const data = ( localStorage.getItem('@scandishop/selectedProduct') ) as string;
        const selectedProduct: ProductDataType = ( data ? JSON.parse(data) : {} );

        const { TEXT_ATTRIBUTES, COLOR_ATTRIBUTES } = this.props;

        let productData = {} as ProductDataType;

        Object.assign( productData, {
            ...selectedProduct,
            attributes: selectedProduct.attributes.map(
                attribute => {

                    if ( attribute.type === 'text' ) {

                        const TEXT_ATTRIBUTE = TEXT_ATTRIBUTES.find(
                            textAttribute => attribute.name === textAttribute.name
                        )

                        if ( TEXT_ATTRIBUTE !== undefined )  {

                            const item = TEXT_ATTRIBUTE.items.find(
                                target => (target.value === true)
                            );
                            
                            if ( item !== undefined ) {

                                attribute.items = [{
                                    id: item.name,
                                    value: item.name
                                }];

                                return attribute;

                            }
                    
                        }

                    }

                    if ( attribute.type === 'swatch' ) {

                        const COLOR_ATTRIBUTE = COLOR_ATTRIBUTES.find(
                            colorAttribute => ( colorAttribute.selected === true )
                        )

                        if ( COLOR_ATTRIBUTE !== undefined ) {

                            const item = attribute.items.find(
                                color => color.id === COLOR_ATTRIBUTE.id
                            )
                            
                            if ( item !== undefined ) {

                                attribute.items = [item];

                                return attribute;

                            }
                 

                        }

                    }

                }
            ),
            quantity: 1,

        }) //END OF OBJECT.ASSIGN

        console.log(productData);

    }


    renderMyBag() {

        const {  bagVisible } = this.props;

        if ( bagVisible)
            return <MyBag />

    }

    renderCurrencyOptions() {
        const { currencyEnabled } = this.props;

        if ( currencyEnabled ) 
            return <CurrencyOptions />
    }

    renderProduct() {
        
        // PRODUCT STATE
        const { product } = this.state;
        // const data = ( localStorage.getItem('@scandishop/selectedProduct') ) as string;
        // const product: ProductDataType = ( data ? JSON.parse(data) : {} );

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


        //TITLE LOGIC
        const title = product.name.split(' ');
        let strongTitle = title[0];
        let restOfTitle = title.filter( title => title !== strongTitle );
        
        //Cheking if the first word of the var restOfTitle is a number
        if ( Number( restOfTitle[0] ) ) {
            strongTitle = strongTitle + ` ${restOfTitle[0]}`
            restOfTitle.splice(0);
        }

        restOfTitle = restOfTitle.map( word => word + ' ' );

        return (
                <ProductContainer>

                    <ImagesContainer 
                        images={product.gallery}
                        shadow={this.props.bagVisible}
                    />

                    <ProductContent className="product-content">

                        <span className="product-title">
                            <strong>{strongTitle}</strong>
                            <span>{restOfTitle}</span>
                            <span>- {product.brand}</span>
                        </span>

                        <ProductAttributes productAttributes={product.attributes} origin='ProductPage'/>                        

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
                            style={ this.props.bagVisible ? {filter: 'brightness(0.78)'} : {} }
                            onClick={ () => this.handleClickAddToCartButton() }
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
//  PRODUCT TEXT ATTRIBUTES STATE
    TEXT_ATTRIBUTES: state.textAttributes.textAttributes,
//  PRODUCT COLOR ATTRIBUTES STATE
    COLOR_ATTRIBUTES: state.colorAttributes.colorAttributes,
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

