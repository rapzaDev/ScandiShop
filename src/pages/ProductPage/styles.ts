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

    height: 100vh;
    width: fit-content;

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
    max-width: 38.125rem;
    max-height: 31.9375rem;

    margin-right: 6.25rem;

    > img {
        height: 100%;
        width: 100%;
    }

`;

export const ProductContainer = styled.div`
    display: flex;
    position: relative;
    
    width: 100%;
    height: fit-content;

    border: 1px solid #000;

`

export const ProductContent = styled.div`
    
    display: flex;
    position: relative;

    flex-direction:column;

    width: 18.25rem;
    height: fit-content;
    max-height: 32.0625rem;

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

    #option-button {

        & + button {
            margin-left: 0.75rem;
        }
    }

`

export const Size = styled(OptionButton)``;

export const ProductAttributes = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

    .attribute-name {
        font: var(--roboto-500-font);
    }

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







