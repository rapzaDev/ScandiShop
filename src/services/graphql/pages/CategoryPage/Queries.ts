import { gql } from '@apollo/client';

import { client } from '../../../apollo/client';
import {
  ParsedDataType,
  PriceType,
  AttributeType,
  AttributeSetType,
  ProductDataType,
} from '../../types';

/** @description Get the entire data of all products from GRAPHQL server. */
async function getAllProducts() {
  const GET_ALL_PRODUCTS = await client.query({
    query: gql`
      query {
        categories {
          products {
            id
            name
            inStock
            brand
            description
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
    `,
  });

  const { data } = GET_ALL_PRODUCTS;

  const parsedData = Object.entries<ParsedDataType[]>(data)[0][1].map(
    (target) => Object.entries(target)[1][1]
  );

  let productsData = parsedData as ProductDataType[][];

  productsData = productsData.map<ProductDataType[]>((target) =>
    target.map<ProductDataType>((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      inStock: product.inStock,
      gallery: product.gallery,
      description: product.description,
      prices: product.prices.map<PriceType>((price) => ({
        amount: price.amount,
        currency: {
          symbol: price.currency.symbol,
          label: price.currency.label,
        },
      })),
      attributes: product.attributes.map<AttributeSetType>((attributeSet) => ({
        id: attributeSet.id,
        name: attributeSet.name,
        type: attributeSet.type,
        items: attributeSet.items.map<AttributeType>((item) => ({
          id: item.id,
          value: item.value,
          selected: false,
        })),
      })),
      quantity: 0,
      KEY_ID: '',
    }))
  );

  return productsData;
}

export { getAllProducts };
