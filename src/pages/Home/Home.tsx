import React, { PureComponent } from 'react';

import scandishopLogo from '../../assets/images/scandishop-logo.svg'; 
import moneyIcon from '../../assets/images/money-icon.svg'; 
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import cartIcon from '../../assets/images/cart-icon.svg';

import { SelectCategoryButton } from '../../components/SelectCategoryButton/SelectCategoryButton';

import {
    HomePage,
} from './styles';

class Home extends PureComponent {

    render() {

        return (

            <HomePage id="home-page">
                <header>
                
                    <div className="category-buttons">
                        <SelectCategoryButton isSelected={true}>WOMEN</SelectCategoryButton>
                        <SelectCategoryButton isSelected={false}>MEN</SelectCategoryButton>
                        <SelectCategoryButton isSelected={false}>KIDS</SelectCategoryButton>
                    </div>

                    <div className="logo-div">
                        <img src={scandishopLogo} alt="Website Logo icon" />
                    </div>

                    <div className="currency-and-cart">
                        <div className="currency-icon">
                            <img src={moneyIcon} alt="Currency Icon" />
                            <img src={arrowDownIcon} alt="Arrow Down Icon" />
                        </div>
                        <div className="cart-icon">
                            <img src={cartIcon} alt="Cart Icon" />
                        </div>
                    </div>


                </header>

                <main>
                    
                </main>

            </HomePage>

        );

    }

};

export { Home };
