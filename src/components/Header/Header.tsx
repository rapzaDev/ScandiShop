import React, { PureComponent } from 'react';

import { myBagContext } from '../../contexts/MyBagContext';

import scandishopLogo from '../../assets/images/scandishop-logo.svg'; 
import moneyIcon from '../../assets/images/money-icon.svg'; 
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import arrowUpIcon from '../../assets/images/up-arrow-icon.svg';
import cartIcon from '../../assets/images/cart-icon.svg';

import { SelectCategoryButton } from '../SelectCategoryButton/SelectCategoryButton';
import { MyBag } from '../MyBag/MyBag';

import {
    HeaderComponent,
    CurrencyAndCart,
    CurrencyButton,
    CartContainer,
    CurrencyOptions,
} from './styles';

type HeaderState = {
    currencyEnabled: boolean;
    bagVisible: boolean;
}

class Header extends PureComponent<{}, HeaderState> {

    state: HeaderState = {
        currencyEnabled: false,
        bagVisible: false,
    }

    handleCurrencyButton() {
        this.setState( (state) => ({
            currencyEnabled: !state.currencyEnabled
        }));
    }

    handleChangeMyBagState() {

        const value = myBagContext.getMyBagState();

        this.setState( () => ({
            bagVisible: value
        }));

    }

    renderCategoryButtons() {
        return (
            <div className="category-buttons">
                <SelectCategoryButton isSelected={true}>WOMEN</SelectCategoryButton>
                <SelectCategoryButton isSelected={false}>MEN</SelectCategoryButton>
                <SelectCategoryButton isSelected={false}>KIDS</SelectCategoryButton>
            </div>
        );
    }

    renderCurrencyButton() {
        return(
            <div className="currency">

                <CurrencyButton onClick={() => this.handleCurrencyButton()}>
                    <img src={moneyIcon} alt="Currency Icon" />

                    { this.state.currencyEnabled 
                        ? <img src={arrowUpIcon} alt="Arrow Up Icon" />
                        : <img src={arrowDownIcon} alt="Arrow Down Icon" /> 
                    }

                </CurrencyButton>

            </div>
        );
    }

    renderCart() {
        
        return(
            <CartContainer className="cart">
                <button  onClick={() => this.handleChangeMyBagState() }>
                    <img src={cartIcon} alt="Cart Icon" />
                </button>
                <div className="product-quantity">
                    <span>2</span>
                </div>
            </CartContainer>
        );
    }

    renderCurrencyOptions() {
        return(
            <CurrencyOptions>
                <button>$ USD</button>
                <button>€ EUR</button>
                <button>¥ JPY</button>
            </CurrencyOptions>
        );
    }

    render() {               

        return(

            <>
                <HeaderComponent>

                    { this.renderCategoryButtons() }

                    <div className="logo-div">
                        <img src={scandishopLogo} alt="Website Logo icon" />
                    </div>

                    <CurrencyAndCart className="currency-and-cart">
                        
                        { this.renderCurrencyButton() }

                        { this.renderCart() }
                        
                    </CurrencyAndCart>

                </HeaderComponent>

                { this.state.currencyEnabled && this.renderCurrencyOptions() }
            </>
        );

    }

};


export { Header };