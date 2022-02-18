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
    justify-content: space-between;

    width: 18.31rem;
    height: 8.6rem;

    margin-bottom: 2.56rem;

    .product-container {
        display: flex;
        flex: 2;
    }

    aside {
        display: flex;
        flex: 1;

        background-color: #A6A6A6;

        width: 6.56rem;
        height: 8.56rem;

    }

`;

export const ProductContainer = styled.div`

    display: flex;

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

`;

export const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;

    height: 8.6rem;

    p {
        
        width: 8.5rem;
        height: 3.25rem;

        font: var(--raleway-300-font);
    }

    > span {
        display: flex;
        align-items: center;

        margin-top: 0.31rem;
        margin-bottom: 1.68rem;

        font: var(--price-regular-font);
        font-size: 1rem;
    }

    .product-size {
        display: flex;

        align-items: center;

        .size {
            display: flex;

            align-items: center;
            justify-content: center;

            width: 1.5rem;
            height: 1.5rem;

            border: 1px solid var(--c-black);

            font: var(--product-size-font);

            & + div {
                margin-left: 0.5rem;
            }

        }

    }

`;