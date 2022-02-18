import React, { PureComponent } from 'react';

import { DefaultButton } from '../DefaultButton';

import {
    MyBagContainer,
    ProductWrapper,
    ProductContainer,
    ProductInfo
} from './styles';

export type MyBagProps = {
    isVisible: boolean;
}

class MyBag extends PureComponent<MyBagProps> {

    constructor(props: MyBagProps) {
        super(props);
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

                <ProductWrapper className="product-wrapper">
                    <ProductContainer className="product-container">
                        <ProductInfo className="product-info">
                            <p>Apollo Running Short</p>
                            <span>$50.00</span>

                            <div className="product-size">
                                <div className="size">
                                    <span>S</span>
                                </div>
                                <div className="size">
                                    <span>M</span>
                                </div>
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
                                <div className="size">
                                    <span>S</span>
                                </div>
                                <div className="size">
                                    <span>M</span>
                                </div>
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

                <div className="total-price">
                    <span>Total</span>
                    <span>$100.00</span>
                </div>

                <div className="bag-buttons">
                    <DefaultButton 
                        className="default-button"
                        color="default"
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

            </MyBagContainer>
        ) ;

    }

};

export { MyBag };