import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductDataType } from '../../../graphql/types';

const CartProducts = createSlice({
  name: 'cartProducts',
  initialState: { cartProducts: [] as ProductDataType[] },
  reducers: {
    addProductToCart: {
      reducer: (state, action: PayloadAction<ProductDataType>) => {
        state.cartProducts.push(action.payload);
      },
      prepare: (product: ProductDataType) => {
        return { payload: product };
      },
    },
    increaseCartProductQuantity: {
      reducer: (state, action: PayloadAction<ProductDataType>) => {
        state.cartProducts = state.cartProducts.map((product) => {
          if (product.KEY_ID === action.payload.KEY_ID) {
            const productIncreased = {} as ProductDataType;

            Object.assign(productIncreased, {
              ...product,
              quantity: product.quantity + 1,
            });

            return productIncreased;
          }

          return product;
        });
      },
      prepare: (product: ProductDataType) => {
        return { payload: product };
      },
    },
    decreaseCartProductQuantity: {
      reducer: (state, action: PayloadAction<ProductDataType>) => {
        const decreasedProducts = state.cartProducts.map((product) => {
          if (product.KEY_ID === action.payload.KEY_ID) {
            const productDecreased = {} as ProductDataType;

            Object.assign(productDecreased, {
              ...product,
              quantity: product.quantity - 1,
            });

            return productDecreased;
          }

          return product;
        });

        state.cartProducts = decreasedProducts.filter(
          (product) => product.quantity > 0
        );
      },
      prepare: (product: ProductDataType) => {
        return { payload: product };
      },
    },
  },
});

export default CartProducts;
