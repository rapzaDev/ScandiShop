import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductDataType } from '../../../graphql/types';

const CartProducts = createSlice({
    name: "cartProducts",
    initialState: { cartProducts: [] as ProductDataType[] },
    reducers: {
        addProductToCart: {
            reducer: ( state, action: PayloadAction<ProductDataType>) => {
                state.cartProducts.push(action.payload)
            },
            prepare: (product: ProductDataType) => {
                return { payload: product }
            }
        },
        getLocalStorageDataProducts: {
            reducer: ( state, action: PayloadAction<ProductDataType[]>) => {
                state.cartProducts = action.payload
            },
            prepare: (products: ProductDataType[]) => {
                return { payload: products }
            }
        }, 
    }
});

export default CartProducts;