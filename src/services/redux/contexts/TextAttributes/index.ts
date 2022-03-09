import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ItemsType = {
    name: string;
    value: boolean;
}

type TextAttributesType = {
    name: string;
    items: ItemsType[];
}

const TextAttributes = createSlice({
    name: "textAttributes",
    initialState: { textAttributes: [] as TextAttributesType[] },
    reducers: {
        getProductTextAttributes: {
            reducer: ( state, action: PayloadAction<TextAttributesType[]>) => {
                state.textAttributes = action.payload
            },
            prepare: ( textAttributes: TextAttributesType[] ) => {
                return { payload: textAttributes }
            }
        }, 
    }
});

export default TextAttributes;