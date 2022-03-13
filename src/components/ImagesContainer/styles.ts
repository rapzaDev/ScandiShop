import styled, { css } from 'styled-components';

type SmallImagesArrowsProps = {
    visible: boolean;
}

type SmallImageProp = {
    selected: boolean;
}

export const Container = styled.div`
    display: flex;
    position: relative;

    height: max-content;
    width: max-content;

    #small-images {
        display: flex;
        position: relative;
        flex-direction: column;
        
        -ms-overflow-style: none;
        scrollbar-width: none;
        overflow-y: hidden;

        max-height: 20.3rem;

        height: max-content;

        margin-right: 2.5rem;
        margin-bottom: 2.5rem;

    }

`;

export const SmallImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;


    .arrows-container {
        display: flex;
        flex-direction: column;

        justify-content: center;

        height: fit-content;
        width: fit-content;
    }

`;

export const SmallImage = styled.div<SmallImageProp>`
    display: flex;
    flex-direction: column;
    position: relative;

    max-width: 4.9375rem;
    min-width: 4.9375rem;

    max-height: 5rem;
    min-height: 5rem;

    cursor: pointer;

    & + & {
        margin-top: 2.5rem;
    }

    img {
        width: 100%;
        height: 100%;
    }

    ${ ({selected}) => selected 
        ? css`
            &::after{
                content: '';                
                position: relative;
                
                height: .2rem;
                width: 100%;
                
                bottom: -0.3rem;

                opacity: 30%;

                visibility: visible;
                background-color: #393748;
            }
        ` 
        : css`
            &::after{
                content: '';
                position: relative;
                visibility: hidden;

                height: .2rem;
                width: 100%;
                
                bottom: -0.3rem;
            }
        ` 
    }

`;

export const ArrowContainer = styled.div<SmallImagesArrowsProps>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4.9375rem;

    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.39);

    height: 2.3rem;

    cursor: pointer;

    transition: visibility .1s ease-in-out;

    visibility: ${ ({visible}) => visible ? 'visible' : 'collapse' };

    & + .arrow-container {
        margin-top: 0.4rem;
    }

    img {
        height: 0.5rem;

        opacity: 0.6;

        margin-bottom: 0rem;
    }
`;

export const BigImage = styled.div`
    width: max-content;
    height: max-content;

    margin-right: 6.25rem;

    > img {
        width: 38.125rem;
        height: 31.75rem;
    }

`;


