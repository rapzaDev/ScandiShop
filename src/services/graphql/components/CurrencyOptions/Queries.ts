import { gql } from '@apollo/client';

import { client } from '../../../apollo/client';

type GetCurrenciesType = {
  label: string;
  symbol: string;
};

/** @description Get all currencies data from GRAPHQL server. */
async function getCurrencies() {
  const GET_CURRENCIES = await client.query({
    query: gql`
      query {
        currencies {
          label
          symbol
        }
      }
    `,
  });

  const { data } = GET_CURRENCIES;

  const parsedData = Object.entries<GetCurrenciesType[]>(data)[0][1].map(
    (currency) => ({
      symbol: currency.symbol,
      label: currency.label,
    })
  );

  return parsedData;
}

export { getCurrencies };
