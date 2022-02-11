import styled from 'styled-components';

export const HeaderComponent = styled.header`

    display: flex;
    justify-content: space-between;
    
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
        
        margin-right: 1.37rem;

        img:first-child {
            font: var(--price-regular-font);
            
            margin-right: 0.6rem;
        }

    }

`;

export const CartContainer = styled.div`
    position: relative;

    img {

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