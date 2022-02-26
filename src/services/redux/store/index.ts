import { configureStore } from '@reduxjs/toolkit';

import MyBagContext from '../contexts/MyBag';
import CurrencyOptionsContext from '../contexts/CurrencyOptions';
import CategoryContext from '../contexts/Categories';

const store = configureStore({
    reducer: {
      myBag: MyBagContext.reducer,
      currencyOptions: CurrencyOptionsContext.reducer,
      categories: CategoryContext.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;