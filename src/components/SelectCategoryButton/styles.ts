import styled, { css, keyframes } from 'styled-components';

import { ISelectCategoryButtonProps } from '.';

const fadeLeft = keyframes`
    0% {
        transform: translateX(-1rem);
        opacity: 0;
    }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: fit-content;
  width: fit-content;
`;

export const Button = styled.button<ISelectCategoryButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 1.25rem;
  width: fit-content;

  background: var(--c-white);

  border: none;

  cursor: pointer;

  text-transform: uppercase;

  ${({ isSelected }) =>
    isSelected
      ? css`
          font: var(--button-600-font);
          color: var(--c-primary);
        `
      : css`
          font: var(--button-400-font);
          color: var(--c-text);
        `};
`;

export const Underline = styled.div<ISelectCategoryButtonProps>`
  position: relative;
  height: 2px;
  width: 100%;

  top: 1.8rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: var(--c-primary);

          animation: ${fadeLeft} 0.2s linear 0.2s backwards;

          &::before {
            content: '';
            position: absolute;
            right: -1rem;
            flex: 1;

            height: 2px;
            width: 1rem;

            background-color: var(--c-primary);

            animation: ${fadeLeft} 0.1s linear 0.1s backwards;
          }

          &::after {
            content: '';
            position: absolute;
            left: -1rem;
            flex: 1;

            height: 2px;
            width: 1rem;

            background-color: var(--c-primary);

            animation: ${fadeLeft} 0.1s linear 0.1s backwards;
          }
        `
      : css`
          &::before {
            visibility: hidden;
          }

          &::after {
            visibility: hidden;
          }
        `};
`;
