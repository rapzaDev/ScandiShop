import { gql } from '@apollo/client';
import { client } from '../../../apollo/client';


type ParsedDataType = {
    [key:string]: Array<any>;
}

type PriceType = {
    amount: number;
    currency: {
        symbol: string;
        label: string;
    }
}

export type ProductsDataType = {
    id: string;
    name: string;
    brand: string;
    inStock: boolean;
    gallery: Array<string>;
    prices: PriceType[];
}

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
                        prices {
                            amount
                            currency {
                                symbol
                                label
                            }
                        }
                        gallery
                    }
                }
            } 
        `
    });

    const { data } = GET_ALL_PRODUCTS;

    const parsedData =  Object.entries<ParsedDataType[]>(data)[0][1]
        .map( ( target => Object.entries(target)[1][1] ) );

    let productsData = parsedData as ProductsDataType[][];

    productsData = productsData.map<ProductsDataType[]>(
        target => target.map<ProductsDataType>(
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
                        }))
            })
        )
    )


    return productsData;

};


export { getAllProducts };