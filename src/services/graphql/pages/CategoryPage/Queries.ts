import { gql } from '@apollo/client';
import { client } from '../../../apollo/client';

import {
    ParsedDataType,
    PriceType,
    AttributeSetType,
    ProductDataType
} from '../../types';

async function getAllProducts() {
    const GET_ALL_PRODUCTS = await client.query({
        query: gql`
            query {
                categories{
                    products {
                        id
                        name
                        inStock
                        brand
                        gallery
                        prices {
                            amount
                            currency {
                                symbol
                                label
                            }
                        }
                        attributes {
                            id
                            name
                            type
                            items {
                                id 
                                value
                            }
                        }
                    }
                }
            } 
        `
    });

    const { data } = GET_ALL_PRODUCTS;

    const parsedData =  Object.entries<ParsedDataType[]>(data)[0][1]
        .map( ( target => Object.entries(target)[1][1] ) );

    let productsData = parsedData as ProductDataType[][];

    productsData = productsData.map<ProductDataType[]>(
        target => target.map<ProductDataType>(
            product => ({
                id: product.id,
                name: product.name,
                brand: product.brand,
                inStock: product.inStock,
                gallery: product.gallery,
                prices: product.prices.map<PriceType>( price => ({ 
                            amount: price.amount,
                            currency: {
                                symbol: price.currency.symbol,
                                label: price.currency.label,
                            }
                        })),
                attributes: product.attributes.map<AttributeSetType>(
                    attributeSet => 
                        ({
                            id: attributeSet.id,
                            name: attributeSet.name,
                            type: attributeSet.type,
                            items: attributeSet.items
                        })  
                    )
            })
        )
    );


    return productsData;

};


export { getAllProducts };
