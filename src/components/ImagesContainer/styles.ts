import styled, { css } from 'styled-components';

type SmallImageProp = {
  selected: boolean;
};

export const Container = styled.div`
  display: flex;
  position: relative;

  height: 100%;
  width: 100%;
`;

export const SmallImagesWrapper = styled.div`
  display: flex;

  margin-right: 2.5rem;

  #small-images {
    display: flex;
    position: relative;
    flex-direction: column;

    gap: 2.5rem;
  }
`;

export const SmallImage = styled.div<SmallImageProp>`
  display: flex;
  position: relative;

  cursor: pointer;

  img {
    object-fit: scale-down;

    width: 4.9375rem;
    height: 5rem;
  }

  ${({ selected }) =>
    selected
      ? css`
          &::after {
            content: '';
            position: absolute;

            outline: 2px solid #393748;
            width: 100%;

            bottom: -0.7rem;

            opacity: 60%;

            visibility: visible;
          }
        `
      : css`
          &::after {
            content: '';
            position: absolute;
            visibility: hidden;

            height: 0.2rem;
            width: 100%;

            bottom: -0.3rem;
          }
        `}
`;

export const BigImage = styled.div`
  display: flex;
  margin-right: 6.25rem;

  width: 100%;
  height: fit-content;

  > img {
    object-fit: contain;

    width: 38.125rem;
    height: 38.125rem;
  }
`;
