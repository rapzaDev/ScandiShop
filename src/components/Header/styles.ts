import styled from 'styled-components';

export const HeaderComponent = styled.header`
    display: flex;
    justify-content: space-between;

    position: fixed; z-index: 1000; /// FIXED HEADER

    background-color: var(--c-white);
    
    width: 100%;
    height: 5rem;

    padding: 2rem 6.3rem;

    .category-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-div {
        position: absolute;
        left: 50%;
        right: 50%;
    }

`;

export const CurrencyAndCart = styled.div`
    display: flex;
    justify-content: center;

    .currency {
        display: flex;
        align-items: center; 
        justify-content: center;
    }

`;

export const CurrencyButton = styled.button`
    margin-right: 2.37rem;

    img:first-child {
        font: var(--price-regular-font);
        
        margin-right: 0.6rem;
    }

    display: flex;

    width: 0.375rem;

    background: var(--c-white);

    cursor: pointer;
    border: 0;
`;

export const CartContainer = styled.div`
    position: relative;

    button {
        display: flex;

        background-color: var(--c-white);

        border: 0;

        cursor: pointer;
    }

    img {
        transition: transform 0.2s linear;

        &:hover {
            transform: scale(1.2);
        }
    }

    .product-quantity {
        position: absolute;
        top: 0;
        
        margin-top: -0.5rem;
        margin-left: 0.83rem;
        
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

    }

`;

