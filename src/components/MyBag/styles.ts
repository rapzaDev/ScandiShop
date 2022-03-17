import styled, { keyframes } from 'styled-components';

import { MyBagProps } from '.';

// KEYFRAMES

const fadeUp = keyframes`
    0% {
        transform: translateY(-10rem);
        opacity: 0;
    }
`;

// STYLED COMPONENTS

export const MyBagContainer = styled.div<MyBagProps>`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 2;

  right: 5%;
  top: 5rem;

  background: var(--c-white);

  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};

  animation: ${fadeUp} 0.3s linear 0.3s backwards;

  width: 20rem;
  height: 33.75rem;

  padding: 0.5rem 1rem 1.25rem 0.5rem;

  .bag-description {
    position: relative;

    font: var(--price-regular-font);
    font-size: 1rem;

    margin-bottom: 1.43rem;
  }

  .total-price {
    display: flex;
    justify-content: space-between;

    margin-bottom: 2.18rem;

    span {
      color: var(--c-black);

      & + span {
        font: var(--raleway-700-font);
      }
    }

    > span {
      font: var(--roboto-500-font);
    }
  }

  .bag-buttons {
    display: flex;
    align-items: center;

    button {
      & + button {
        margin-left: 0.75rem;
      }
    }
  }
`;
