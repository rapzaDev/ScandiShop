import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// GRAPHQL
import { AttributeSetType } from '../../services/graphql/types';
// REDUX
import ColorAttributesContext from '../../services/redux/contexts/ColorAttributes';
import { RootState } from '../../services/redux/store';
// STYLES
import { Container, ProductColor, ProductColorButtonWrapper } from './styles';

interface IColorAttributesProps extends PropsFromRedux {
  swatchAttibute: AttributeSetType;
  origin: 'CategoryPage' | 'ProductPage' | 'CartPage' | 'MyBag';
}

type ColorItemsType = {
  id: string;
  value: string;
  selected: boolean;
};

type ColorAttributesState = {
  colorItems: ColorItemsType[];
};

class ColorAttributes extends PureComponent<
  IColorAttributesProps,
  ColorAttributesState
> {
  constructor(props: IColorAttributesProps) {
    super(props);

    this.state = {
      colorItems: [],
    } as ColorAttributesState;
  }

  componentDidMount() {
    this.setState(() => ({
      colorItems: this.getColorItemsData(),
    }));
  }

  getColorItemsData() {
    const { swatchAttibute, origin, getProductColorAttributes } = this.props;

    let colorItemsData;

    if (origin === 'MyBag' || origin === 'CartPage') {
      colorItemsData = swatchAttibute.items.map<ColorItemsType>((color) => ({
        id: color.id,
        value: color.value,
        selected: color.selected,
      }));
    } else {
      colorItemsData = swatchAttibute.items.map<ColorItemsType>((color) => ({
        id: color.id,
        value: color.value,
        selected: swatchAttibute.items[0] === color,
      }));

      getProductColorAttributes(colorItemsData);
    }

    return colorItemsData;
  }

  /**
   * @description
   * Gets the name of the color in the parameters and sets within the color items
   * the selected value as true and false for the rest.
   *
   * @params colorName: name of the selected color
   * */
  handleClickProductColor(colorName: string) {
    this.setState((state) => ({
      colorItems: state.colorItems.map<ColorItemsType>((color) => ({
        id: color.id,
        value: color.value,
        selected: color.id === colorName,
      })),
    }));

    const { colorItems } = this.state;
    const colorAttributesData = colorItems.map<ColorItemsType>((color) => ({
      id: color.id,
      value: color.value,
      selected: color.id === colorName,
    }));

    const { getProductColorAttributes } = this.props;
    getProductColorAttributes(colorAttributesData);
  }

  /** @description Searches in the state of color items who has the prop selected as true and returns it */
  getColorActive(colorID: string) {
    const { colorItems } = this.state;

    const color = colorItems.find((color) => color.id === colorID);

    return color?.selected;
  }

  render() {
    const { swatchAttibute, bagVisible, origin } = this.props;

    return (
      <Container id="color-attributes" origin={origin}>
        {origin !== 'CategoryPage' && (
          <span className="attribute-name">{swatchAttibute.name}:</span>
        )}

        <div className="product-colors">
          {swatchAttibute?.items.map((item) => (
            <ProductColorButtonWrapper
              key={item.id}
              active={this.getColorActive(item.id) || false}
              origin={origin}
            >
              <ProductColor
                key={item.id}
                className="product-color"
                style={{
                  backgroundColor: `${item.value}`,
                  border: `${item.value === '#FFFFFF' && '1px solid #A6A6A6'}`,
                  opacity: `${bagVisible ? '0.5' : '1'}`,
                }}
                value={item.value}
                onClick={() => this.handleClickProductColor(item.id)}
                disabled={origin !== 'ProductPage'}
              />
            </ProductColorButtonWrapper>
          ))}
        </div>
      </Container>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getProductColorAttributes } = ColorAttributesContext.actions;

const mapState = (state: RootState) => ({
  //  MY BAG COMPONENT STATE
  bagVisible: state.myBag.value,
  // COLOR ATTRIBUTES STATE
  COLOR_ATTRIBUTES: state.colorAttributes.colorAttributes,
});

const mapDispatch = {
  //  COLOR ATTRIBUTES FUNCTION
  getProductColorAttributes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ColorAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //
