import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    position: fixed;
    z-index: 1;
    flex-direction: column;

    background-color: var(--c-white);

    align-items: center;
    justify-content: center;


    right: 5%;
    top: 9%;

    width: 7.1rem;
    height: 10.5rem;

    padding: 1.25rem 1.5rem 1.25rem 1.25rem;

    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

    button {
        display: flex;

        border: 0;
        background-color: var(--c-white);

        cursor: pointer;

        font: var(--price-regular-font);

        & + button {
            margin-top: 1.3rem;
        }

    }
`;