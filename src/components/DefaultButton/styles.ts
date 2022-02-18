import styled, { css } from 'styled-components';

import { DefaultButtonProps } from './';

export const Button = styled.button<DefaultButtonProps>`

    width: 8.75rem;
    height: 2.7rem;

    cursor: pointer;

    ${ ({ color }) => color === 'default' 
        ?   css`
                background-color: var(--c-white);
                
                border: 1px solid var(--c-black);

                font: var(--button-600-font);
                font-size: 0.875rem;

            `
        :   css`
                background-color: var(--c-primary);
                color: var(--c-white);
                
                border: 0;

                font: var(--button-600-font);
                font-size: 0.875rem;
            `
    }

`;