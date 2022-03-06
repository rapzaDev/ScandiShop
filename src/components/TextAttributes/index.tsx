import React, { PureComponent } from "react";

//GRAPHQL
import { AttributeSetType, AttributeType } from '../../services/graphql/types';

//COMPONENTS
import OptionButton from "../OptionButton";

//STYLES
import { Container } from './styles';

type TextAttributesProps = {
    textAttributes: AttributeSetType[];
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
    shadow: boolean;
}

type ItemsType = {
    name: string;
    value: boolean;
}

type TextAttributesState = {
    [key:string]: Array<{ 
        name: string, 
        items: Array<ItemsType>
    }>;
    
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

        const { textAttributes } = this.props;

        return textAttributes.map( 
            attribute => ({
                name: attribute.name,
                items: attribute.items.map( 
                    item => ({ 
                        name: item.value,
                        value: ( item === attribute.items[0] ? true : false )
                    }))
            }))
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
        }))

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

export default TextAttributes;