import styled, { css } from 'styled-components';

type ProductInfoProps = {
    outOfStock: boolean;
}

type ProductInfoCartButtonProps = {
    Opaque: boolean;
}


export const CategoryPageContainer = styled.div`
    display: flex;

    flex-direction: column;
    height: 100vh;

`;

export const Main = styled.main`
    display: flex;
    position: relative;

    margin-top: 5rem;

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
    height: fit-content;

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
        position: relative;

        align-items: center;
        justify-content: center;

        width: 100%;
        height: 20.625rem;

        margin-bottom: 1.5rem;

        .image {
            z-index: -1;

            height: fit-content;
            width: fit-content;
            
            height: 20.625rem;
            max-width: 22.25rem;
        }

        .outOfStock {
            font: 400 1.5rem 'Raleway', sans-serif;
            color: var(--c-text);

            position: absolute;

        }

        .product-cart-button {
            position: absolute;

            bottom: -1.625rem;
            right: 0.9375rem;

            visibility: hidden;
        }


    }

    .product-names {
        display: flex;
        align-items: center;

        width: 100%;

        margin-bottom: 0.5rem;
    }

    .product-title {
        width: fit-content;

        font: var(--raleway-300-font);
        font-size: 1.125rem;
    }

    .product-brand {
        width: fit-content;
        height: fit-content;

        margin-left: 0.2rem;

        font: var(--raleway-300-font);
        font-size: 1.125rem;
    }


    .product-colors {
        display: flex;
        justify-content: center;
        
        height: 1.2rem;
        width: 100%;

        margin-bottom: 0.5rem;

        .product-color {
            cursor: pointer;

            width: 1.2rem;
            height: 100%;

            &:hover {
                transform: scale(1.2);
            }

            & + div {
                margin-left: 0.7rem;
            }

        }

    }


    .product-price {
        font: var(--price-regular-font);
    }


`;

export const ProductInfoCartButton = styled.button<ProductInfoCartButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 3.5rem;
    height: 3.5rem;

    cursor: pointer;

    border: none;
    border-radius: 50%;

    background-color: var(--c-primary);

    transition: transform 0.1s linear;

    &:hover {
        transform: scale(1.1);
    }

    ${ ({ Opaque }) => Opaque && css`filter: brightness(0.9)` };

`;



