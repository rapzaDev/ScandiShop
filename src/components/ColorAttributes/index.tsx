import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';
import ColorAttributesContext from '../../services/redux/contexts/ColorAttributes';

//GRAPHQL
import { AttributeSetType } from '../../services/graphql/types';

//STYLES
import { Container, ProductColor, ProductColorButtonWrapper } from './styles';

interface ColorAttributesProps extends PropsFromRedux {
    swatchAttibute: AttributeSetType;
    origin: 'CategoryPage' | 'ProductPage' | 'CartPage' | 'MyBag';
}

type ColorItemsType = {
    id: string;
    selected?: boolean;
}

type ColorAttributesState = {
    colorItems: ColorItemsType[];
}

class ColorAttributes extends PureComponent<ColorAttributesProps, ColorAttributesState> {

    constructor(props: ColorAttributesProps) {
        super(props);
    }

    state: ColorAttributesState = {
        colorItems: [],
    }

    componentDidMount() {
        const { swatchAttibute, COLOR_ATTRIBUTES, getProductColorAttributes } = this.props;

        const colorItemsData = swatchAttibute.items.map<ColorItemsType>( 
            color =>  ({
                id: color.id,
                selected: ( ( swatchAttibute.items[0] === color ) ? true : false )
            })
        )

        this.setState(() => ({
            colorItems: colorItemsData
        }))

        /**If COLOR_ATTRIBUTES is empty or equal to colorItemsData, it will be seted.*/
        const equalColorsState: boolean = ( 
            ( !COLOR_ATTRIBUTES.length ) || 
            ( colorItemsData[0].selected === COLOR_ATTRIBUTES[0].selected ) 
        );
        
        if (equalColorsState) getProductColorAttributes(colorItemsData);
 
    }

    /**Gets the name of the color in the parameters and sets within the color items 
     * the selected value as true and false for the rest */
    handleClickProductColor( colorName: string ) {

        this.setState(( state ) => ({
            colorItems: state.colorItems.map<ColorItemsType>( 
                color =>  ({
                    id: color.id,
                    selected: ( ( color.id === colorName ) ? true : false )
                })
            )
        }))

        const { colorItems } = this.state;
        const colorAttributesData = colorItems.map<ColorItemsType>( 
            color =>  ({
                id: color.id,
                selected: ( ( color.id === colorName ) ? true : false )
            })
        )

        console.log(colorAttributesData);

        const { getProductColorAttributes } = this.props;
        getProductColorAttributes(colorAttributesData);

    }

    /** Searches in the state of color items who has the prop selected as true and returns it */
    getColorActive( colorName: string ) {

        const { colorItems } = this.state;

        const color = colorItems.find( color => color.id === colorName );

        return color?.selected;

    }

    render() {

        const { swatchAttibute, bagVisible, origin } = this.props;

        return(

            <Container 
                id="color-attributes"
                origin={origin}
            >

                { (origin !== 'CategoryPage') && <span className="attribute-name">{swatchAttibute.name}:</span>}
                
                <div className="product-colors">
                    {
                        swatchAttibute?.items.map( item => 
                            <ProductColorButtonWrapper 
                                key={item.id}
                                active={ this.getColorActive( item.id ) || false }
                                origin={origin}
                            >
                                <ProductColor
                                    key={item.id} 
                                    className="product-color"
                                    style={{
                                        backgroundColor:`${item.value}`,
                                        border: `${item.value === '#FFFFFF' && '1px solid #A6A6A6'}`,
                                        opacity: `${bagVisible ? '0.5' : '1'}`,
                                    }}
                                    value={item.value}
                                    onClick={ () => this.handleClickProductColor( item.id ) }
                                /> 
                            </ProductColorButtonWrapper>
                        )
                    }
                </div>

            </Container>

        );

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const { getProductColorAttributes } = ColorAttributesContext.actions;

const mapState = ( state: RootState )  => ({  
//  MY BAG COMPONENT STATE
    bagVisible: state.myBag.value,
// COLOR ATTRIBUTES STATE
    COLOR_ATTRIBUTES: state.colorAttributes.colorAttributes,
})

const mapDispatch = {
//  COLOR ATTRIBUTES FUNCTION
    getProductColorAttributes,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ColorAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //
