import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import MyBagContext from '../../services/redux/contexts/MyBag';
import CartProductsContext from '../../services/redux/contexts/CartProducts';

//GRAPHQL
import { getAllProducts } from '../../services/graphql/pages/CategoryPage/Queries';
import { AttributeType, ProductDataType } from '../../services/graphql/types/';

//UTILS
import { addProductToCartControl, ADD_PRODUCT_TO_CART } from '../../utils/functions';

//ICONS
import cartIcon from '../../assets/images/white-cart-icon.svg';

//COMPONENTS
import Header from '../../components/Header';
import ShadowWrapper from '../../components/ShadowWrapper';
import MyBag from '../../components/MyBag';
import CurrencyOptions from '../../components/CurrencyOptions';
import ColorAttributes from '../../components/ColorAttributes';

//STYLES
import {
    CategoryPageContainer,
    Main,
    CategoryContent,
    ProductInfo,
    ProductInfoCartButton
} from './styles';


type CategoryPageState = { 
    outOfStock: boolean;
    redirectProductPage: boolean;
    allProducts: ProductDataType[];
    clothesProducts: ProductDataType[];
    techProducts: ProductDataType[];
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

            this.setState(() => ({
                allProducts: productsData[0],
                clothesProducts: productsData[1],
                techProducts: productsData[2],
            }));
    }

    componentDidUpdate() {
        document.getElementById('category-page')?.addEventListener('click', this.handleClickOnScreen );
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

    /**Redirect the user to cart page containing the selected product. */
    handleClickProductInfo(selectedProduct: ProductDataType) {

        localStorage.setItem('@scandishop/selectedProduct', JSON.stringify(selectedProduct) );

        this.setState((state) => ({
            redirectProductPage: !state.redirectProductPage
        }))
    }

    /**Add a new porduct on Cart and MyBag component and activates MyBag component. */
    handleClickProductInforCartButton(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
        product: ProductDataType
    ) {

        /**Controls the click on ProductInforCartButton above ProductInfo component */
        event.stopPropagation();

        const { getLocalStorageDataProducts, cartProducts, handleChangeMyBagState } = this.props;

        let defaultProduct = {} as ProductDataType;
        
        Object.assign( defaultProduct, {
            ...product,
            attributes: product.attributes.map( 
                attribute =>  ({
                    ...attribute,
                    items: attribute.items.map(
                        item => {

                            if ( item.id === attribute.items[0].id ) {

                                let newItem = {} as AttributeType;
                                Object.assign( newItem, {
                                    ...item,
                                    selected: true
                                })

                                return newItem;
                            }

                            return item;
                        }
                    ),
                })
            ),
            quantity: 1,
        });

        Object.assign( defaultProduct, {
            ...defaultProduct,
            KEY_ID: ( JSON.stringify(defaultProduct.id) + JSON.stringify(defaultProduct.attributes) ),
        })

        const productIsNewOnCart = addProductToCartControl( defaultProduct, cartProducts );

        ADD_PRODUCT_TO_CART( productIsNewOnCart, defaultProduct, getLocalStorageDataProducts );

        handleChangeMyBagState();

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

    renderProductColors( product: ProductDataType ) {
    
        const [ swatchAttibute ] = product.attributes.filter( attribute => attribute.type === 'swatch' && attribute );

        if (swatchAttibute)
            return <ColorAttributes  swatchAttibute={swatchAttibute} origin="CategoryPage" />
        else return <div className="empty-colors"/>

    }

    renderCategoryProducts() {

        // CATEGORIES STATES
        const { allCategory, clothesCategory, techCategory } = this.props;

        // CURRENCIES STATES
        const { USD, GBP, AUD, JPY, RUB } = this.props; 

        // PRODUCTS CONTENT ARRAYS
        const { allProducts, clothesProducts, techProducts } = this.state;


        const priceIndex = (  
            ( USD && 0 ) ||
            ( GBP && 1 ) ||
            ( AUD && 2 ) ||
            ( JPY && 3 ) ||
            ( RUB && 4 ) ||
            0
        );
        
        const  selectedCategory = ( allCategory && 'all') || ( clothesCategory && 'clothes') || ( techCategory && 'tech');
            
        switch (selectedCategory) {
            case 'all':

                return (
                    allProducts.map( product => (
                        <ProductInfo 
                            key={product.id} 
                            id="product-info" 
                            outOfStock={!product.inStock}
                            onClick={ () =>  this.handleClickProductInfo(product) }
                        >
                        
                            <div className="product-image">

                                <img className="image" src={product.gallery[0]} alt={`${product.name} image 0`} />

                                { !product.inStock && <span className="outOfStock">OUT OF STOCK</span> }  

                                <ProductInfoCartButton 
                                    id="product-cart-button"
                                    Opaque={this.props.bagVisible}
                                    onClick={( event ) => this.handleClickProductInforCartButton(event, product)}
                                >
                                    <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                                </ProductInfoCartButton>  

                            </div> 
            
                            
                            { this.renderProductColors(product) }
                            

                            <div className="product-names">
                                <span className="product-title">{product.name} -</span>
                                <span className="product-brand">{product.brand}</span>
                            </div>

                            <span className="product-price">
                                {product.prices[priceIndex].currency.symbol} 
                                {product.prices[priceIndex].currency.label}
                                {' ' + product.prices[priceIndex].amount}
                            </span>
                    
                        </ProductInfo>
                    ))
                );

            case 'clothes':

                return (
                    clothesProducts.map( product => (
                        <ProductInfo 
                            key={product.id} 
                            id="product-info" 
                            outOfStock={!product.inStock}
                            onClick={() => this.handleClickProductInfo(product)}
                        >
                        
                            <div className="product-image">

                                <img className="image" src={product.gallery[0]} alt={`${product.name} image 0`} />
                            
                                { !product.inStock && <span className="outOfStock">OUT OF STOCK</span> }

                                <ProductInfoCartButton 
                                    id="product-cart-button"
                                    Opaque={this.props.bagVisible}
                                    onClick={( event ) => this.handleClickProductInforCartButton(event, product)}
                                >
                                    <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                                </ProductInfoCartButton>  

                            </div> 
            
                            { this.renderProductColors(product) }

                            <div className="product-names">
                                <span className="product-title">{product.name} -</span>
                                <span className="product-brand">{product.brand}</span>
                            </div>
                            
                            <span className="product-price">
                                {product.prices[priceIndex].currency.symbol} 
                                {product.prices[priceIndex].currency.label}
                                {' ' + product.prices[priceIndex].amount}
                            </span>
                    
                        </ProductInfo>
                    ))
                );

            case 'tech':
            
                return (
                    techProducts.map( product => (
                        <ProductInfo 
                            key={product.id} 
                            id="product-info" 
                            outOfStock={!product.inStock}
                            onClick={() => this.handleClickProductInfo(product)}
                        >
                        
                            <div className="product-image">

                                <img className="image" src={product.gallery[0]} alt={`${product.name} image 0`} />

                                { !product.inStock && <span className="outOfStock">OUT OF STOCK</span> } 

                                <ProductInfoCartButton 
                                    id="product-cart-button"
                                    Opaque={this.props.bagVisible}
                                    onClick={( event ) => this.handleClickProductInforCartButton(event, product)}
                                >
                                    <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                                </ProductInfoCartButton>  

                            </div> 
            
                            { this.renderProductColors(product) }

                            <div className="product-names">
                                <span className="product-title">{product.name} -</span>
                                <span className="product-brand">{product.brand}</span>
                            </div>

                            <span className="product-price">
                                {product.prices[priceIndex].currency.symbol} 
                                {product.prices[priceIndex].currency.label}
                                {' ' + product.prices[priceIndex].amount}
                            </span>
                    
                        </ProductInfo>
                    ))
                );
        
            default:
                break;
        }

    }


    render() {

        // CATEGORIES STATES
        const { allCategory, clothesCategory, techCategory } = this.props;

        return (

            <CategoryPageContainer id="category-page">
                
                <Header />

                <ShadowWrapper active={this.props.bagVisible}/>
                
                { this.renderCurrencyOptions() }

                { this.renderMyBag() }

                <Main>

                    <div className="category-container">
                        <h2>{(
                            ( allCategory && 'All' ) ||
                            ( clothesCategory && 'Clothes' ) ||
                            ( techCategory && 'Tech' ) 
                        )}</h2>

                        <CategoryContent 
                            className="category-content"
                            // defaultGridDisplay={ }
                        >
                            { this.renderCategoryProducts() }
                        </CategoryContent>

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

const { addProductToCart, getLocalStorageDataProducts } = CartProductsContext.actions;

const mapState = ( state: RootState )  => ({  
//  MY BAG COMPONENT STATES
    bagVisible: state.myBag.value,
    bagActive: state.myBag.bagActive,
//  CURRENCY OPTIONS COMPONENT STATES 
    currencyEnabled: state.currencyOptions.value,
    currencyOptionsActive: state.currencyOptions.currencyOptionsActive, 
//  CATEGORIES STATES
    allCategory: state.categories.all,
    clothesCategory: state.categories.clothes,
    techCategory: state.categories.tech,
//  CURRENCIES STATES
    USD: state.currencies.USD, 
    GBP: state.currencies.GBP,
    AUD: state.currencies.AUD,
    JPY: state.currencies.JPY,
    RUB: state.currencies.RUB,
// CART PRODUCTS STATE
    cartProducts: state.products.cartProducts
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
//  CART PRODUCTS FUNCTIONS
    getLocalStorageDataProducts,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CategoryPage);

// -------------------------------- REDUX CONFIG -------------------------------- //