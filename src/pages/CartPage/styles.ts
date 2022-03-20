import styled from 'styled-components';

export const CartPageContainer = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  /* justify-content: center; */

  height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  position: relative;

  margin-top: 5rem;

  height: auto;
  width: auto;

  padding: 5rem 15.125rem 3.375rem 6.25rem;

  h2 {
    font: var(--raleway-700-font);
    font-size: 2rem;

    color: var(--c-text);

    margin-bottom: 3.6875rem;
  }
`;
