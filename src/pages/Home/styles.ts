import styled, { keyframes } from 'styled-components';

type ShadowContainerProps = {
    active: boolean;
}

type ProductInfoProps = {
    outOfStock: boolean;
}


export const HomePage = styled.div`
    display: flex;

    flex-direction: column;
    height: 100vh;

`;

const fadeUp = keyframes`
    0% {
        transform: translateY(-10rem);
        opacity: 0;
    }
`

export const ShadowContainer = styled.div<ShadowContainerProps>`
    position: relative;
    z-index: 1;

    margin-top: 5rem; ///// PARA O HEADER FIXED

    width: 100%;
    height: 89.6875rem;

    transition: background-color 0.3s linear;

    background-color: ${ ({active}) => active ? 'rgba(57, 55, 72, 0.22)' : 'unset'};

    .my-bag {
        position: fixed;
        z-index: 1;

        right: 5%;
        top: 5rem;

        animation:${fadeUp} .3s linear .3s backwards ;   
    }


`;

export const Main = styled.main`
    display: flex;
    position: relative;

    height: 100%;

    padding: 5rem 6.25rem 11.9375rem;

    .category-container {

        width: 100%;

        display: flex;
        flex-direction: column;

        h2 {
            font-family: 'Raleway', sans-serif;
            font-weight: 400;
            font-size: 2.625rem;

            margin-bottom: 6.4375rem;
        } 

        .category-content {
            display: grid;
            grid-template-columns: repeat(3, auto);
            justify-content: space-between;
            row-gap: 6.4375rem;

        }

    }


`;

export const ProductInfo = styled.div<ProductInfoProps>`

    display: flex;
    position: relative;
    flex-direction: column;

    padding: 1rem;

    width: 23.125rem;
    height: 27.75rem;

    opacity: ${ ({outOfStock}) => outOfStock ? 0.5 : 'unset'};

    &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

        .product-image {
            
            .product-cart-button {
                visibility: ${ ({outOfStock}) => outOfStock ? 'hidden' : 'visible' };
            }

        }

    }

    .product-image {
        display: flex;

        align-items: center;
        justify-content: center;

        width: 100%;
        height: 20.625rem;

        margin-bottom: 1.5rem;

        background-color: var(--opacity-size-color);

        span {
            font: 400 1.5rem 'Raleway', sans-serif;
            color: var(--c-text);
        }

        .product-cart-button {
            position: absolute;
            bottom: 16%;
            right: 9%;

            visibility: hidden;
        }


    }


    .product-title {
        width: 100%;

        font: var(--raleway-300-font);
        font-size: 1.125rem;

        margin-bottom: 0.4rem;
    }

    .product-price {
        font: var(--price-regular-font);
    }


`;

export const ProductInfoCartButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 3.5rem;
    height: 3.5rem;

    cursor: pointer;

    border: none;
    border-radius: 50%;

    background-color: var(--c-primary);

    transition: filter 0.2s linear;

    &:hover {
        filter: brightness(0.9);
    }


`;



