import styled, { keyframes } from 'styled-components';

const fade = keyframes`
    0% {
        transform: translateZ(100%);
        opacity: 0;
    }
`

export const ProductPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    height: 100vh;

    animation: ${fade} .7s linear;
`;

export const Main = styled.main`
    display: flex;
    position: relative;

    margin-top: 5rem;
 
    min-height: 41.5625rem;
    max-height: 41.5625rem;
    height: 100%;
    width: 100%;

    padding: 5rem 13.6875rem 4.5rem 6.25rem;

`;

export const ProductContainer = styled.div`
    display: flex;
    position: relative;
    
    min-width: 70.0625rem;
    max-width: 70.0625rem;
    width: 100%;
    height: 100%;

`

export const ProductContent = styled.div`

    display: flex;
    flex-direction:column;
    position: relative;
    
    min-width: 18.25rem;
    max-width: 18.25rem;
    width: 100%;
    max-height: 32.0625rem;
    height: fit-content;
    
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    
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


    #color-attributes {
        padding-right: 0.2rem;
    }


    .product-price {

        display: flex;
        flex-direction: column;

        margin-top: 2.5rem;
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
        display: flex;

        justify-content: center;
        align-items: center;

        height: fit-content;
        width: fit-content;

        font: var(--pdp-text-content-font);

        p {
            line-height: 1.599375rem;

            & + h3 {
                margin-top: 0.4rem;
            }

        }

        h1 {
            margin-bottom: 0.2rem;
        }

        ul {
            padding-left: 1rem;
        }

    }

`








