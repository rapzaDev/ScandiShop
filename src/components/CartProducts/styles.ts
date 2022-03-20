import styled, { keyframes } from 'styled-components';

// KEYFRAMES

const fadeDown = keyframes`
    0% {
        transform: translateY(10rem);
        opacity: 0;
    }
`;

const fade = keyframes`
    0% {
        transform: translateZ(10%);
        opacity: 0;
    }
`;

// --------- STYLED COMPONENTS FOR MY BAG COMPONENT ---------

export const ProductWrapper_MYBAG = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  gap: 2.56rem;

  min-height: 19.6875rem;
  width: fit-content;

  margin-bottom: 2.56rem;

  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  animation: ${fadeDown} 0.4s linear 0.4s backwards;
`;

/** Appears when cart products is empty. */
export const EmptyCart_MYBAG = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 19.6875rem;
  min-width: 18.3125rem;

  margin-bottom: 2.56rem;

  animation: ${fade} 0.3s linear 0.3s backwards;

  span:first-child {
    font: var(--price-regular-font);
    font-size: 1rem;
  }

  span:last-child {
    font: var(--raleway-300-font);
    font-size: 0.9rem;
  }
`;

export const ProductContainer_MYBAG = styled.div`
  display: flex;
  position: relative;

  width: 100%;

  .product-image_MYBAG {
    display: flex;

    img {
      object-fit: contain;

      width: 6.5rem;
      height: auto;
    }
  }
`;

export const ProductInfo_MYBAG = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.68rem;

  height: auto;

  width: 8.5rem;

  .product-title_MYBAG {
    display: flex;
    align-items: center;

    line-height: 26px;

    max-width: 8.5rem;
    max-height: 3.25rem;

    margin-bottom: 0.3rem;

    font: var(--raleway-300-font);
  }

  .product-price_MYBAG {
    display: flex;
    align-items: center;

    min-width: 3.25rem;
    min-height: 1.625rem;

    span {
      font: var(--price-regular-font);
      font-size: 1rem;
    }
  }
`;

export const SelectQuantity_MYBAG = styled.div`
  display: flex;
  flex-direction: column;

  height: auto;

  justify-content: space-between;
  align-items: center;

  margin-left: 1.125rem;
  margin-right: 0.625rem;

  .plus-sign_MYBAG {
    display: flex;
    position: relative;

    cursor: pointer;

    background-color: #fff;

    justify-content: center;
    align-items: center;

    width: 1.5rem;
    height: 1.5rem;

    border: 1px solid var(--c-black);
    color: var(--c-black);

    transition: filter 0.2s linear;

    &:hover {
      filter: brightness(93%);
    }

    &::after {
      content: '';
      position: relative;

      width: 0.5rem;

      border: 1px solid #1d1f22;
    }

    &::before {
      content: '';
      position: absolute;

      left: 45%;

      height: 0.5rem;

      border: 1px solid #1d1f22;
    }
  }

  .minus-sign_MYBAG {
    display: flex;
    position: relative;

    align-items: center;
    justify-content: center;

    cursor: pointer;

    background-color: #fff;

    width: 1.5rem;
    height: 1.5rem;

    border: 1px solid var(--c-black);
    color: var(--c-black);

    transition: filter 0.2s linear;

    &:hover {
      filter: brightness(93%);
    }

    &::after {
      content: '';
      position: relative;

      width: 0.5rem;

      border: 1px solid #1d1f22;
    }
  }

  span {
    font: var(--price-regular-font);
    font-size: 1rem;
  }
`;

// --------- STYLED COMPONENTS FOR PRODUCT PAGE ---------

export const ProductWrapper_PDP = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  gap: 1.1875rem;

  height: fit-content;
  width: fit-content;

  animation: ${fadeDown} 0.4s linear 0.4s backwards;
`;

/** Appears when cart products is empty. */
export const EmptyCart_PDP = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  bottom: 18%;

  min-height: 27rem;
  height: 100%;

  min-width: 68.5625rem;

  animation: ${fade} 0.3s linear 0.3s backwards;

  span:first-child {
    font: var(--price-regular-font);
    font-size: 1.5rem;
  }

  span:last-child {
    font: var(--raleway-300-font);
    font-size: 1.3rem;
  }
`;

export const ProductContainer_PDP = styled.div`
  display: flex;
  position: relative;

  align-items: center;
  justify-content: space-between;

  min-width: 68.5625rem;
  width: auto;
  height: auto;

  border-top: 1px solid #e5e5e5;
  padding-top: 1.3125rem;

  .product-image_PDP {
    display: flex;
    position: relative;

    img {
      object-fit: contain;

      width: 8.8125rem;
      height: auto;
    }

    .left-arrow {
      display: flex;
      position: absolute;
      align-items: center;

      border: 0;
      border-radius: 100%;

      background-color: transparent;

      left: 6%;
      bottom: 45%;

      width: 1.1rem;
      height: 1.1rem;

      cursor: pointer;

      img {
        position: absolute;
        left: 7%;
        width: 0.75rem;
        height: 0.75rem;
      }

      transition: all 0.3s linear;

      &:hover {
        background-color: #a6a6a6;
      }
    }

    .right-arrow {
      display: flex;
      position: absolute;
      align-items: center;

      border: 0;
      border-radius: 100%;

      background-color: transparent;

      right: 6%;
      bottom: 45%;

      width: 1.1rem;
      height: 1.1rem;

      cursor: pointer;

      img {
        position: absolute;
        right: 7%;
        width: 0.75rem;
        height: 0.75rem;
      }

      transition: all 0.3s linear;

      &:hover {
        background-color: #a6a6a6;
      }
    }
  }

  .quantity-and-image {
    display: flex;
    gap: 0.75rem;

    height: 100%;
  }
`;

export const ProductInfo_PDP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  gap: 0.75rem;

  height: 100%;

  max-width: 18.25rem;

  .product-title_PDP {
    display: flex;
    flex-direction: column;

    strong {
      display: flex;
      height: 1.6875rem;
      align-items: center;

      font: var(--raleway-600-font);
      font-size: 1.875rem;

      color: var(--c-text);
    }

    span {
      font: var(--raleway-400-font);
      font-size: 1.875rem;

      color: var(--c-text);
    }
  }

  .product-price_PDP {
    display: flex;
    align-items: center;

    height: 2.875rem;

    span {
      font: var(--raleway-700-font);
      font-size: 1.5rem;

      color: var(--c-text);
    }
  }
`;

export const SelectQuantity_PDP = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  height: 100%;

  .plus-sign_PDP {
    display: flex;
    position: relative;

    cursor: pointer;

    background-color: #fff;

    justify-content: center;
    align-items: center;

    width: 2.8125rem;
    height: 2.8125rem;

    border: 1px solid var(--c-black);
    color: var(--c-black);

    transition: filter 0.2s linear;

    &:hover {
      filter: brightness(93%);
    }

    .plus {
      display: flex;
      position: relative;

      align-items: center;
      justify-content: center;

      width: 0.9rem;
      height: 0.9rem;

      &::after {
        content: '';
        position: absolute;

        width: 100%;
        height: 1px;

        background-color: #1d1f22;
      }

      &::before {
        content: '';
        position: absolute;

        height: 100%;
        width: 1px;

        background-color: #1d1f22;
      }
    }
  }

  .minus-sign_PDP {
    display: flex;
    position: relative;

    align-items: center;
    justify-content: center;

    cursor: pointer;

    background-color: #fff;

    width: 2.8125rem;
    height: 2.8125rem;

    border: 1px solid var(--c-black);
    color: var(--c-black);

    transition: filter 0.2s linear;

    &:hover {
      filter: brightness(93%);
    }

    .minus {
      display: flex;
      position: relative;

      align-items: center;
      justify-content: center;

      width: 0.9rem;
      height: 0.9rem;

      &::after {
        content: '';
        position: absolute;

        width: 100%;
        height: 1px;

        background-color: #1d1f22;
      }
    }
  }

  span {
    height: 2.125rem;

    color: var(--c-text);
    font: var(--raleway-500-font);
    font-size: 1.5rem;
  }
`;

// ------------------------------------------------------
