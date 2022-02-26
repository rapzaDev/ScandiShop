import React, { PureComponent } from 'react';

import { RootState } from '../../services/redux/store';

import MyBagContext from '../../services/redux/contexts/MyBag';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import CategoriesContext from '../../services/redux/contexts/Categories';

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
    // all: boolean;
    // clothes: boolean;
    // tech: boolean;
    categoryNames: string[];
}


class Header extends PureComponent<PropsFromRedux, HeaderState> {

    constructor(props: PropsFromRedux) {
        super(props);
    }

    state: HeaderState = {
        // all: true,
        // clothes: false,
        // tech: false,
        categoryNames: [],
    }

    async componentDidMount() {
        
        const categoryNamesData = await getCategoryNames();
        
        this.setState(() => ({
            categoryNames: categoryNamesData
        }));

    }


    handleClickCategoryButton( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {

        const { setAllCategory, setClothesCategory, setTechCategory } = this.props;
        const { value } = e.currentTarget;
        
        switch (value) {
            case 'all':
                setAllCategory();
                break;

            case 'clothes':
                setClothesCategory();
                break;

            case 'tech':
                setTechCategory();
                break;
        
            default:
                break;
        }

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

        const { categoryNames } = this.state;
        const { allCategory, clothesCategory, techCategory } = this.props;

        return (

            <div className="category-buttons">
                
                { 
                    categoryNames.map( categoryName => (
                        <SelectCategoryButton 
                            key={categoryName}
                            onClick={(e) => this.handleClickCategoryButton(e)}
                            value={categoryName}
                            isSelected={
                                categoryName === 'all' && allCategory || 
                                categoryName === 'clothes' && clothesCategory || 
                                categoryName === 'tech' && techCategory 
                            }
                        >
                            { categoryName } 
                         </SelectCategoryButton>
                    ))
                }

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

const { 
    setAllCategory, 
    setClothesCategory, 
    setTechCategory
} = CategoriesContext.actions;


const mapState = ( state: RootState )  => ({  
    currencyEnabled: state.currencyOptions.value,
    allCategory: state.categories.all,
    clothesCategory: state.categories.clothes,
    techCategory: state.categories.tech
})

const mapDispatch = {
    handleChangeMyBagState,
    handleChangeMyCurrencyOptionsState,
    setAllCategory, 
    setClothesCategory, 
    setTechCategory
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);

// -------------------------------- REDUX CONFIG -------------------------------- //
