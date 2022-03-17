import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductDataType } from '../../../graphql/types';

const CartProducts = createSlice({
  name: 'cartProducts',
  initialState: { cartProducts: [] as ProductDataType[] },
  reducers: {
    getLocalStorageDataProducts: {
      reducer: (state, action: PayloadAction<ProductDataType[]>) => {
        state.cartProducts = action.payload;
      },
      prepare: (products: ProductDataType[]) => {
        return { payload: products };
      },
    },
  },
});

export default CartProducts;
