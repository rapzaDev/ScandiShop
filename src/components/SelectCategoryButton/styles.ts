import styled, { css, keyframes } from 'styled-components';

import { SelectCategoryButtonProps } from './';

const fadeLeft = keyframes`
    0% {
        transform: translateX(-1rem);
        opacity: 0;
    }
`

export const Button = styled.button<SelectCategoryButtonProps>`
    display: flex;
    flex-direction: column;
    
    height: 1.25rem;
    
    background: var(--c-white);
    
    cursor: pointer;
    border: 0;

    text-transform: uppercase;


    ${ ({ isSelected }) => isSelected 
        ? css`
            font: var(--button-600-font);
            color: var(--c-primary);

            &::after {
                content: '';
                position: relative;
                flex: 1;
                top: 1.87rem;
                
                height: 2px;
                padding-top: 3px;
                width: 6rem;

                background-color: var(--c-primary);

                animation:${fadeLeft} .2s linear .2s backwards ;

            }
        ` 
        : css`
            font: var(--button-400-font);
            color: var(--c-text);

            &::after {
                content: '';
                position: relative;
                flex: 1;
                top: 1.87rem;

                height: 2px;
                padding-top: 3px;
                width: 6rem;

                background-color: var(--c-primary);

                visibility: hidden;
            }
        ` 
    };
    
`;
