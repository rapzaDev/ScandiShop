import { configureStore } from '@reduxjs/toolkit';

import MyBagReducer from '../contexts/MyBagContext';
import CurrencyOptionsReducer from '../contexts/CurrencyOptionsContext';

const store = configureStore({
    reducer: {
      myBag: MyBagReducer,
      currencyOptions: CurrencyOptionsReducer,
    }
});

export const { dispatch, getState, subscribe } = store; 

export { store };