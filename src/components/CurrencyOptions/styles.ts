import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
    0% {
        transform: translateY(-10rem);
        opacity: 0;
    }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 2;

  background-color: var(--c-white);

  animation: ${fadeUp} 0.3s linear 0.3s backwards;

  align-items: center;
  justify-content: center;

  right: 5%;
  top: 4.5rem;

  width: 7.1rem;
  height: fit-content;

  padding: 1.25rem 1.5rem 1.25rem 1.25rem;

  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

  button {
    display: flex;

    border: 0;
    background-color: var(--c-white);

    cursor: pointer;

    font: var(--price-regular-font);
    color: var(--c-black);

    & + button {
      margin-top: 1.3rem;
    }

    transition: 0.2s linear;

    &:hover {
      transform: scale(1.15);
      color: var(--c-primary);
    }
  }
`;
