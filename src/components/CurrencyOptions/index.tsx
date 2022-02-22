import React, { PureComponent } from 'react';

import { currencyOptionsContext } from '../../contexts/CurrencyOptionsContext';

import { 
    Container
 } from './styles';

class CurrencyOptions extends PureComponent {

    componentDidMount() {
        document.getElementById('currency-options')?.addEventListener('pointerleave', this.pointerLeaveOfMyBagComponent );

        document.getElementById('currency-options')?.addEventListener('pointerenter', this.pointerEnterOfMyBagComponent );
    }


    pointerLeaveOfMyBagComponent() {
        currencyOptionsContext.deactivateCurrencyOptionsComponent();
    }

    pointerEnterOfMyBagComponent() {
        currencyOptionsContext.activateCurrencyOptionsComponent();
    }




    render() {

        return (

            <Container id="currency-options">
                <button>$ USD</button>
                <button>€ EUR</button>
                <button>¥ JPY</button>
            </Container>

        );

    }

};

export { CurrencyOptions };