import React, { PureComponent } from 'react';

import { RootState } from '../../services/redux/store';

import MyBagContext from '../../services/redux/contexts/MyBag';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';

import { getCategoryNames } from '../../services/graphql/components/Header/Queries';

import scandishopLogo from '../../assets/images/scandishop-logo.svg'; 
import moneyIcon from '../../assets/images/money-icon.svg'; 
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import arrowUpIcon from '../../assets/images/up-arrow-icon.svg';
import cartIcon from '../../assets/images/cart-icon.svg';

import SelectCategoryButton from '../SelectCategoryButton';

import {
    HeaderComponent,
    CurrencyAndCart,
    CurrencyButton,
    CartContainer,
} from './styles';
import { connect, ConnectedProps } from 'react-redux';


type HeaderState = {
    womenButton: boolean;
    menButton: boolean;
    kidsButton: boolean;
    categoryNames: string[];
}


class Header extends PureComponent<PropsFromRedux, HeaderState> {

    constructor(props: PropsFromRedux) {
        super(props);
    }

    state: HeaderState = {
        womenButton: true,
        menButton: false,
        kidsButton: false,
        categoryNames: []
    }

    categoryNames: string[] = [];


    async componentDidMount() {
        
        const data = await getCategoryNames();

        this.categoryNames = data;

        console.log("data:", this.categoryNames);

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
        const { handleChangeMyCurrencyOptionsState } = this.props;
        handleChangeMyCurrencyOptionsState();
    }

    handleClickCartButton() {
        const { handleChangeMyBagState } = this.props;
        handleChangeMyBagState();
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

                    { this.props.currencyEnabled 
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


// -------------------------------- REDUX CONFIG -------------------------------- //

const { handleChangeMyBagState } = MyBagContext.actions;

const { handleChangeMyCurrencyOptionsState } = CurrencyOptionsContext.actions;


const mapState = ( state: RootState )  => ({  
    currencyEnabled: state.currencyOptions.value,
})

const mapDispatch = {
    handleChangeMyBagState,
    handleChangeMyCurrencyOptionsState,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);

// -------------------------------- REDUX CONFIG -------------------------------- //
