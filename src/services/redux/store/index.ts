import { configureStore } from '@reduxjs/toolkit';

import MyBagContext from '../contexts/MyBag';
import CurrencyOptionsContext from '../contexts/CurrencyOptions';
import CategoryContext from '../contexts/Categories';
import CurrenciesContext from '../contexts/Currencies';
import CartProductsContext from '../contexts/CartProducts';
import TextAttributesContext from '../contexts/TextAttributes'
import ColorAttributesContext from '../contexts/ColorAttributes';


const store = configureStore({
    reducer: {
      myBag: MyBagContext.reducer,
      currencyOptions: CurrencyOptionsContext.reducer,
      categories: CategoryContext.reducer,
      currencies: CurrenciesContext.reducer,
      products: CartProductsContext.reducer,
      textAttributes: TextAttributesContext.reducer,
      colorAttributes: ColorAttributesContext.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;