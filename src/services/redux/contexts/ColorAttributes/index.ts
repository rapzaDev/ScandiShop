import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColorItemsType = {
    id: string;
    value: string;
    selected: boolean;
}

const ColorAttributes = createSlice({
    name: "colorAttributes",
    initialState: { colorAttributes: [] as ColorItemsType[] },
    reducers: {
        getProductColorAttributes: {
            reducer: ( state, action: PayloadAction<ColorItemsType[]>) => {
                state.colorAttributes = action.payload
            },
            prepare: ( colorAttributes: ColorItemsType[] ) => {
                return { payload: colorAttributes }
            }
        }, 
    }
});

export default ColorAttributes;