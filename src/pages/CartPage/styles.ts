import styled from 'styled-components';

import { SizeButton } from '../../components/SizeButton';


export const CartPageContainer = styled.div`
    display: flex;
    position: relative;

    flex-direction: column;
    height: 100vh;

`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;

    position: relative;

    margin-top: 5rem;

    height: 100vh;
    width: 100%;

    padding: 5rem 15.125rem 3.375rem 6.25rem;

    h2 {
       font: var(--raleway-700-font);
       font-size: 2rem;

       color: var(--c-text);

       margin-bottom: 3.6875rem;
    }

`;

export const CartProducts = styled.div`
    max-width: 68.5625rem;
`;

export const CartProductWrapper = styled.div`
    display: flex;
    position: sticky;

    margin-bottom: 1.1875rem;

    border-top: 1px solid #E5E5E5;
    padding-top: 1.3125rem;

`;

export const CartProductContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;



`;

export const CartProductInfo = styled.div`

    display: flex;
    flex-direction: column;

    strong {
        height: 1.6875rem;

        font: var(--raleway-600-font);
        font-size: 30px;

        color: var(--c-text);

        margin-bottom: 1rem;
    }

    > span {

        color: var(--c-text);

        &:first-of-type {
            height: 1.6875rem;
            font: var(--raleway-400-font);
            font-size: 1.875rem;

            margin-bottom: 0.75rem;
        }

        & + span {
            display: flex;
            align-items: center;

            height: 2.875rem;
        
            font: var(--raleway-700-font);
            font-size: 1.5rem;

            margin-bottom: 0.75rem;
        }

    }

`;

export const CartProductSizes = styled.div`
    display: flex;
    align-items: center;
    
    #size-button {

        & + button {
            margin-left: 0.75rem;
        }

    }

`;

export const ProductSelectQuantity = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
    align-items: center;

    height: 100%;

    margin-right: 0.75rem;

    .quantity-number {
        height: 2.125rem;

        color: var(--c-text);
        font: var(--raleway-500-font);
        font-size: 1.5rem;
    }

    .option-sign {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 2.8125rem;
        height: 2.8125rem;

        border: 1px solid #000;

    }


`;


export const ProductImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0 0.5625rem;

    max-width: 8.8125rem;
    width: 100%;
    height: 11.5625rem;

    .arrow-image {
        width: 0.375rem;
        height: 0.75rem;

    }

    background-color: #A6A6A6;
`;


