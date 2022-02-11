import React, { DetailedHTMLProps, HTMLAttributes, PureComponent } from 'react';

import scandishopLogo from '../../assets/images/scandishop-logo.svg'; 
import moneyIcon from '../../assets/images/money-icon.svg'; 
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import cartIcon from '../../assets/images/cart-icon.svg';

import { SelectCategoryButton } from '../../components/SelectCategoryButton/SelectCategoryButton';

import {
    HeaderComponent,
    CurrencyAndCart
} from './styles';

type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

class Header extends PureComponent<HeaderProps> {

    constructor(props: HeaderProps) {
        super(props)
    }

    render() {

        return(
            <HeaderComponent>
                
                <div className="category-buttons">
                    <SelectCategoryButton isSelected={true}>WOMEN</SelectCategoryButton>
                    <SelectCategoryButton isSelected={false}>MEN</SelectCategoryButton>
                    <SelectCategoryButton isSelected={false}>KIDS</SelectCategoryButton>
                </div>

                <div className="logo-div">
                    <img src={scandishopLogo} alt="Website Logo icon" />
                </div>

                <CurrencyAndCart className="currency-and-cart">
                    <div className="currency">
                        <img src={moneyIcon} alt="Currency Icon" />
                        <img src={arrowDownIcon} alt="Arrow Down Icon" />
                    </div>

                    <div className="cart">
                        <img src={cartIcon} alt="Cart Icon" />
                    </div>
                </CurrencyAndCart>

            </HeaderComponent>
        );

    }

};

export { Header };