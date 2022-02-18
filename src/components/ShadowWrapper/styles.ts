import styled from 'styled-components';

type ShadowContainerProps = {
    active: boolean;
}

export const ShadowContainer = styled.div<ShadowContainerProps>`
    display: flex;

    position: ${ ({ active }) => active ? 'fixed' : 'relative'};

    flex-direction: column;

    z-index: 1; 

    height: 100vh;
    width: 100%;

    transition: background-color 0.3s linear;

    background-color: ${ ({active}) => active ? 'rgba(57, 55, 72, 0.22)' : 'unset'};

`;