import styled, { css } from 'styled-components';

import { SizeButtonState } from './';

export const Button = styled.button<SizeButtonState>`
    display: flex;
    position: relative;

    align-items: center;
    justify-content: center;

    border: 1px solid #000;

    background-color: var(--c-white);

    cursor: pointer;

    ${ ({ origin }) => 
        ( (origin === 'ProductPage') || (origin === 'CartPage') ) && css`
            width: 3.9375rem;
            height: 2.8125rem;

            span {
                font: var(--product-size-font);
            }

        `
    }

    ${ ({active, origin}) => 
        ( (active && origin === 'ProductPage') || (active && origin === 'CartPage') ) && css`

            background-color: var(--c-black);
            color: var(--c-white);

    `}

`;
