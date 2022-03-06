import { configureStore } from '@reduxjs/toolkit';

import MyBagContext from '../contexts/MyBag';
import CurrencyOptionsContext from '../contexts/CurrencyOptions';
import CategoryContext from '../contexts/Categories';
import CurrenciesContext from '../contexts/Currencies';
import CartProducts from '../contexts/CartProducts';

const store = configureStore({
    reducer: {
      myBag: MyBagContext.reducer,
      currencyOptions: CurrencyOptionsContext.reducer,
      categories: CategoryContext.reducer,
      currencies: CurrenciesContext.reducer,
      products: CartProducts.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;