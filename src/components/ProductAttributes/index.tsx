import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// GRAPHQL
import { AttributeSetType } from '../../services/graphql/types';
// REDUX
import { RootState } from '../../services/redux/store';
// COMPONENTS
import ColorAttributes from '../ColorAttributes';
import TextAttributes from '../TextAttributes';
// STYLES
import { Container } from './styles';

interface IProductAttributesProps extends PropsFromRedux {
  productAttributes: AttributeSetType[];
  origin: 'ProductPage' | 'CartPage' | 'MyBag';
}

class ProductAttributes extends PureComponent<IProductAttributesProps> {
  render() {
    const { productAttributes, origin, bagVisible } = this.props;

    const textAttributes = productAttributes.filter(
      (attribute) => attribute.type === 'text'
    );

    const [colorAttribute] = productAttributes.filter(
      (attribute) => attribute.type === 'swatch'
    );

    return (
      <Container id="product-attributes">
        {colorAttribute && (
          <ColorAttributes swatchAttibute={colorAttribute} origin={origin} />
        )}

        <TextAttributes
          textAttributes={textAttributes}
          origin={origin}
          shadow={bagVisible}
        />
      </Container>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const mapState = (state: RootState) => ({
  //  MY BAG COMPONENT STATES
  bagVisible: state.myBag.value,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //
