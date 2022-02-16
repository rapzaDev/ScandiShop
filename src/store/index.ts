import { configureStore } from '@reduxjs/toolkit';

import MyBagReducer from '../contexts/MyBagContext';

const store = configureStore({
    reducer: {
      myBag: MyBagReducer,
    }
});

export const { dispatch, getState, subscribe } = store; 

export { store };