import styled, { css } from 'styled-components';

type ContainerProps = {
    origin: 'CategoryPage' | 'ProductPage' | 'CartPage' | 'MyBag';
}

type ProductColorProp = {
    active: boolean;
    origin: 'CategoryPage' | 'ProductPage' | 'CartPage' | 'MyBag';
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;

    .attribute-name {
        margin-bottom: 0.5rem;

        font: var(--roboto-condensed-700-font);

        text-transform: uppercase;
    }
    
    .product-colors {
        display: flex;
        position: relative;
        align-items: center;
        
        height: 100%;
        max-width: 18.25rem;

        margin-bottom: 0.5rem;

        .product-color {
            position: relative;
            cursor: ${ ({ origin }) => origin === 'ProductPage' && 'pointer'};

            width: ${ ({ origin }) => ( origin === 'ProductPage' ) ? '100%' : '1.2rem' };
            height: ${ ({ origin }) => ( origin === 'ProductPage' ) ? '2.8125rem' : '1.2rem' };

            &:hover {
                ${ ({ origin }) => origin === 'ProductPage' && css`transform: scale(1.05)`};
            }

            & + button {
                margin-left: 0.4rem;
            }

        }

    }

`;

export const ProductColor = styled.button`
    border: 0;
`;

export const ProductColorButtonWrapper = styled.div<ProductColorProp>`
    
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    padding-bottom: 0.25rem;

    transition: border-bottom 0.2s linear;

    & + div {
        margin-left: 0.4rem;
    }

    ${ ({active, origin}) => active 
    ? css`
       
       ${ origin === 'ProductPage' && css`
            border-bottom: 3px solid #393748;
        `}

    `: css`
        
        ${ origin === 'ProductPage' && css`
            border-bottom: 3px solid transparent;
            opacity: 60%;
        `}

    `
    }

`;