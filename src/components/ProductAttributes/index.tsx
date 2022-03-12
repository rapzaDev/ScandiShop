import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';

//GRAPHQL
import { AttributeSetType, ProductDataType } from '../../services/graphql/types';

//UTILS
import { CART_PRODUCTS_DATA } from '../../utils/functions';

//COMPONENTS
import ColorAttributes from '../ColorAttributes';
import TextAttributes from '../TextAttributes';

//STYLES
import {
    Container
} from './styles'

interface ProductAttributesProps extends PropsFromRedux {
    productAttributes: AttributeSetType[]; 
    origin: 'ProductPage' | 'CartPage' | 'MyBag';
}

class ProductAttributes extends PureComponent<ProductAttributesProps> {

    render() {

        const { productAttributes, origin, bagVisible } = this.props;

        const textAttributes = productAttributes.filter( attribute => attribute.type === 'text' );
    
        const [ colorAttribute ] = productAttributes.filter( attribute => attribute.type === 'swatch' );

        return(

            <Container id="product-attributes">

                { colorAttribute && <ColorAttributes swatchAttibute={colorAttribute} origin={origin} /> }

                <TextAttributes textAttributes={textAttributes} origin={origin} shadow={bagVisible}/>

            </Container>

        );

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const mapState = ( state: RootState )  => ({  
//  MY BAG COMPONENT STATES
    bagVisible: state.myBag.value,
})

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //


