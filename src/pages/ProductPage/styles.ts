import styled from 'styled-components';

import { SizeButton } from '../../components/SizeButton';


export const ProductPageContainer = styled.div`
    display: flex;
    position: relative;

    flex-direction: column;
    height: 100vh;

`;

export const Main = styled.main`
    display: flex;
    position: relative;

    margin-top: 5rem;

    height: 100vh;
    width: 100%;

    padding: 5rem 13.6875rem 4.5rem 6.25rem;


    aside {
        margin-right: 2.5rem;
    }


`;

export const SmallImage = styled.div`
    width: 4.9375rem;
    height: 5rem;

    background-color: #A6A6A6;

    & + & {
        margin-top: 2.5rem;
    }

`;

export const BigImage = styled.div`
    width: 38.125rem;
    height: 100%;

    margin-right: 6.25rem;

    background-color: #A6A6A6;
`;

export const ProductContainer = styled.div`
    display: flex;
    position: relative;
    
    width: 100%;
    height: 32.0625rem;


`

export const ProductContent = styled.div`
    
    display: flex;
    position: relative;

    flex-direction:column;

    width: 18.25rem;
    height: 100%;


    .product-title {
        display: flex;
        flex-direction: column;
        
        strong {
            font: var(--raleway-600-font);
            font-size: 1.875rem;
        }

        span {
            font: var(--raleway-400-font);
            font-size: 1.875rem;
        }

    }


    .product-price {

        display: flex;
        flex-direction: column;

        margin-bottom: 1.25rem;

        span:first-child {
            font: var(--roboto-condensed-700-font);
            margin-bottom: 0.625rem;
            color: var(--c-text);
        }

        span {
            font: var(--raleway-700-font);
            font-size: 1.5rem;
            color: var(--c-text);
        }
        
    }


    .add-cart-button {
        width: 18.25rem;
        min-height: 3.25rem;

        > span {

            font: var(--raleway-600-font);
        }

        margin-bottom: 2.5rem;
    }


    .product-info {
        height: 100%;

        p {
            font: var(--pdp-text-content-font);
            line-height: 1.599375rem;
        }

    }

`

export const ProductSize = styled.div`
    display: flex;
    position: relative;

    flex-direction: column;

    margin-top: 2.6875rem;
    margin-bottom: 2.5rem;

    > span {
        font: var(--roboto-condensed-700-font);
        margin-bottom: 0.5rem;
        color: var(--c-text);
    }

    .size-options {
        display: flex;
        position: relative;
    }

    #size-button {

        & + button {
            margin-left: 0.75rem;
        }
    }

`

export const Size = styled(SizeButton)`
`;







