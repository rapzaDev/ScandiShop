import React, { PureComponent } from 'react';

import { getState, subscribe } from '../../store';

import cartIcon from '../../assets/images/white-cart-icon.svg';

import { Header }  from '../../components/Header/Header';
import { MyBag } from '../../components/MyBag/MyBag';

import {
    HomePage,
    ShadowContainer,
    Main,
    ProductInfo,
    ProductInfoCartButton
} from './styles';


type HomeState = {
    bagVisible: boolean;
    unsubscribe: any; 
    outOfStock: boolean;
}

class Home extends PureComponent<{}, HomeState> {

    state: HomeState = {
        bagVisible: false,
        unsubscribe: undefined,
        outOfStock: false,
    }
 
    componentDidMount() {
        const unsubscribe = subscribe( () => {
            const { value } = getState().myBag;

            this.setState(() => ({
                bagVisible: value
            }))
        });

        this.setState(() => ({
            unsubscribe: unsubscribe
        }))
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }


    renderMyBag() {

        if ( this.state.bagVisible)
            return <MyBag isVisible={ this.state.bagVisible } />
        else return <></>

    }

    renderCategoryProducts() {

        return (
            <>                           
                <ProductInfo 
                    className="product-info" 
                    outOfStock={this.state.outOfStock} 
                >

                        <div className="product-image">
                            <ProductInfoCartButton className="product-cart-button">
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
                            <ProductInfoCartButton className="product-cart-button">
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}

                        

                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>

                <ProductInfo className="product-info" outOfStock={true}>
                    
                        <div className="product-image">
                            <span>OUT OF STOCK</span>  
                            <ProductInfoCartButton className="product-cart-button">
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
                            <ProductInfoCartButton className="product-cart-button">
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
                            <ProductInfoCartButton className="product-cart-button">
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
                            <ProductInfoCartButton className="product-cart-button">
                                <img src={cartIcon} alt="ProductInfoCartButton cart button" />
                            </ProductInfoCartButton>
                        </div> {/**later i'll replace it with a image */}

                        
                        
                        <span className="product-title">Apollo Running Short</span>
                        <span className="product-price">$50.00</span>

                </ProductInfo>
            </>
        )

    }


    render() {

        return (

            <HomePage id="home-page">
                
                <Header />

                <ShadowContainer 
                    className="shadow-container"
                    active={this.state.bagVisible}
                >
                    { this.renderMyBag() }

                    <Main>

                        <div className="category-container">
                            <h2>Women Category</h2>

                            <div className="category-content">
                                { this.renderCategoryProducts() }
                            </div>

                        </div>

                    </Main>
                </ShadowContainer>

            </HomePage>

        );

    }

};

export { Home };
