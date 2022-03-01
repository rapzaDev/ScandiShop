import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductDataType } from '../../../graphql/types';

const ProductSlice = createSlice({
    name: "product",
    initialState: { value: {} as ProductDataType },
    reducers: {
        getSelectedProductData: {
            reducer: ( state, action: PayloadAction<ProductDataType>) => {
                state.value = action.payload
            },
            prepare: (product: ProductDataType) => {
                return { payload: product }
            }
        }
    }
});

export default ProductSlice;