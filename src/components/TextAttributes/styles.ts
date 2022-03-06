import styled from 'styled-components';

type TextAttributesProps = {
    origin: 'MyBag' | 'ProductPage' | 'CartPage';
}

export const Container = styled.div<TextAttributesProps>`
    display: flex;
    flex-direction: column;

    position: relative;

    width: 100%;
    height: fit-content;

    .attribute-name {
        margin-bottom: 0.5rem;

        font: var(--roboto-condensed-700-font);

        text-transform: uppercase;

        font-size: ${ ({origin}) => origin === 'MyBag' && '0.8rem'};

    }

    & + .text-attributes {
        margin-top: 0.7rem;
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