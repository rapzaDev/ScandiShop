import React, { PureComponent } from 'react';

import { 
    Container
 } from './styles';

class CurrencyOptions extends PureComponent {

    render() {

        return (

            <Container className="currency-options">
                <button>$ USD</button>
                <button>€ EUR</button>
                <button>¥ JPY</button>
            </Container>

        );

    }

};

export { CurrencyOptions };