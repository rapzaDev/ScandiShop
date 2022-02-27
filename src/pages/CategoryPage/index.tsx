import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../services/redux/store';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';

import { getAllProducts, ProductsDataType } from '../../services/graphql/pages/CategoryPage/Queries';

import cartIcon from '../../assets/images/white-cart-icon.svg';

import Header from '../../components/Header';
import ShadowWrapper from '../../components/ShadowWrapper';
import MyBag from '../../components/MyBag';
import CurrencyOptions from '../../components/CurrencyOptions';

import {
    CategoryPageContainer,
    Main,
    ProductInfo,
    ProductInfoCartButton
} from './styles';


type CategoryPageState = { 
    outOfStock: boolean;
    redirectProductPage: boolean;
    allProducts: ProductsDataType[];
    clothesProducts: ProductsDataType[];
    techProducts: ProductsDataType[];
}

class CategoryPage extends PureComponent<PropsFromRedux, CategoryPageState> {

    constructor(props: PropsFromRedux) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: CategoryPageState = {
        outOfStock: false,
        redirectProductPage: false,
        allProducts: [],
        clothesProducts: [],
        techProducts: [],
    }
 
    async componentDidMount() {
        window.scrollTo(0, 0);

        document.getElementById('category-page')?.addEventListener('click', this.handleClickOnScreen );

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


        // --------- GraphQL ALL PRODUCTS DATA ---------
            const productsData = await getAllProducts();

            console.log(productsData[2]);

            this.setState(() => ({
                allProducts: productsData[0],
                clothesProducts: productsData[1],
                techProducts: productsData[2],
            }));

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

    handleClickProductInfoCartButton() {
        this.setState((state) => ({
            redirectProductPage: !state.redirectProductPage
        }))
    }


    renderMyBag() {

        if ( this.props.bagVisible)
            return <MyBag />
        else return <></>

    }

    renderCurrencyOptions() {
        const { currencyEnabled } = this.props;

        if ( currencyEnabled ) 
            return <CurrencyOptions />
    }

    renderCategoryProducts() {

        const { allCategory, clothesCategory, techCategory } = this.props;

        const { allProducts, clothesProducts, techProducts } = this.state;

        const  selectedCategory = ( allCategory && 'all') || ( clothesCategory && 'clothes') || ( techCategory && 'tech');

        switch (selectedCategory) {
            case 'all':

                let allPrices = (  allProducts[0] && allProducts[0].prices );
                let teste = (  allProducts[0] && Object.entries(allProducts[0].prices) );

                return (
                    allProducts.map( product => (
                        <ProductInfo key={product.id} className="product-info" outOfStock={!product.inStock}>
                        
                            <div className="product-image">

                                { !product.inStock && <span>OUT OF STOCK</span> }  

                                <ProductInfoCartButton 
                                    className="product-cart-button"
                                    onClick={() => this.handleClickProductInfoCartButton()}
                                >
                                    <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                                </ProductInfoCartButton>  

                            </div> {/**later i'll replace it with a image */}
            
                            
            
                            <span className="product-title">{product.name}</span>
                            <span className="product-price">
                                {teste[0][0]}
                                {allPrices[0].currency.label}
                                {allPrices[0].amount}
                            </span>
                    
                        </ProductInfo>
                    ))
                );

            case 'clothes':
            
                const clothesPrices = (  clothesProducts[0] && clothesProducts[0].prices );

                return (
                    clothesProducts.map( product => (
                        <ProductInfo key={product.id} className="product-info" outOfStock={!product.inStock}>
                        
                            <div className="product-image">

                                { !product.inStock && <span>OUT OF STOCK</span> }  

                                <ProductInfoCartButton 
                                    className="product-cart-button"
                                    onClick={() => this.handleClickProductInfoCartButton()}
                                >
                                    <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                                </ProductInfoCartButton>  

                            </div> {/**later i'll replace it with a image */}
            
                            
            
                            <span className="product-title">{product.name}</span>
                            <span className="product-price">
                                {clothesPrices[0].currency.symbol}
                                {clothesPrices[0].currency.label}
                                {clothesPrices[0].amount}
                            </span>
                    
                        </ProductInfo>
                    ))
                );

            case 'tech':

                const techPrices = (  techProducts[0] && techProducts[0].prices );
            
                return (
                    techProducts.map( product => (
                        <ProductInfo key={product.id} className="product-info" outOfStock={!product.inStock}>
                        
                            <div className="product-image">

                                { !product.inStock && <span>OUT OF STOCK</span> }  

                                <ProductInfoCartButton 
                                    className="product-cart-button"
                                    onClick={() => this.handleClickProductInfoCartButton()}
                                >
                                    <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                                </ProductInfoCartButton>  

                            </div> {/**later i'll replace it with a image */}
            
                            
            
                            <span className="product-title">{product.name}</span>
                            <span className="product-price">
                                {techPrices[0].currency.symbol}
                                {techPrices[0].currency.label}
                                {techPrices[0].amount}
                            </span>
                    
                        </ProductInfo>
                    ))
                );
        
            default:
                break;
        }

    }


    render() {

        return (

            <CategoryPageContainer id="category-page">
                
                <Header />

                <ShadowWrapper active={this.props.bagVisible}/>
                
                { this.renderCurrencyOptions() }

                { this.renderMyBag() }

                <Main>

                    <div className="category-container">
                        <h2>Women Category</h2>

                        <div className="category-content">
                            { this.renderCategoryProducts() }
                        </div>

                    </div>

                </Main>
                    

                { this.state.redirectProductPage && <Navigate to='/product'/>}

            </CategoryPageContainer>

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
    allCategory: state.categories.all,
    clothesCategory: state.categories.clothes,
    techCategory: state.categories.tech
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

export default connector(CategoryPage);

// -------------------------------- REDUX CONFIG -------------------------------- //