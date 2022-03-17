import { configureStore } from '@reduxjs/toolkit';

import CartProductsContext from '../contexts/CartProducts';
import CategoryContext from '../contexts/Categories';
import ColorAttributesContext from '../contexts/ColorAttributes';
import CurrenciesContext from '../contexts/Currencies';
import CurrencyOptionsContext from '../contexts/CurrencyOptions';
import MyBagContext from '../contexts/MyBag';
import TextAttributesContext from '../contexts/TextAttributes';

const store = configureStore({
  reducer: {
    myBag: MyBagContext.reducer,
    currencyOptions: CurrencyOptionsContext.reducer,
    categories: CategoryContext.reducer,
    currencies: CurrenciesContext.reducer,
    products: CartProductsContext.reducer,
    textAttributes: TextAttributesContext.reducer,
    colorAttributes: ColorAttributesContext.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
