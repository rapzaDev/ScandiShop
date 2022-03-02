import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;

    position: relative;

    align-items: center;
    justify-content: space-between;

    padding-bottom: 0.3rem;

    border-bottom: 1px solid #A6A6A6;

    & + .text-attributes {
        margin-top: 1.3rem;
    }

    &:first-child {
        margin-top: 2rem;
    }

    &:last-child {
        margin-bottom: 1.4rem;
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

        button {
            height: 1.5rem;
            width: 2.5rem;
        }

    }

`;