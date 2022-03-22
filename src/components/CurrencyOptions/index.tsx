import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// GRAPHQL
import { getCurrencies } from '../../services/graphql/components/CurrencyOptions/Queries';
// REDUX
import CurrenciesContext from '../../services/redux/contexts/Currencies';
import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
// STYLES
import { Container } from './styles';

type CurrencieDataType = {
  symbol: string;
  label: string;
};

type CurrencyOptionsState = {
  currencies: CurrencieDataType[];
};

class CurrencyOptions extends PureComponent<
  PropsFromRedux,
  CurrencyOptionsState
> {
  constructor(props: PropsFromRedux) {
    super(props);

    this.state = {
      currencies: [],
    } as CurrencyOptionsState;
  }

  async componentDidMount() {
    const currenciesData = await getCurrencies();

    this.setState(() => ({
      currencies: currenciesData,
    }));
  }

  handleContainerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  handleOnClick(currencyLabel: string) {
    const {
      setUSDCurrency,
      setGBPCurrency,
      setAUDCurrency,
      setJPYCurrency,
      setRUBCurrency,
    } = this.props;

    const { handleChangeMyCurrencyOptionsState } = this.props;

    switch (currencyLabel) {
      case 'USD':
        setUSDCurrency();
        handleChangeMyCurrencyOptionsState();
        return;

      case 'GBP':
        setGBPCurrency();
        handleChangeMyCurrencyOptionsState();
        return;

      case 'AUD':
        setAUDCurrency();
        handleChangeMyCurrencyOptionsState();
        return;

      case 'JPY':
        setJPYCurrency();
        handleChangeMyCurrencyOptionsState();
        return;

      case 'RUB':
        setRUBCurrency();
        handleChangeMyCurrencyOptionsState();
        break;
      default:
    }
  }

  render() {
    const { currencies } = this.state;

    return (
      <Container
        id="currency-options"
        onClick={(e) => this.handleContainerClick(e)}
      >
        {currencies.map((currency) => (
          <button
            type="button"
            key={currency.symbol}
            value={currency.label}
            onClick={() => this.handleOnClick(currency.label)}
          >
            {currency.symbol} {currency.label}
          </button>
        ))}
      </Container>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const {
  activateCurrencyOptionsComponent,
  deactivateCurrencyOptionsComponent,
  handleChangeMyCurrencyOptionsState,
} = CurrencyOptionsContext.actions;

const {
  setUSDCurrency,
  setGBPCurrency,
  setAUDCurrency,
  setJPYCurrency,
  setRUBCurrency,
} = CurrenciesContext.actions;

const mapState = () => ({});

const mapDispatch = {
  //  CURRENCY OPTIONS COMPONENT FUNCTIONS
  activateCurrencyOptionsComponent,
  deactivateCurrencyOptionsComponent,
  handleChangeMyCurrencyOptionsState,
  //  CURRENCIES FUNCTIONS
  setUSDCurrency,
  setGBPCurrency,
  setAUDCurrency,
  setJPYCurrency,
  setRUBCurrency,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrencyOptions);

// -------------------------------- REDUX CONFIG -------------------------------- //
