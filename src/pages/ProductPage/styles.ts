import styled from 'styled-components';

import downArrow from '../../assets/images/down-arrow-icon.svg';

import OptionButton from '../../components/OptionButton';


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

    height: max-content;
    width: 100%;

    padding: 5rem 13.6875rem 4.5rem 6.25rem;

`;

export const ProductContainer = styled.div`
    display: flex;
    position: relative;
    
    width: 100%;
    height: 100%;
`

export const ProductContent = styled.div`

    display: flex;
    position: relative;

    flex-direction:column;

    width: 100%;
    height: fit-content;

    .product-title {
        display: flex;
        flex-direction: column;

        margin-bottom: 2.6875rem;
        
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
            color: var(--c-text);
            
            margin-bottom: 0.625rem;

            height: fit-content;
        }

        span {
            display: flex;
            align-items: center;

            font: var(--raleway-700-font);
            font-size: 1.5rem;
            color: var(--c-text);
            
            height: 2.875rem;
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
        height: fit-content;

        font: var(--pdp-text-content-font);

        p {
            line-height: 1.599375rem;
        }

        h1 {
            margin-bottom: 0.2rem;
        }

    }

`

export const ProductAttributes = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
`;

export const TextAttributes = styled.div`
        display: flex;
        width: 100%;
        position: relative;

        align-items: center;
        justify-content: space-between;

        padding-left: .3rem;

        border: 1px solid #A6A6A6;

        & + .text-attributes {
            margin-top: 1.3rem;
        }

        &:first-child {
            margin-top: 1.5rem;
        }

        &:last-child {
            margin-bottom: 2.5rem;
        }


        .attributes-options {
            display: flex;

            height: fit-content;

            button:first-child {
                border-left: 2px solid;
            }

            button {
                border-top: none;
                border-bottom: none;
                border-right: none;
            }

        }

        
        
`;







