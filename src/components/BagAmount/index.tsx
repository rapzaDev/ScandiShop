import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';

//GRAPHQL
import { ProductDataType } from '../../services/graphql/types';

//STYLES
import { Container } from './styles';


class BagAmount extends PureComponent<PropsFromRedux> {

    render() {

        const { cartProducts } = this.props;

        const data = localStorage.getItem('@scandishop/cartProducts');
        const cartProductsLocalStorage: ProductDataType[] = ( data ? JSON.parse(data) : [] );


        const amount = ( cartProducts.length ? cartProducts.length : cartProductsLocalStorage.length );

        return(

            <Container id="bag-amount">
                <span>{amount}</span>
            </Container>

        );

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const mapState = ( state: RootState )  => ({
// CART PRODUCTS STATE
    cartProducts: state.products.cartProducts
})

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BagAmount);

// -------------------------------- REDUX CONFIG -------------------------------- //