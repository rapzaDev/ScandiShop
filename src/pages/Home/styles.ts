import styled from 'styled-components';

type ShadowContainerProps = {
    active: boolean;
}

export const HomePage = styled.div`
    display: flex;

    flex-direction: column;
    height: 100vh;

`;

export const ShadowContainer = styled.div<ShadowContainerProps>`
    position: relative;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5rem 6.25rem 11.9rem;

    border: 1px solid #000;

    width: 100%;
    height: 89.6875rem;

    background-color: ${ ({active}) => active ? 'rgba(57, 55, 72, 0.22)' : 'unset'};

    .my-bag {
        position: absolute;
        z-index: 1;

        right: 5%;
        top: 0;
        
    }

`;

export const Main = styled.main`
    display: flex;

    justify-content: center;
    align-items: center;

    border: 1px solid #000;

`;


