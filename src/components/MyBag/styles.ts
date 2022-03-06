import styled, { keyframes } from 'styled-components';

import { MyBagProps } from './';

const fadeUp = keyframes`
    0% {
        transform: translateY(-10rem);
        opacity: 0;
    }
`

export const MyBagContainer = styled.div<MyBagProps>`
    display: flex;
    flex-direction: column;

    position: fixed;
    z-index: 2;

    right: 5%;
    top: 5rem;

    background: var(--c-white);

    visibility: ${ ({isVisible}) => isVisible ? 'visible' : 'hidden' };

    animation:${fadeUp} .3s linear .3s backwards ;   

    width: 20rem;
    height: 33.75rem;

    padding: 0.5rem 1rem 1.25rem 0.5rem;

    .bag-description {

        position: relative;

        font: var(--price-regular-font);
        font-size: 1rem;

        margin-bottom: 1.43rem;
    }
    
    .total-price {
        display: flex;
        justify-content: space-between;

        margin-bottom: 2.18rem;

        span {
            color: var(--c-black);

            & + span {
                font: var(--raleway-700-font);
            }

        }

        > span { 
            font: var(--roboto-500-font);
        }

    }

    .bag-buttons {
        display: flex;
        align-items: center;

        button {

            & + button {
                margin-left: 0.75rem;
            }

        }

    }


`;

export const ProductWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;

    max-height: 19.6875rem;
    min-height: 19.6875rem;
    max-width: 18.3125rem;
    min-width: 18.3125rem;

    margin-bottom: 2.56rem;

    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
`;

export const ProductContainer = styled.div`

    display: flex;
    position: relative;

    height: fit-content;
    width: 100%;

    margin-bottom: 2.56rem;


    .select-quantity {
        display: flex;
        flex-direction: column;

        justify-content: space-between;
        align-items: center;

        margin-left: 2.125rem;
        margin-right: 0.625rem;

        .option-sign {
            display: flex;

            justify-content: center;
            align-items: center;

            width: 1.5rem;
            height: 1.5rem;

            border: 1px solid var(--c-black);
            color: var(--c-black);
        }

        span {
            font: var(--price-regular-font);
            font-size: 1rem;
        }

    }

    .product-image {
        display: flex;

        img {
            width: 100%;
            height: 100%;
        }

    }

`;

export const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    height: 100%;
    width: fit-content;

    .product-title {
        /* min-width: 8.5rem;
        min-height: 3.25rem; */

        width: fit-content;
        height: fit-content;

        font: var(--raleway-300-font);
    }

    .product-price {
        display: flex;
        align-items: center;

        margin-top: 0.31rem;
        margin-bottom: 1.68rem;

        min-width: 3.25rem;
        min-height: 1.625rem;

        span {
            font: var(--price-regular-font);
            font-size: 1rem;
        }

    }

    #attributes {
        height: 5rem;
        padding-right: 0.2rem;
        
        border: 1px solid #A6A6A6;
        border-left: none;
        border-right: none;

        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;
        scrollbar-color: #393748 transparent;
    }

`;