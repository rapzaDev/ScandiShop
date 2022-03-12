import styled, { keyframes } from 'styled-components';

//KEYFRAMES

const fadeDown = keyframes`
    0% {
        transform: translateY(10rem);
        opacity: 0;
    }
`

const fade = keyframes`
    0% {
        transform: translateZ(10%);
        opacity: 0;
    }
`



//STYLED COMPONENTS

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

    animation: ${fadeDown} .4s linear .4s backwards;
`;

/** Appears when cart products is empty. */
export const EmptyCart = styled.div`

    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-height: 19.6875rem;
    min-height: 19.6875rem;
    max-width: 18.3125rem;
    min-width: 18.3125rem;

    margin-bottom: 2.56rem;

    animation: ${fade} .3s linear .3s backwards;

    span:first-child {
        font: var(--price-regular-font);
        font-size: 1rem;
    }

    span:last-child {
        font: var(--raleway-300-font);
        font-size: .9rem;
    }

`;


export const ProductContainer = styled.div`

    display: flex;
    position: relative;

    max-height: 9.6rem;
    min-height: 9.6rem;

    max-width: 18.3125rem;
    min-width: 18.3125rem;

    margin-bottom: 2.56rem;

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

    max-height: 9.6rem;
    min-height: 9.6rem;

    max-width: 8.5rem;
    min-width: 8.5rem;

    .product-title {

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
        max-height: 5rem;
        width: 100%;

        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: none;
        
    }

`;


export const SelectQuantity = styled.div`

    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: center;

    margin-left: 1.125rem;
    margin-right: 0.625rem;

    .plus-sign {
        display: flex;
        position: relative;

        cursor: pointer;

        background-color: #fff;

        justify-content: center;
        align-items: center;

        width: 1.5rem;
        height: 1.5rem;

        border: 1px solid var(--c-black);
        color: var(--c-black);

        transition: filter .2s linear;

        &:hover {
            filter: brightness(93%);
        }

        &::after {
            content: '';
            position: relative;

            width: 0.5rem;

            border: 1px solid #1D1F22;
        }

        &::before {
            content: '';
            position: absolute;

            left: 45%;

            height: 0.5rem;

            border: 1px solid #1D1F22;
        }

    }

    .minus-sign {
        display: flex;
        position: relative;

        align-items: center;
        justify-content: center;

        cursor: pointer;

        background-color: #fff;

        width: 1.5rem;
        height: 1.5rem;

        border: 1px solid var(--c-black);
        color: var(--c-black);

        transition: filter .2s linear;

        &:hover {
            filter: brightness(93%);
        }

        &::after {
            content: '';
            position: relative;

            width: 0.5rem;

            border: 1px solid #1D1F22;
        }

    }

    span {
        font: var(--price-regular-font);
        font-size: 1rem;
    }

`;