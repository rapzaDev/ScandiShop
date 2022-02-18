import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';

import { getState, subscribe } from '../../store';
import { currencyOptionsContext } from '../../contexts/CurrencyOptionsContext';
import { myBagContext } from '../../contexts/MyBagContext';

import cartIcon from '../../assets/images/white-cart-icon.svg';

import { Header }  from '../../components/Header';
import { ShadowWrapper } from '../../components/ShadowWrapper';
import { MyBag } from '../../components/MyBag';
import { CurrencyOptions } from '../../components/CurrencyOptions';

import {
    CategoryPageContainer,
    Main,
    ProductInfo,
    ProductInfoCartButton
} from './styles';


type CategoryPageState = {
    bagVisible: boolean;
    unsubscribe: any; 
    outOfStock: boolean;
    currencyEnabled: boolean;
    redirectProductPage: boolean;
}

class CategoryPage extends PureComponent<{}, CategoryPageState> {

    constructor(props: {}) {
        super(props);
        this.handleClickOnScreen = this.handleClickOnScreen.bind(this);
    }

    state: CategoryPageState = {
        bagVisible: false,
        unsubscribe: undefined,
        outOfStock: false,
        currencyEnabled: false,
        redirectProductPage: false,
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
        }))

    }

    componentDidUpdate() {
        document.getElementById('category-page')?.addEventListener('click', this.handleClickOnScreen);
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

    handleClickProductInfoCartButton() {
        this.setState((state) => ({
            redirectProductPage: !state.redirectProductPage
        }))
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

    renderCategoryProducts() {

        return (
            <>                           
                <ProductInfo 
                    className="product-info" 
                    outOfStock={this.state.outOfStock} 
                >

                        <div className="product-image">
                            <ProductInfoCartButton 
                                className="product-cart-button"
                                onClick={() => this.handleClickProductInfoCartButton()}
                            >
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}
                        
                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>

                <ProductInfo 
                    className="product-info" 
                    outOfStock={this.state.outOfStock} 
                >

                        <div className="product-image">
                            <ProductInfoCartButton 
                                className="product-cart-button"
                                onClick={() => this.handleClickProductInfoCartButton()}
                            >
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}

                        

                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>

                <ProductInfo className="product-info" outOfStock={true}>
                    
                        <div className="product-image">
                            <span>OUT OF STOCK</span>  
                            <ProductInfoCartButton 
                                className="product-cart-button"
                                onClick={() => this.handleClickProductInfoCartButton()}
                            >
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>  
                        </div> {/**later i'll replace it with a image */}

                        

                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>
                    
                </ProductInfo>

                <ProductInfo 
                    className="product-info" 
                    outOfStock={this.state.outOfStock} 
                >

                        <div className="product-image">
                            <ProductInfoCartButton 
                                className="product-cart-button"
                                onClick={() => this.handleClickProductInfoCartButton()}
                            >
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}

                        

                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>

                <ProductInfo 
                    className="product-info" 
                    outOfStock={this.state.outOfStock} 
                >

                        <div className="product-image">
                            <ProductInfoCartButton 
                                className="product-cart-button"
                                onClick={() => this.handleClickProductInfoCartButton()}
                            >
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}

                        

                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>

                <ProductInfo 
                    className="product-info" 
                    outOfStock={this.state.outOfStock} 
                >

                        <div className="product-image">
                            <ProductInfoCartButton 
                                className="product-cart-button"
                                onClick={() => this.handleClickProductInfoCartButton()}
                            >
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}

                        
                        
                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>
            
                { this.state.redirectProductPage && <Navigate to='/product'/>}
            </>
        )

    }


    render() {

        return (

            <CategoryPageContainer id="category-page">
                
                <Header />

                <ShadowWrapper active={this.state.bagVisible}/>
                
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
                    
            </CategoryPageContainer>

        );

    }

};

export { CategoryPage };
