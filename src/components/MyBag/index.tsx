import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';

import { DefaultButton } from '../DefaultButton';
import { SizeButton } from '../SizeButton';

import {
    MyBagContainer,
    ProductWrapper,
    ProductContainer,
    ProductInfo
} from './styles';

type MyBagState = {
    redirectCartPage: boolean;
}

export type MyBagProps = {
    isVisible: boolean;
}

class MyBag extends PureComponent<MyBagProps, MyBagState> {

    constructor(props: MyBagProps) {
        super(props);
    }

    state: MyBagState = {
        redirectCartPage: false
    }


    handleClickViewBagButton() {

        console.log('clicked')
        this.setState((state) => ({
            redirectCartPage: !state.redirectCartPage
        }));
    }

    renderMyBagProducts() {

        return (
            <>
                <ProductWrapper className="product-wrapper">
                    <ProductContainer className="product-container">
                        <ProductInfo className="product-info">
                            <p>Apollo Running Short</p>
                            <span>$50.00</span>

                            <div className="product-size">
                                <SizeButton
                                    origin="MyBag"
                                    unavailable={false}
                                    active={true}
                                    onClick={() => {}}
                                >
                                    <span>S</span>
                                </SizeButton>
                                <SizeButton
                                    origin="MyBag"
                                    unavailable={false}
                                    active={false}
                                    onClick={() => {}}
                                >
                                    <span>M</span>
                                </SizeButton>
                            </div>

                        </ProductInfo>

                        <div className="select-quantity">
                            <div className="option-sign">+</div>
                                <span>1</span>
                            <div className="option-sign">-</div>
                        </div>                    
                    </ProductContainer>

                    <aside>
                        <div className="product-image" /> {/*after I'll consume the GraphQL API and set a real image here*/}
                    </aside>

                </ProductWrapper>  
            
            
                <ProductWrapper className="product-wrapper">
                    <ProductContainer className="product-container">
                        <ProductInfo className="product-info">
                            <p>Jupiter Wayfarer</p>
                            <span>$75.00</span>

                            <div className="product-size">
                                <SizeButton
                                    origin="MyBag"
                                    unavailable={false}
                                    active={true}
                                    onClick={() => {}}
                                >
                                    <span>S</span>
                                </SizeButton>
                                <SizeButton
                                    origin="MyBag"
                                    unavailable={false}
                                    active={false}
                                    onClick={() => {}}
                                >
                                    <span>M</span>
                                </SizeButton>
                            </div>

                        </ProductInfo>

                        <div className="select-quantity">
                            <div className="option-sign">+</div>
                                <span>2</span>
                            <div className="option-sign">-</div>
                        </div>                    
                    </ProductContainer>

                    <aside>
                        <div className="product-image" /> {/*after I'll consume the GraphQL API and set a real image here*/}
                    </aside>

                </ProductWrapper>
            </>

        );

    }

    render() {

        const { isVisible } = this.props;

        return (
            <MyBagContainer 
                className="my-bag"
                isVisible={isVisible}
            >
                
                <div className="bag-description">
                    <strong>My Bag, </strong>
                    <span>2 items</span>
                </div>

                { this.renderMyBagProducts() }

                <div className="total-price">
                    <span>Total</span>
                    <span>$100.00</span>
                </div>

                <div className="bag-buttons">
                    <DefaultButton 
                        className="default-button"
                        color="default"
                        onClick={() => this.handleClickViewBagButton()}
                    >
                        VIEW BAG
                    </DefaultButton>
                    <DefaultButton 
                        className="default-button"
                        color="green"
                    >
                        CHECK OUT
                    </DefaultButton>
                </div>


                { this.state.redirectCartPage && <Navigate to='/cart'/>}

            </MyBagContainer>
        ) ;

    }

};

export { MyBag };