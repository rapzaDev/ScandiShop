import React, { PureComponent } from 'react';

import { getState, subscribe } from '../../store';

import { myBagContext } from '../../contexts/MyBagContext';
import { currencyOptionsContext } from '../../contexts/CurrencyOptionsContext';

import scandishopLogo from '../../assets/images/scandishop-logo.svg'; 
import moneyIcon from '../../assets/images/money-icon.svg'; 
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import arrowUpIcon from '../../assets/images/up-arrow-icon.svg';
import cartIcon from '../../assets/images/cart-icon.svg';

import { SelectCategoryButton } from '../SelectCategoryButton/SelectCategoryButton';

import {
    HeaderComponent,
    CurrencyAndCart,
    CurrencyButton,
    CartContainer,
    CurrencyOptions,
} from './styles';

type HeaderState = {
    currencyEnabled: boolean;
    unsubscribe: any; 
    womenButton: boolean;
    menButton: boolean;
    kidsButton: boolean;
}

class Header extends PureComponent<{}, HeaderState> {

    state: HeaderState = {
        currencyEnabled: false,
        unsubscribe: undefined,
        womenButton: true,
        menButton: false,
        kidsButton: false
    }


    componentDidMount() {
        const unsubscribe = subscribe( () => {
            const { value } = getState().currencyOptions;

            this.setState(() => ({
                currencyEnabled: value
            }))
        });

        this.setState(() => ({
            unsubscribe: unsubscribe
        }))
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }



    handleClickCategoryWomanButton() {
        this.setState(() => ({
            womenButton: true,
            menButton: false,
            kidsButton: false
        }))
    }

    handleClickCategoryMenButton() {
        this.setState(() => ({
            womenButton: false,
            menButton: true,
            kidsButton: false
        }))
    }

    handleClickCategoryKidsButton() {
        this.setState(() => ({
            womenButton: false,
            menButton: false,
            kidsButton: true
        }))
    }

    handleCurrencyButton() {
        currencyOptionsContext.changeMyCurrencyOptionsState();
    }

    handleClickCartButton() {
        myBagContext.changeMyBagState();
    }
    

    renderCategoryButtons() {
        return (
            <div className="category-buttons">
                <SelectCategoryButton 
                    onClick={() => this.handleClickCategoryWomanButton()}
                    isSelected={this.state.womenButton}
                >
                    WOMEN
                </SelectCategoryButton>
                <SelectCategoryButton 
                    onClick={() => this.handleClickCategoryMenButton()}
                    isSelected={this.state.menButton}
                >
                    MEN
                </SelectCategoryButton>
                <SelectCategoryButton 
                    onClick={() => this.handleClickCategoryKidsButton()}
                    isSelected={this.state.kidsButton}
                >
                    KIDS
                </SelectCategoryButton>
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
                <button  onClick={() => this.handleClickCartButton() }>
                    <img src={cartIcon} alt="Cart Icon" />
                </button>
                <div className="product-quantity">
                    <span>2</span>
                </div>
            </CartContainer>
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
            </>
        );

    }

};


export { Header };