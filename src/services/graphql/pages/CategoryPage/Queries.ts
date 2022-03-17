import { gql } from '@apollo/client';

import { client } from '../../../apollo/client';
import {
  PriceType,
  AttributeType,
  AttributeSetType,
  ProductDataType,
} from '../../types';

/**
 *
 * @param categoryName  Name of the current category on PLP.
 * @returns An arrray with all the products of the selected category on PLP.
 */
async function getProducts(categoryName: 'all' | 'clothes' | 'tech') {
  const GET_CATEGORY_PRODUCTS = await client.query({
    query: gql`
      query {
        category(input:{title:"${categoryName}"}) {
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

  const { data } = GET_CATEGORY_PRODUCTS;

  const [parsedData] = Object.entries<[]>(data).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([key, target]) => Object.entries<ProductDataType[]>(target)[1][1]
  );

  const productsData = parsedData.map<ProductDataType>((product) => ({
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
    attributes: product.attributes.map<AttributeSetType>((attribute) => ({
      id: attribute.id,
      name: attribute.name,
      type: attribute.type,
      items: attribute.items.map<AttributeType>((item) => ({
        id: item.id,
        value: item.value,
        selected: false,
      })),
    })),
    quantity: 0,
    KEY_ID: '',
  }));

  return productsData;
}

export { getProducts };
