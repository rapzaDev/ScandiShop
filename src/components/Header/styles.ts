import styled from 'styled-components';

export const HeaderComponent = styled.header`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;

  position: fixed;
  z-index: 1;

  background-color: var(--c-white);

  width: 100%;
  height: 5rem;

  padding: 2rem 6.3rem;

  .category-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-div {
    position: absolute;
    left: 50%;
    right: 50%;
  }
`;

export const CurrencyAndCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 2.5rem;
  width: 12.75rem;

  gap: 1.375rem;

  .currency {
    display: flex;

    width: 2.375rem;
    height: fit-content;

    img {
      margin-top: 0.95rem;

      width: fit-content;
      height: fit-content;
    }
  }
`;

export const CurrencyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 1.8125rem;

  background: var(--c-white);

  border: none;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    font: var(--price-regular-font);

    width: 0.75rem;
    height: 1.8125rem;
  }

  cursor: pointer;
`;

export const CartContainer = styled.div`
  position: relative;

  button {
    display: flex;

    background-color: var(--c-white);

    border: 0;

    cursor: pointer;
  }

  img {
    transition: transform 0.2s linear;

    &:hover {
      transform: scale(1.2);
    }
  }

  #bag-amount {
    position: absolute;
    top: 0;

    margin-top: -0.5rem;
    margin-left: 0.83rem;
  }
`;
