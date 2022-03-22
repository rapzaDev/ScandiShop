import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import CartProductsContext from '../contexts/CartProducts';
import CategoryContext from '../contexts/Categories';
import ColorAttributesContext from '../contexts/ColorAttributes';
import CurrenciesContext from '../contexts/Currencies';
import CurrencyOptionsContext from '../contexts/CurrencyOptions';
import MyBagContext from '../contexts/MyBag';
import TextAttributesContext from '../contexts/TextAttributes';

const persistedConfig = {
  key: '@scandishop/cartProducts',
  storage,
};

const persistedReducer = persistReducer(
  persistedConfig,
  CartProductsContext.reducer
);

const store = configureStore({
  reducer: {
    myBag: MyBagContext.reducer,
    currencyOptions: CurrencyOptionsContext.reducer,
    categories: CategoryContext.reducer,
    currencies: CurrenciesContext.reducer,
    products: persistedReducer,
    textAttributes: TextAttributesContext.reducer,
    colorAttributes: ColorAttributesContext.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };
