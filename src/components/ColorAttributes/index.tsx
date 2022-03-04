import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

//REDUX
import { RootState } from '../../services/redux/store';

//GRAPHQL
import { AttributeSetType } from '../../services/graphql/types';

//STYLES
import { Container } from './styles';

interface ColorAttributesProps extends PropsFromRedux {
    swatchAttibute: AttributeSetType;
    origin: 'CategoryPage' | 'ProductPage' | 'CartPage' | 'MyBag';
}

class ColorAttributes extends PureComponent<ColorAttributesProps> {

    constructor(props: ColorAttributesProps) {
        super(props);
    }

    render() {

        const { swatchAttibute, bagVisible, origin } = this.props;

        return(

            <Container 
                id="color-attributes"
                origin={origin}
            >

                <span className="attribute-name">{swatchAttibute.name}:</span>
                
                <div className="product-colors">
                    {
                        swatchAttibute?.items.map( item => 
                            <div
                                key={item.id} 
                                className="product-color"
                                style={{
                                    backgroundColor:`${item.value}`,
                                    border: `${item.value === '#FFFFFF' && '1px solid #A6A6A6'}`,
                                    opacity: `${bagVisible ? '0.5' : '1'}`,
                                }}
                            /> 
                        )
                    }
                </div>

            </Container>

        );

    }

};

// -------------------------------- REDUX CONFIG -------------------------------- //

const mapState = ( state: RootState )  => ({  
//  MY BAG COMPONENT STATE
    bagVisible: state.myBag.value,
})

const mapDispatch = {}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ColorAttributes);

// -------------------------------- REDUX CONFIG -------------------------------- //
