import { gql } from '@apollo/client';
import { client } from '../../../apollo/client';

type GetCategoryNamesType = {
    name: string;
}

/**@description Get the names of all categories from GRAPHQL server.*/
async function getCategoryNames() {
    const GET_CATEGORY_NAMES = await client.query({
        query: gql`
            query {
                categories{
                    name
                }
            } 
        `
    });

    const { data } = GET_CATEGORY_NAMES;

    const parsedData = ( Object.entries<GetCategoryNamesType[]>(data)[0][1] )
        .map(object => object.name);

    return parsedData;

};


export { getCategoryNames };
