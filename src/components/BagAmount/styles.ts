import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.2rem;
    height: 1.2rem;

    border-radius: 3.75rem;

    background-color: var(--c-black);

    span {
        color: var(--c-white);
        
        font: var(--product-quantity-font);
        
    }
`;