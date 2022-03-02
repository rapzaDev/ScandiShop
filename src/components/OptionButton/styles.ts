import styled, { css } from 'styled-components';

import { OptionButtonState } from './';

export const Button = styled.button<OptionButtonState>`
    display: flex;
    position: relative;

    align-items: center;
    justify-content: center;

    border: 1px solid #000;

    background-color: transparent;

    cursor: pointer;

    // ----------- SIZE BUTTON ON PRODUCT PAGE OR CART PAGE -----------
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

    // ----------- SIZE BUTTON ON MY BAG COMPONENT -----------

        ${ ({ origin }) => 
            ( (origin === 'MyBag') ) && css`
                width: 1.5rem;
                height: 1.5rem;

                border-color: var(--opacity-size-color);
                background-color: rgba(166, 166, 166, 0.2);

                span {
                    font: var(--product-size-font);
                    font-size: 0.875rem;

                    color: var(--opacity-size-color);
                }

            `
        }

        ${ ({active, origin}) => 
            ( (active && origin === 'MyBag')) && css`

                border-color: var(--c-black);
                background-color: var(--c-white);
                
                span {
                    color: var(--c-black);
                }

        `}


`;
