import styled from 'styled-components';

export const HeaderComponent = styled.header`

    display: flex;
    
    width: 100%;
    height: 5rem;

    padding: 2rem 6.3rem;

    justify-content: space-between;

    .category-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
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