import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import MyBagContext from '../../services/redux/contexts/MyBag';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import CategoriesContext from '../../services/redux/contexts/Categories';

//GRAPHQL
import { getCategoryNames } from '../../services/graphql/components/Header/Queries';

import scandishopLogo from '../../assets/images/scandishop-logo.svg'; 
import moneyIcon from '../../assets/images/money-icon.svg'; 
import arrowDownIcon from '../../assets/images/down-arrow-icon.svg';
import arrowUpIcon from '../../assets/images/up-arrow-icon.svg';
import cartIcon from '../../assets/images/cart-icon.svg';

//COMPONENTS
import SelectCategoryButton from '../SelectCategoryButton';
import BagAmount from '../BagAmount';

//STYLES
import {
    HeaderComponent,
    CurrencyAndCart,
    CurrencyButton,
    CartContainer,
} from './styles';


type HeaderState = {
    categoryNames: string[];
    redirectCartPage: boolean;
}


class Header extends PureComponent<PropsFromRedux, HeaderState> {

    constructor(props: PropsFromRedux) {
        super(props);
    }

    state: HeaderState = {
        categoryNames: [],
        redirectCartPage: false,
    }

    async componentDidMount() {
        
        const categoryNamesData = await getCategoryNames();
        
        this.setState(() => ({
            categoryNames: categoryNamesData
        }));

    }


    /**
     * @description Changes the selected category button. If the user clicks on any category button
     * and the current page isn't PLP, the user will be redirected to PLP after that.
     */
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

        const windowLocation = window.location.pathname;

        if ( windowLocation === '/') window.scrollTo(0, 0);
        else {
            this.setState( ({ redirectCartPage }) => ({
                redirectCartPage: !redirectCartPage
            }));
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

                <BagAmount />
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

                { this.state.redirectCartPage && <Navigate to='/'/>}
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
//  CURRENCY OPTIONS COMPONENT STATES 
    currencyEnabled: state.currencyOptions.value,
//  CATEGORIES STATES
    allCategory: state.categories.all,
    clothesCategory: state.categories.clothes,
    techCategory: state.categories.tech
})

const mapDispatch = {
//  MY BAG COMPONENT FUNCTION
    handleChangeMyBagState,
//  CURRENCY OPTIONS COMPONENT FUNCTION
    handleChangeMyCurrencyOptionsState,
//  CATEGORIES FUNCTIONS
    setAllCategory, 
    setClothesCategory, 
    setTechCategory
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);

// -------------------------------- REDUX CONFIG -------------------------------- //
