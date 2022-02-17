import styled from 'styled-components';

type ShadowContainerProps = {
    active: boolean;
}

export const ShadowContainer = styled.div<ShadowContainerProps>`
    display: flex;
    flex-direction: column;
    position: relative;

    width: 100%;

    transition: background-color 0.3s linear;

    background-color: ${ ({active}) => active ? 'rgba(57, 55, 72, 0.22)' : 'unset'};
`;