import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// GRAPHQL
import { AttributeSetType, AttributeType } from '../../services/graphql/types';
// REDUX
import TextAttributesContext from '../../services/redux/contexts/TextAttributes';
// COMPONENTS
import OptionButton from '../OptionButton';
// STYLES
import { Container } from './styles';

interface ITextAttributesProps extends PropsFromRedux {
  textAttributes: AttributeSetType[];
  origin: 'MyBag' | 'ProductPage' | 'CartPage';
  shadow: boolean;
}

type ItemsType = {
  name: string;
  value: boolean;
};

type TextAttributesType = {
  name: string;
  items: ItemsType[];
};

type TextAttributesState = {
  attributes: TextAttributesType[];
};

class TextAttributes extends PureComponent<
  ITextAttributesProps,
  TextAttributesState
> {
  constructor(props: ITextAttributesProps) {
    super(props);

    this.state = {
      attributes: this.getAttributesState(),
    } as TextAttributesState;
  }

  /** @description Get all text attributes of passed product and set a initial value for each text attribute. */
  getAttributesState() {
    const { textAttributes, origin, getProductTextAttributes } = this.props;

    let textAttributesData: TextAttributesType[] = [];

    if (origin === 'MyBag' || origin === 'CartPage') {
      textAttributesData = textAttributes.map<TextAttributesType>(
        (attribute) => ({
          name: attribute.name,
          items: attribute.items.map((item) => ({
            name: item.value,
            value: item.selected,
          })),
        })
      );
    } else if (origin === 'ProductPage' || !origin) {
      textAttributesData = textAttributes.map<TextAttributesType>(
        (attribute) => ({
          name: attribute.name,
          items: attribute.items.map((item) => ({
            name: item.value,
            value: item === attribute.items[0],
          })),
        })
      );

      getProductTextAttributes(textAttributesData);
    }

    return textAttributesData;
  }

  getOptionButtonActiveVar(attributeName: string, item: AttributeType) {
    const { attributes } = this.state;

    const attributeTarget = attributes.find(
      (attribute) => attribute.name === attributeName
    );

    const itemActiveValue = attributeTarget?.items.find(
      (target) => target.name === item.value
    );

    return itemActiveValue?.value;
  }

  /**
   * @description Get the changes on text attributes items dynamically and returns the
   * text attributes with the current changes.
   */
  getTextAttributesData(attributeName: string, itemName: string) {
    const { attributes } = this.state;
    const textAttributesData = attributes.map((attribute) => {
      if (attribute.name === attributeName) {
        return {
          name: attribute.name,
          items: attribute.items.map<ItemsType>((item) => ({
            name: item.name,
            value: item.name === itemName,
          })),
        };
      }

      return attribute;
    });

    // Setting textAttributes context
    const { getProductTextAttributes } = this.props;
    getProductTextAttributes(textAttributesData);

    return textAttributesData;
  }

  handleOnClickOptionButton(attributeName: string, itemName: string) {
    this.setState(() => ({
      attributes: this.getTextAttributesData(attributeName, itemName),
    }));
  }

  render() {
    const { textAttributes, origin, shadow } = this.props;

    return (
      <div>
        {textAttributes.map((attribute) => (
          <Container
            className="text-attributes"
            key={attribute.id}
            style={shadow ? { filter: 'brightness(0.78)' } : {}}
            origin={origin}
          >
            <span className="attribute-name">{attribute.name}:</span>

            <div className="attributes-options">
              {attribute.items.map((item) => (
                <OptionButton
                  key={item.id}
                  value={item.id}
                  active={
                    this.getOptionButtonActiveVar(attribute.name, item) || false
                  }
                  origin={origin}
                  onClick={() =>
                    this.handleOnClickOptionButton(attribute.name, item.value)
                  }
                >
                  {item.value}
                </OptionButton>
              ))}
            </div>
          </Container>
        ))}
      </div>
    );
  }
}

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getProductTextAttributes } = TextAttributesContext.actions;

const mapState = () => ({});

const mapDispatch = {
  //  TEXT ATTRIBUTES FUNCTION
  getProductTextAttributes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TextAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //
