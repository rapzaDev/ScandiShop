import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;

    position: relative;

    width: 100%;
    height: fit-content;

    .attribute-name {
        margin-bottom: 0.5rem;

        font: var(--roboto-condensed-700-font);

        text-transform: uppercase;
    }

    & + .text-attributes {
        margin-top: 0.7rem;
    }

    &:last-child {
        margin-bottom: 2.5rem;
    }


    .attributes-options {
        display: flex;
        height: fit-content;

        button + button {
            margin-left: 0.4rem;
        }

        button:last-child {
            margin-right: 0.4rem;
        }

    }

`;