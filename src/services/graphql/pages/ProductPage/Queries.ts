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
 * @param productID  Name of the current product on PDP.
 * @returns The product data that matches with the product url id.
 */
async function getProduct(productID: string) {
  const GET_PRODUCT = await client.query({
    query: gql`
      query {
        product(id:"${productID}") {
          name
          id
          brand
          inStock
          gallery
          description
          attributes {
              id
              name
              type
              items {
                id
                value
              }
          }
          prices {
            currency {
                symbol
                label
            }
            amount
          }
        }
      }
    `,
  });

  const { data } = GET_PRODUCT;

  const [parsedData] = Object.entries<ProductDataType>(data).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([key, productData]) => productData
  );

  const product = {} as ProductDataType;
  Object.assign<ProductDataType, ProductDataType>(product, {
    id: parsedData.id,
    name: parsedData.name,
    brand: parsedData.brand,
    inStock: parsedData.inStock,
    gallery: parsedData.gallery,
    description: parsedData.description,
    prices: parsedData.prices.map<PriceType>((price) => ({
      amount: price.amount,
      currency: {
        symbol: price.currency.symbol,
        label: price.currency.label,
      },
    })),
    attributes: parsedData.attributes.map<AttributeSetType>((attribute) => ({
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
  });

  return product;
}

export { getProduct };
