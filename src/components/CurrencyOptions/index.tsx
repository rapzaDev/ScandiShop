import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../services/redux/store';

import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import CurrenciesContext from '../../services/redux/contexts/Currencies';

import { getCurrencies } from '../../services/graphql/components/CurrencyOptions/Queries';

import { 
    Container
 } from './styles';

type CurrencieDataType = {
    symbol: string;
    label: string;
}

type CurrencyOptionsState = {
    currencies: CurrencieDataType[];
}

class CurrencyOptions extends PureComponent<PropsFromRedux, CurrencyOptionsState> {

    constructor(props:PropsFromRedux) {
        super(props);
        this.pointerLeaveOfMyBagComponent = this.pointerLeaveOfMyBagComponent.bind(this);
        this.pointerEnterOfMyBagComponent = this.pointerEnterOfMyBagComponent.bind(this);
    }

    state: CurrencyOptionsState = {
        currencies: [],
    }

    async componentDidMount() {
        document.getElementById('currency-options')?.addEventListener('pointerleave', this.pointerLeaveOfMyBagComponent );

        document.getElementById('currency-options')?.addEventListener('pointerenter', this.pointerEnterOfMyBagComponent );


        const currenciesData = await getCurrencies();

        this.setState(() => ({
            currencies: currenciesData
        }))

    }

    pointerLeaveOfMyBagComponent() {
        const { deactivateCurrencyOptionsComponent } = this.props;

        deactivateCurrencyOptionsComponent();
    }

    pointerEnterOfMyBagComponent() {
        const { activateCurrencyOptionsComponent } = this.props;

        activateCurrencyOptionsComponent();
    }


    handleOnClick( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        const currency = e.currentTarget.value;

        const { 
            setUSDCurrency,
            setGBPCurrency,
            setAUDCurrency,
            setJPYCurrency,
            setRUBCurrency
        } = this.props;

        switch (currency) {
            case 'USD':
                setUSDCurrency();
                break;

            case 'GBP':
                setGBPCurrency();
                break;

            case 'AUD':
                setAUDCurrency();
                break;

            case 'JPY':
                setJPYCurrency();
                break;

            case 'RUB':
                setRUBCurrency();
                break;

            default:
                break;
        }

    }


    render() {

        const { currencies } = this.state;

        return (

            <Container id="currency-options">
                { 
                    currencies.map( currency => (
                        <button
                            key={currency.symbol}
                            value={currency.label}
                            onClick={(e) => this.handleOnClick(e)}
                        >
                            {currency.symbol} {currency.label}
                        </button>
                    ))  
                }
            </Container>

        );

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const {
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent
} = CurrencyOptionsContext.actions;

const {
    setUSDCurrency,
    setGBPCurrency,
    setAUDCurrency,
    setJPYCurrency,
    setRUBCurrency
} = CurrenciesContext.actions;

const mapState = ( state: RootState )  => ({});

const mapDispatch = {
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent,
    setUSDCurrency,
    setGBPCurrency,
    setAUDCurrency,
    setJPYCurrency,
    setRUBCurrency
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrencyOptions);

// -------------------------------- REDUX CONFIG -------------------------------- //
