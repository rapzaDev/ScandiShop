import React, { PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";

//REDUX
import { RootState } from "../../services/redux/store";
import TextAttributesContext from '../../services/redux/contexts/TextAttributes';

//GRAPHQL
import { AttributeSetType, AttributeType } from '../../services/graphql/types';

//COMPONENTS
import OptionButton from "../OptionButton";

//STYLES
import { Container } from './styles';

interface TextAttributesProps extends PropsFromRedux {
    textAttributes: AttributeSetType[];
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
    shadow: boolean;
}

type ItemsType = {
    name: string;
    value: boolean;
}

type TextAttributesType = {
    name: string;
    items: ItemsType[];
}

type TextAttributesState = {
    attributes: TextAttributesType[];
}

class TextAttributes extends PureComponent<TextAttributesProps, TextAttributesState> {

    constructor(props: TextAttributesProps) {
        super(props);
    }

    state: TextAttributesState = {
        attributes: this.getAttributesState(),
    }

    /**Get all text attributes of passed product and set a initial value for each text attribute. */
    getAttributesState() {

        const { textAttributes, getProductTextAttributes } = this.props;

        const textAttributesData = textAttributes.map<TextAttributesType>( 
            attribute => ({
                name: attribute.name,
                items: attribute.items.map( 
                    item => ({ 
                        name: item.value,
                        value: ( item === attribute.items[0] ? true : false )
                    }))
            }))

        getProductTextAttributes(textAttributesData);
        
        return textAttributesData;
    }

    getOptionButtonActiveVar( attributeName: string ,item: AttributeType) {
        const { attributes } = this.state;
        
        const attributeTarget = attributes.find( attribute => attribute.name === attributeName );
        
        let itemActiveValue = attributeTarget?.items.find( target => target.name === item.id );

        return itemActiveValue?.value;

    }

    handleOnClickOptionButton( attributeName: string ,itemName: string) {

        this.setState((state) => ({
            attributes: state.attributes.map( attribute => {

                if ( attribute.name === attributeName ) {
                    return {
                        name: attribute.name,
                        items: attribute.items.map<ItemsType>( 
                            item => ({
                                name: item.name,
                                value: ( item.name === itemName ? true : false )
                            })
                        )
                    }
                } 
                
                return attribute 

            })
        }));

        /**attributes state dont change yet, so i need to create the textAttributesData
         * to get the attributes changes on real time.
         */
        const { attributes } = this.state;
        const textAttributesData = attributes.map( attribute => {

            if ( attribute.name === attributeName ) {
                return {
                    name: attribute.name,
                    items: attribute.items.map<ItemsType>( 
                        item => ({
                            name: item.name,
                            value: ( item.name === itemName ? true : false )
                        })
                    )
                }
            } 
            
            return attribute 

        })

        console.log(textAttributesData);

        //Setting textAttributes context
        const { getProductTextAttributes } = this.props;
        getProductTextAttributes(textAttributesData);

    }

    render() {

        const { textAttributes, origin, shadow } = this.props;
        

        return(
            <div>

                { textAttributes.map( attribute => (
                    <Container 
                        className="text-attributes" 
                        key={attribute.id} 
                        style={ shadow ? {filter: 'brightness(0.78)'} : {} }
                        origin={origin}
                    >
                    
                        <span className="attribute-name">{attribute.name}:</span>

                        <div className="attributes-options">
                                { attribute.items.map( item => (
                                    <OptionButton 
                                        key={item.id}
                                        value={item.id}
                                        active={this.getOptionButtonActiveVar(attribute.name, item) || false}
                                        origin={origin}
                                        onClick={() => this.handleOnClickOptionButton( attribute.name ,item.value)}
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

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getProductTextAttributes } = TextAttributesContext.actions;

const mapState = ( state: RootState )  => ({});

const mapDispatch = {
//  TEXT ATTRIBUTES FUNCTION
    getProductTextAttributes
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TextAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //