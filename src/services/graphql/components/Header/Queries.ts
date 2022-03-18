import { gql } from '@apollo/client';

import { client } from '../../../apollo/client';

type GetCategoryNamesType = {
  name: string;
};

type GetCurrenciesSymbolsType = {
  symbol: string;
};

/** @description Get the names of all categories from GRAPHQL server. */
async function getCategoryNames() {
  const GET_CATEGORY_NAMES = await client.query({
    query: gql`
      query {
        categories {
          name
        }
      }
    `,
  });

  const { data } = GET_CATEGORY_NAMES;

  const parsedData = Object.entries<GetCategoryNamesType[]>(data)[0][1].map(
    (object) => object.name
  );

  return parsedData;
}

/**
 * @description Gets all currency symbols from GRAPHQL server.
 * @returns Currency symbols
 */
async function getCurrenciesSymbols() {
  const GET_CURRENCIES = await client.query({
    query: gql`
      query {
        currencies {
          symbol
        }
      }
    `,
  });

  const { data } = GET_CURRENCIES;

  const parsedData = Object.entries<GetCurrenciesSymbolsType[]>(data)[0][1].map(
    (currency) => ({
      symbol: currency.symbol,
    })
  );

  return parsedData;
}

export { getCategoryNames, getCurrenciesSymbols };
