import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CurrencyOptionsContext from '../../services/redux/contexts/CurrencyOptions';
import { RootState } from '../../services/redux/store';

import { 
    Container
 } from './styles';

class CurrencyOptions extends PureComponent<PropsFromRedux> {

    constructor(props:PropsFromRedux) {
        super(props);
        this.pointerLeaveOfMyBagComponent = this.pointerLeaveOfMyBagComponent.bind(this);
        this.pointerEnterOfMyBagComponent = this.pointerEnterOfMyBagComponent.bind(this);
    }

    componentDidMount() {
        document.getElementById('currency-options')?.addEventListener('pointerleave', this.pointerLeaveOfMyBagComponent );

        document.getElementById('currency-options')?.addEventListener('pointerenter', this.pointerEnterOfMyBagComponent );
    }


    pointerLeaveOfMyBagComponent() {
        const { deactivateCurrencyOptionsComponent } = this.props;

        deactivateCurrencyOptionsComponent();
    }

    pointerEnterOfMyBagComponent() {
        const { activateCurrencyOptionsComponent } = this.props;

        activateCurrencyOptionsComponent();
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

// -------------------------------- REDUX CONFIG -------------------------------- //

const {
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent
} = CurrencyOptionsContext.actions;

const mapState = ( state: RootState )  => ({});

const mapDispatch = {
    activateCurrencyOptionsComponent,
    deactivateCurrencyOptionsComponent,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrencyOptions);

// -------------------------------- REDUX CONFIG -------------------------------- //
