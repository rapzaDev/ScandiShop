import styled from 'styled-components';

export const HomePage = styled.div`
    display: flex;

    flex-direction: column;
    height: 100vh;

    header {
        display: flex;
        
        width: 100%;
        height: 5rem;

        padding: 2rem 6.3rem;

        justify-content: space-between;

        .currency-and-cart {

            display: flex;

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

        }


    }

    .category-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }


    main {
        
    }

`;

