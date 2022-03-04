import styled from 'styled-components';

type ContainerProps = {
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
        
        height: 100%;
        width: 100%;

        margin-bottom: 0.5rem;

        .product-color {
            cursor: pointer;

            width: ${ ({origin}) => ( origin === 'ProductPage' ) ? '3.9375rem' : '1.2rem' };
            height: ${ ({origin}) => ( origin === 'ProductPage' ) ? '2.8125rem' : '1.2rem' };

            &:hover {
                transform: scale(1.1);
            }

            & + div {
                margin-left: 0.4rem;
            }

        }

    }

`;